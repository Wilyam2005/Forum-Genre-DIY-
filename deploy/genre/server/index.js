import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import express from 'express';
import initSqlJs from 'sql.js';

const require = createRequire(import.meta.url);
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const deploymentDirectory = path.resolve(currentDirectory, '..');
const publicDirectory = path.join(deploymentDirectory, 'public');
const dataDirectory = path.resolve(process.env.DB_DIRECTORY || path.join(deploymentDirectory, 'data'));
const databasePath = path.join(dataDirectory, 'genre.sqlite');
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

fs.mkdirSync(dataDirectory, { recursive: true });
const SQL = await initSqlJs({
  locateFile: (file) => path.join(path.dirname(require.resolve('sql.js')), file),
});
const rawDatabase = fs.existsSync(databasePath)
  ? new SQL.Database(fs.readFileSync(databasePath))
  : new SQL.Database();
let transactionActive = false;

function persistDatabase() {
  fs.writeFileSync(databasePath, Buffer.from(rawDatabase.export()));
}

function bindParameters(statement, parameters, sql) {
  if (parameters.length === 0) return;
  const namedValues = parameters.length === 1 && parameters[0] !== null &&
    typeof parameters[0] === 'object' && !Array.isArray(parameters[0])
    ? parameters[0]
    : null;
  const prefixMatch = sql.match(/[@:$][A-Za-z_]\w*/);
  const values = namedValues
    ? Object.fromEntries(Object.entries(namedValues).map(([key, value]) => [`${prefixMatch?.[0][0] || '@'}${key}`, value]))
    : parameters;
  statement.bind(values);
}

