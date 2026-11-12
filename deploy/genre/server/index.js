import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createConnection, createPool } from 'mysql2/promise';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const deploymentDirectory = path.resolve(currentDirectory, '..');
const publicDirectory = path.join(deploymentDirectory, 'public');
const schemaPath = path.join(currentDirectory, 'schema.sql');
const seedPath = path.join(currentDirectory, 'seed.json');
const port = Number(process.env.PORT || 8080);
const sessionCookie = 'genre_admin';
const sessionDurationSeconds = 7 * 24 * 60 * 60;
const allowedCategories = new Set([
  'Seminar', 'Workshop', 'Lomba', 'Sosial', 'Rapat',
  'Pelatihan', 'Kunjungan', 'Kampanye', 'Lainnya',
]);

if (!process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD.length < 12) {
  throw new Error('ADMIN_PASSWORD wajib diatur dan minimal 12 karakter.');
}
if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
  throw new Error('SESSION_SECRET wajib diatur dan minimal 32 karakter.');
}
if (!fs.existsSync(path.join(publicDirectory, 'index.html'))) {
  throw new Error('Frontend belum dibangun. Jalankan npm run build:deploy lalu salin dist ke deploy/genre/public.');
}
if (!fs.existsSync(schemaPath) || !fs.existsSync(seedPath)) {
  throw new Error('File server/schema.sql atau server/seed.json tidak ditemukan.');
}

const databaseOptions = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  queueLimit: 0,
};

for (const name of ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME']) {
  if (!process.env[name]) throw new Error(`${name} wajib diatur.`);
}
if (!Number.isInteger(databaseOptions.port) || databaseOptions.port < 1 || databaseOptions.port > 65535) {
  throw new Error('DB_PORT harus berupa port MySQL yang valid.');
}
if (!Number.isInteger(databaseOptions.connectionLimit) || databaseOptions.connectionLimit < 1) {
  throw new Error('DB_CONNECTION_LIMIT harus berupa bilangan bulat positif.');
}

const initializationConnection = await createConnection({
  ...databaseOptions,
  multipleStatements: true,
});
try {
  await initializationConnection.query(fs.readFileSync(schemaPath, 'utf8'));
  const [countRows] = await initializationConnection.execute('SELECT COUNT(*) AS count FROM kegiatan');
  if (Number(countRows[0].count) === 0) {
    const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
    await initializationConnection.beginTransaction();
    try {
      for (const item of seed) {
        await initializationConnection.execute(`
          INSERT IGNORE INTO kegiatan (id, payload, diterbitkan, jadwal_terbit, tanggal, dibuat_pada)
          VALUES (?, ?, ?, ?, ?, ?)
        `, [
          item.id,
          JSON.stringify(item),
          item.diterbitkan ? 1 : 0,
          item.jadwalTerbit || null,
          item.tanggal,
          item.dibuatPada,
        ]);
      }
      await initializationConnection.commit();
    } catch (error) {
      await initializationConnection.rollback();
      throw error;
    }
  }
} finally {
  await initializationConnection.end();
}

const database = createPool(databaseOptions);

async function query(sql, values = []) {
  const [rows] = await database.execute(sql, values);
  return rows;
}

