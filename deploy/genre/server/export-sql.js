import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const deploymentDirectory = path.resolve(currentDirectory, '..');
const schema = fs.readFileSync(path.join(currentDirectory, 'schema.sql'), 'utf8').trim();
const seed = JSON.parse(fs.readFileSync(path.join(currentDirectory, 'seed.json'), 'utf8'));

function sqlText(value) {
  if (value === null || value === undefined) return 'NULL';
  const hex = Buffer.from(String(value), 'utf8').toString('hex');
  return `CONVERT(X'${hex}' USING utf8mb4)`;
}

const rows = seed.map((item) => `  (${[
  sqlText(item.id),
  sqlText(JSON.stringify(item)),
  item.diterbitkan ? '1' : '0',
  sqlText(item.jadwalTerbit || null),
  sqlText(item.tanggal),
  sqlText(item.dibuatPada),
].join(', ')})`);

const sql = [
  '-- Import this file into an empty MySQL or MariaDB database.',
  'SET NAMES utf8mb4;',
  '',
  schema,
  '',
  'INSERT IGNORE INTO kegiatan (id, payload, diterbitkan, jadwal_terbit, tanggal, dibuat_pada) VALUES',
  `${rows.join(',\n')};`,
  '',
].join('\n');

const outputPath = path.join(deploymentDirectory, 'database.sql');
fs.writeFileSync(outputPath, sql, 'utf8');
console.log(`Created ${outputPath} with ${seed.length} initial news items.`);