const database = {
  exec(sql) {
    rawDatabase.exec(sql);
    if (!transactionActive) persistDatabase();
  },
  prepare(sql) {
    return {
      all(...parameters) {
        const statement = rawDatabase.prepare(sql);
        bindParameters(statement, parameters, sql);
        const rows = [];
        while (statement.step()) rows.push(statement.getAsObject());
        statement.free();
        return rows;
      },
      get(...parameters) {
        const statement = rawDatabase.prepare(sql);
        bindParameters(statement, parameters, sql);
        const result = statement.step() ? statement.getAsObject() : undefined;
        statement.free();
        return result;
      },
      run(...parameters) {
        const statement = rawDatabase.prepare(sql);
        bindParameters(statement, parameters, sql);
        statement.step();
        statement.free();
        const changes = rawDatabase.getRowsModified();
        if (!transactionActive) persistDatabase();
        return { changes };
      },
    };
  },
  transaction(callback) {
    return (...parameters) => {
      rawDatabase.run('BEGIN');
      transactionActive = true;
      try {
        const result = callback(...parameters);
        rawDatabase.run('COMMIT');
        transactionActive = false;
        persistDatabase();
        return result;
      } catch (error) {
        rawDatabase.run('ROLLBACK');
        transactionActive = false;
        throw error;
      }
    };
  },
};
database.exec(`
  CREATE TABLE IF NOT EXISTS kegiatan (
    id TEXT PRIMARY KEY,
    payload TEXT NOT NULL,
    diterbitkan INTEGER NOT NULL,
    jadwal_terbit TEXT,
    tanggal TEXT NOT NULL,
    dibuat_pada TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS tautan_cepat (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    urutan INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS pengaturan (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

const insertActivity = database.prepare(`
  INSERT OR IGNORE INTO kegiatan (id, payload, diterbitkan, jadwal_terbit, tanggal, dibuat_pada)
  VALUES (@id, @payload, @diterbitkan, @jadwalTerbit, @tanggal, @dibuatPada)
`);
const seedPath = path.join(currentDirectory, 'seed.json');
if (database.prepare('SELECT COUNT(*) AS count FROM kegiatan').get().count === 0 && fs.existsSync(seedPath)) {
  const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
  const insertSeed = database.transaction((items) => {
    for (const item of items) {
      insertActivity.run({
        id: item.id,
        payload: JSON.stringify(item),
        diterbitkan: item.diterbitkan ? 1 : 0,
        jadwalTerbit: item.jadwalTerbit || null,
        tanggal: item.tanggal,
        dibuatPada: item.dibuatPada,
      });
    }
  });
  insertSeed(seed);
}

const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(express.json({ limit: '6mb' }));

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
  let actual;
  try {
    actual = Buffer.from(signature, 'hex');
  } catch {
    return false;
  }
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

function requireAdmin(request, response, next) {
  if (!hasValidSession(request)) {
    response.status(401).json({ error: 'Sesi admin habis. Silakan login kembali.' });
    return;
  }
  next();
}

function validateExternalUrl(value) {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

function publishScheduled() {
  const now = new Date().toISOString();
  const dueItems = database.prepare(`
    SELECT id, payload FROM kegiatan
    WHERE diterbitkan = 0 AND jadwal_terbit IS NOT NULL AND jadwal_terbit <= ?
  `).all(now);
  if (dueItems.length === 0) return;

  const update = database.prepare(`
    UPDATE kegiatan SET payload = ?, diterbitkan = 1, jadwal_terbit = NULL WHERE id = ?
  `);
  const publish = database.transaction((items) => {
    for (const row of items) {
      const item = JSON.parse(row.payload);
      item.diterbitkan = true;
      item.jadwalTerbit = null;
      item.diperbarui = now;
      update.run(JSON.stringify(item), row.id);
    }
  });
  publish(dueItems);
}

function getActivity(id) {
  const row = database.prepare('SELECT payload FROM kegiatan WHERE id = ?').get(id);
  return row ? JSON.parse(row.payload) : null;
}

function saveActivity(item) {
  database.prepare(`
    INSERT INTO kegiatan (id, payload, diterbitkan, jadwal_terbit, tanggal, dibuat_pada)
    VALUES (@id, @payload, @diterbitkan, @jadwalTerbit, @tanggal, @dibuatPada)
    ON CONFLICT(id) DO UPDATE SET
      payload = excluded.payload,
      diterbitkan = excluded.diterbitkan,
      jadwal_terbit = excluded.jadwal_terbit,
      tanggal = excluded.tanggal
  `).run({
    id: item.id,
    payload: JSON.stringify(item),
    diterbitkan: item.diterbitkan ? 1 : 0,
    jadwalTerbit: item.jadwalTerbit || null,
    tanggal: item.tanggal,
    dibuatPada: item.dibuatPada,
  });
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

app.get('/api/health', (_request, response) => {
  database.prepare('SELECT 1').get();
  response.json({ status: 'ok' });
});

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

app.get('/api/kegiatan', (_request, response) => {
  publishScheduled();
  const rows = database.prepare(`
    SELECT payload FROM kegiatan WHERE diterbitkan = 1 ORDER BY tanggal DESC
  `).all();
  response.json(rows.map((row) => JSON.parse(row.payload)));
});

app.get('/api/kegiatan/:id', (request, response) => {
  publishScheduled();
  const item = getActivity(request.params.id);
  if (!item || !item.diterbitkan) {
    response.status(404).json({ error: 'Berita tidak ditemukan.' });
    return;
  }
  response.json(item);
});

app.post('/api/kegiatan/:id/views', (request, response) => {
  const item = getActivity(request.params.id);
  if (!item || !item.diterbitkan) {
    response.status(404).json({ error: 'Berita tidak ditemukan.' });
    return;
  }
  item.jumlahViews = (item.jumlahViews || 0) + 1;
  item.diperbarui = new Date().toISOString();
  saveActivity(item);
  response.json({ jumlahViews: item.jumlahViews });
});

app.get('/api/admin/kegiatan', requireAdmin, (_request, response) => {
  publishScheduled();
  const rows = database.prepare('SELECT payload FROM kegiatan ORDER BY dibuat_pada DESC').all();
  response.json(rows.map((row) => JSON.parse(row.payload)));
});

app.post('/api/admin/kegiatan', requireAdmin, (request, response) => {
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
  saveActivity(item);
  response.status(201).json(item);
});

app.put('/api/admin/kegiatan/:id', requireAdmin, (request, response) => {
  const current = getActivity(request.params.id);
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
  saveActivity(updated);
  response.json(updated);
});

app.delete('/api/admin/kegiatan/:id', requireAdmin, (request, response) => {
  const result = database.prepare('DELETE FROM kegiatan WHERE id = ?').run(request.params.id);
  if (result.changes === 0) {
    response.status(404).json({ error: 'Berita tidak ditemukan.' });
    return;
  }
  database.prepare('DELETE FROM pengaturan WHERE key = ? AND value = ?')
    .run('featured_news_id', request.params.id);
  response.json({ ok: true });
});

app.get('/api/featured', (_request, response) => {
  publishScheduled();
  const selected = database.prepare('SELECT value FROM pengaturan WHERE key = ?').get('featured_news_id');
  const item = selected ? getActivity(selected.value) : null;
  response.json(item?.diterbitkan ? item : null);
});

app.put('/api/admin/featured', requireAdmin, (request, response) => {
  const id = request.body?.id;
  if (id === null) {
    database.prepare('DELETE FROM pengaturan WHERE key = ?').run('featured_news_id');
    response.json({ ok: true });
    return;
  }
  const item = typeof id === 'string' ? getActivity(id) : null;
  if (!item || !item.diterbitkan) {
    response.status(400).json({ error: 'Pilih berita yang sudah tayang.' });
    return;
  }
  database.prepare(`
    INSERT INTO pengaturan (key, value) VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `).run('featured_news_id', id);
  response.json({ ok: true });
});

app.get('/api/quick-links', (_request, response) => {
  const links = database.prepare('SELECT id, label, url, urutan FROM tautan_cepat ORDER BY urutan, rowid').all();
  response.json(links);
});

app.post('/api/admin/quick-links', requireAdmin, (request, response) => {
  const error = validateQuickLink(request.body);
  if (error) {
    response.status(400).json({ error });
    return;
  }
  const link = {
    id: crypto.randomUUID(),
    label: request.body.label.trim(),
    url: request.body.url.trim(),
    urutan: database.prepare('SELECT COALESCE(MAX(urutan), -1) + 1 AS next FROM tautan_cepat').get().next,
  };
  database.prepare('INSERT INTO tautan_cepat (id, label, url, urutan) VALUES (@id, @label, @url, @urutan)')
    .run(link);
  response.status(201).json(link);
});

app.put('/api/admin/quick-links/:id', requireAdmin, (request, response) => {
  const error = validateQuickLink(request.body);
  if (error) {
    response.status(400).json({ error });
    return;
  }
  const result = database.prepare(`
    UPDATE tautan_cepat SET label = ?, url = ? WHERE id = ?
  `).run(request.body.label.trim(), request.body.url.trim(), request.params.id);
  if (result.changes === 0) {
    response.status(404).json({ error: 'Tombol tautan tidak ditemukan.' });
    return;
  }
  const link = database.prepare('SELECT id, label, url, urutan FROM tautan_cepat WHERE id = ?')
    .get(request.params.id);
  response.json(link);
});

app.delete('/api/admin/quick-links/:id', requireAdmin, (request, response) => {
  const remove = database.transaction((id) => {
    const result = database.prepare('DELETE FROM tautan_cepat WHERE id = ?').run(id);
    if (result.changes === 0) return false;
    const remaining = database.prepare('SELECT id FROM tautan_cepat ORDER BY urutan, rowid').all();
    const updateOrder = database.prepare('UPDATE tautan_cepat SET urutan = ? WHERE id = ?');
    remaining.forEach((link, index) => updateOrder.run(index, link.id));
    return true;
  });
  if (!remove(request.params.id)) {
    response.status(404).json({ error: 'Tombol tautan tidak ditemukan.' });
    return;
  }
  response.json({ ok: true });
});

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
  console.log(`GenRe DIY berjalan pada port ${port}; database: ${databasePath}`);
});