async function withTransaction(callback) {
  const connection = await database.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

function issueSession(timestamp = Date.now()) {
  const value = String(timestamp);
  const signature = crypto.createHmac('sha256', process.env.SESSION_SECRET).update(value).digest('hex');
  return `${value}.${signature}`;
}

function hasValidSession(request) {
  const cookieHeader = request.headers.cookie || '';
  const cookie = cookieHeader.split(';').map((part) => part.trim())
    .find((part) => part.startsWith(`${sessionCookie}=`));
  if (!cookie) return false;

  const token = decodeURIComponent(cookie.slice(sessionCookie.length + 1));
  const [timestamp, signature] = token.split('.');
  const issuedAt = Number(timestamp);
  if (!Number.isSafeInteger(issuedAt) || Date.now() - issuedAt > sessionDurationSeconds * 1000) return false;
  const expected = Buffer.from(issueSession(issuedAt).split('.')[1], 'hex');
  const actual = Buffer.from(signature || '', 'hex');
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

function requireAdmin(request, response, next) {
  if (!hasValidSession(request)) {
    response.status(401).json({ error: 'Sesi admin habis. Silakan login kembali.' });
    return;
  }
  next();
}

function asyncRoute(handler) {
  return (request, response, next) => Promise.resolve(handler(request, response, next)).catch(next);
}

function validateExternalUrl(value) {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

async function publishScheduled() {
  const now = new Date().toISOString();
  const dueItems = await query(`
    SELECT id, payload FROM kegiatan
    WHERE diterbitkan = 0 AND jadwal_terbit IS NOT NULL AND jadwal_terbit <= ?
  `, [now]);
  if (dueItems.length === 0) return;

  await withTransaction(async (connection) => {
    for (const row of dueItems) {
      const item = JSON.parse(row.payload);
      item.diterbitkan = true;
      item.jadwalTerbit = null;
      item.diperbarui = now;
      await connection.execute(`
        UPDATE kegiatan SET payload = ?, diterbitkan = 1, jadwal_terbit = NULL
        WHERE id = ? AND diterbitkan = 0
      `, [JSON.stringify(item), row.id]);
    }
  });
}

async function getActivity(id) {
  const rows = await query('SELECT payload FROM kegiatan WHERE id = ?', [id]);
  return rows.length ? JSON.parse(rows[0].payload) : null;
}

async function saveActivity(item) {
  await database.execute(`
    INSERT INTO kegiatan (id, payload, diterbitkan, jadwal_terbit, tanggal, dibuat_pada)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      payload = VALUES(payload),
      diterbitkan = VALUES(diterbitkan),
      jadwal_terbit = VALUES(jadwal_terbit),
      tanggal = VALUES(tanggal)
  `, [
    item.id,
    JSON.stringify(item),
    item.diterbitkan ? 1 : 0,
    item.jadwalTerbit || null,
    item.tanggal,
    item.dibuatPada,
  ]);
}

function validateActivity(data) {
  if (!data || typeof data !== 'object') return 'Data berita tidak valid.';
  if (typeof data.judul !== 'string' || !data.judul.trim() || data.judul.length > 200) return 'Judul wajib diisi (maksimal 200 karakter).';
  if (typeof data.ringkasan !== 'string' || !data.ringkasan.trim()) return 'Ringkasan wajib diisi.';
  if (typeof data.konten !== 'string' || !data.konten.trim()) return 'Konten berita wajib diisi.';
  if (typeof data.tanggal !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.tanggal)) return 'Tanggal berita tidak valid.';
  if (!allowedCategories.has(data.kategori)) return 'Kategori berita tidak valid.';
  if (!Array.isArray(data.galeri) || !Array.isArray(data.tags)) return 'Galeri dan tag harus berupa daftar.';
  if (data.tautan !== undefined && (!Array.isArray(data.tautan) || data.tautan.some((link) =>
    !link || typeof link.label !== 'string' || !link.label.trim() || !validateExternalUrl(link.url)
  ))) return 'Tautan berita harus memiliki label dan alamat HTTP/HTTPS yang valid.';
  if (data.gambarUtama && typeof data.gambarUtama === 'string' && data.gambarUtama.length > 5_000_000) {
    return 'Ukuran gambar terlalu besar.';
  }
  return null;
}

function validateQuickLink(data) {
  if (!data || typeof data.label !== 'string' || !data.label.trim() || data.label.length > 120) {
    return 'Nama tombol wajib diisi (maksimal 120 karakter).';
  }
  if (typeof data.url !== 'string' || data.url.length > 2048 || !validateExternalUrl(data.url)) {
    return 'URL harus valid dan diawali http:// atau https://.';
  }
  return null;
}

const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(express.json({ limit: '6mb' }));

app.get('/api/health', asyncRoute(async (_request, response) => {
  await query('SELECT 1');
  response.json({ status: 'ok' });
}));

app.post('/api/auth/login', (request, response) => {
  const password = request.body?.password;
  const expected = Buffer.from(process.env.ADMIN_PASSWORD);
  const supplied = Buffer.from(typeof password === 'string' ? password : '');
  const matches = supplied.length === expected.length && crypto.timingSafeEqual(supplied, expected);
  if (!matches) {
    response.status(401).json({ error: 'Kata sandi admin salah.' });
    return;
  }
  const cookieOptions = [
    `${sessionCookie}=${encodeURIComponent(issueSession())}`,
    'HttpOnly',
    'SameSite=Lax',
    'Path=/',
    `Max-Age=${sessionDurationSeconds}`,
  ];
  if (request.secure) cookieOptions.push('Secure');
  response.setHeader('Set-Cookie', cookieOptions.join('; '));
  response.json({ authenticated: true });
});

app.post('/api/auth/logout', (_request, response) => {
  response.setHeader('Set-Cookie', `${sessionCookie}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
  response.json({ ok: true });
});

app.get('/api/auth/session', (request, response) => {
  response.json(hasValidSession(request));
});

app.get('/api/kegiatan', asyncRoute(async (_request, response) => {
  await publishScheduled();
  const rows = await query(`
    SELECT payload FROM kegiatan WHERE diterbitkan = 1 ORDER BY tanggal DESC
  `);
  response.json(rows.map((row) => JSON.parse(row.payload)));
}));

app.get('/api/kegiatan/:id', asyncRoute(async (request, response) => {
  await publishScheduled();
  const item = await getActivity(request.params.id);
  if (!item || !item.diterbitkan) {
    response.status(404).json({ error: 'Berita tidak ditemukan.' });
    return;
  }
  response.json(item);
}));

app.post('/api/kegiatan/:id/views', asyncRoute(async (request, response) => {
  const item = await getActivity(request.params.id);
  if (!item || !item.diterbitkan) {
    response.status(404).json({ error: 'Berita tidak ditemukan.' });
    return;
  }
  item.jumlahViews = (item.jumlahViews || 0) + 1;
  item.diperbarui = new Date().toISOString();
  await saveActivity(item);
  response.json({ jumlahViews: item.jumlahViews });
}));

app.get('/api/admin/kegiatan', requireAdmin, asyncRoute(async (_request, response) => {
  await publishScheduled();
  const rows = await query('SELECT payload FROM kegiatan ORDER BY dibuat_pada DESC');
  response.json(rows.map((row) => JSON.parse(row.payload)));
}));

app.post('/api/admin/kegiatan', requireAdmin, asyncRoute(async (request, response) => {
  const data = request.body;
  const error = validateActivity(data);
  if (error) {
    response.status(400).json({ error });
    return;
  }
  const now = new Date().toISOString();
  const item = {
    ...data,
    id: crypto.randomUUID(),
    jadwalTerbit: data.jadwalTerbit || null,
    dibuatPada: now,
    diperbarui: now,
    jumlahViews: 0,
  };
  await saveActivity(item);
  response.status(201).json(item);
}));

app.put('/api/admin/kegiatan/:id', requireAdmin, asyncRoute(async (request, response) => {
  const current = await getActivity(request.params.id);
  if (!current) {
    response.status(404).json({ error: 'Berita tidak ditemukan.' });
    return;
  }
  const updated = { ...current, ...request.body, id: current.id, diperbarui: new Date().toISOString() };
  const error = validateActivity(updated);
  if (error) {
    response.status(400).json({ error });
    return;
  }
  await saveActivity(updated);
  response.json(updated);
}));

app.delete('/api/admin/kegiatan/:id', requireAdmin, asyncRoute(async (request, response) => {
  const result = await withTransaction(async (connection) => {
    const [deleteResult] = await connection.execute('DELETE FROM kegiatan WHERE id = ?', [request.params.id]);
    if (deleteResult.affectedRows === 0) return false;
    await connection.execute('DELETE FROM pengaturan WHERE `key` = ? AND `value` = ?', [
      'featured_news_id',
      request.params.id,
    ]);
    return true;
  });
  if (!result) {
    response.status(404).json({ error: 'Berita tidak ditemukan.' });
    return;
  }
  response.json({ ok: true });
}));

app.get('/api/featured', asyncRoute(async (_request, response) => {
  await publishScheduled();
  const rows = await query('SELECT `value` FROM pengaturan WHERE `key` = ?', ['featured_news_id']);
  const item = rows.length ? await getActivity(rows[0].value) : null;
  response.json(item?.diterbitkan ? item : null);
}));

app.put('/api/admin/featured', requireAdmin, asyncRoute(async (request, response) => {
  const id = request.body?.id;
  if (id === null) {
    await database.execute('DELETE FROM pengaturan WHERE `key` = ?', ['featured_news_id']);
    response.json({ ok: true });
    return;
  }
  const item = typeof id === 'string' ? await getActivity(id) : null;
  if (!item || !item.diterbitkan) {
    response.status(400).json({ error: 'Pilih berita yang sudah tayang.' });
    return;
  }
  await database.execute(
    'INSERT INTO pengaturan (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)',
    ['featured_news_id', id],
  );
  response.json({ ok: true });
}));

app.get('/api/quick-links', asyncRoute(async (_request, response) => {
  const links = await query('SELECT id, label, url, urutan FROM tautan_cepat ORDER BY urutan, id');
  response.json(links);
}));

app.post('/api/admin/quick-links', requireAdmin, asyncRoute(async (request, response) => {
  const error = validateQuickLink(request.body);
  if (error) {
    response.status(400).json({ error });
    return;
  }
  const rows = await query('SELECT COALESCE(MAX(urutan), -1) + 1 AS next FROM tautan_cepat');
  const link = {
    id: crypto.randomUUID(),
    label: request.body.label.trim(),
    url: request.body.url.trim(),
    urutan: rows[0].next,
  };
  await database.execute('INSERT INTO tautan_cepat (id, label, url, urutan) VALUES (?, ?, ?, ?)', [
    link.id,
    link.label,
    link.url,
    link.urutan,
  ]);
  response.status(201).json(link);
}));

app.put('/api/admin/quick-links/:id', requireAdmin, asyncRoute(async (request, response) => {
  const error = validateQuickLink(request.body);
  if (error) {
    response.status(400).json({ error });
    return;
  }
  await database.execute(`
    UPDATE tautan_cepat SET label = ?, url = ? WHERE id = ?
  `, [request.body.label.trim(), request.body.url.trim(), request.params.id]);
  const rows = await query('SELECT id, label, url, urutan FROM tautan_cepat WHERE id = ?', [request.params.id]);
  if (rows.length === 0) {
    response.status(404).json({ error: 'Tombol tautan tidak ditemukan.' });
    return;
  }
  response.json(rows[0]);
}));

app.delete('/api/admin/quick-links/:id', requireAdmin, asyncRoute(async (request, response) => {
  const removed = await withTransaction(async (connection) => {
    const [deleteResult] = await connection.execute('DELETE FROM tautan_cepat WHERE id = ?', [request.params.id]);
    if (deleteResult.affectedRows === 0) return false;
    const [remaining] = await connection.execute('SELECT id FROM tautan_cepat ORDER BY urutan, id');
    for (const [index, link] of remaining.entries()) {
      await connection.execute('UPDATE tautan_cepat SET urutan = ? WHERE id = ?', [index, link.id]);
    }
    return true;
  });
  if (!removed) {
    response.status(404).json({ error: 'Tombol tautan tidak ditemukan.' });
    return;
  }
  response.json({ ok: true });
}));

app.use('/api', (_request, response) => {
  response.status(404).json({ error: 'Endpoint API tidak ditemukan.' });
});

app.use(express.static(publicDirectory, { index: false }));
app.get('*', (_request, response) => {
  response.sendFile(path.join(publicDirectory, 'index.html'));
});

app.use((error, _request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }
  console.error('Kesalahan server:', error);
  const status = Number.isInteger(error.status) ? error.status : 500;
  response.status(status).json({
    error: status >= 500 ? 'Terjadi kesalahan pada server.' : error.message,
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Portal Genre DIY berjalan pada port ${port}; database MySQL: ${databaseOptions.database}`);
});
