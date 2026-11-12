# Deploy Forum Genre DIY

Folder ini berisi frontend, API Node.js, konfigurasi MySQL, dan `database.sql` yang dapat diimpor melalui phpMyAdmin. File SQL berisi skema tabel dan enam berita awal. Jika database belum diimpor, API membuat tabel dan mengisi data awal saat pertama dijalankan.

## Pilihan hosting

- **VPS dengan Docker**: gunakan `docker compose`; paket menjalankan aplikasi, MySQL 8.4, dan Caddy.
- **Hosting dengan Node.js dan MySQL/MariaDB**: buat database dan user di panel hosting, impor `database.sql` melalui phpMyAdmin, lalu jalankan aplikasi Node.js dari folder ini.

Hosting harus mengizinkan aplikasi Node.js versi 22 atau lebih baru dan koneksi ke MySQL/MariaDB.

## VPS dengan Docker

1. Pastikan `public/` berisi frontend terbaru. Dari folder proyek utama, jalankan `npm run build:deploy`, lalu salin isi `dist/` ke `deploy/genre/public/`.
2. Salin seluruh folder `deploy/genre/` ke VPS.
3. Di VPS, salin `.env.example` menjadi `.env`.
4. Isi `DOMAIN`, `ADMIN_PASSWORD` (minimal 12 karakter), `SESSION_SECRET` (minimal 32 karakter), dan password MySQL. Buat nilai `SESSION_SECRET` dengan `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`. Gunakan nilai rahasia yang berbeda untuk password database dan root MySQL.
5. Arahkan DNS domain ke alamat IP VPS dan pastikan port TCP 80 dan 443 terbuka.
6. Jalankan `docker compose up -d --build`.
7. Periksa layanan dengan `docker compose ps` dan log dengan `docker compose logs -f app caddy`.

Caddy akan meminta sertifikat HTTPS otomatis setelah DNS mengarah ke VPS.

## Hosting dengan Node.js dan MySQL/MariaDB

1. Buat database MySQL/MariaDB dan user melalui panel hosting, lalu berikan user akses ke database tersebut.
2. Pilih database di phpMyAdmin dan impor `database.sql`. File ini berisi skema tabel dan data awal, bukan salinan data produksi.
3. Unggah folder `deploy/genre/` dan pasang dependency dengan `npm ci --omit=dev`.
4. Atur environment variables aplikasi Node.js:
   - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` dari panel hosting.
   - `ADMIN_PASSWORD` minimal 12 karakter.
   - `SESSION_SECRET` berupa secret acak minimal 32 karakter.
   - `PORT` sesuai port yang disediakan hosting.
5. Jalankan `npm start` dan arahkan domain ke aplikasi Node.js sesuai panduan provider.

## Database dan keamanan

- Aplikasi memakai MySQL/MariaDB, bukan SQLite. `database.sql` dapat diimpor ke database baru; API membuat skema dari `server/schema.sql` dan mengisi berita awal hanya jika tabel berita kosong.
- Buat file SQL terbaru setelah mengubah skema atau data awal dengan menjalankan `npm run db:export` dari folder `deploy/genre/`.
- Password Portal Admin lokal dan password hosting terpisah. Untuk memakai password yang sama, atur `ADMIN_PASSWORD` di konfigurasi hosting.
- Simpan password database, password admin, dan `SESSION_SECRET` di environment hosting atau `.env` lokal. Jangan unggah `.env` atau database produksi ke GitHub.
- Database VPS disimpan pada volume Docker `mysql-data`. Jangan hapus volume itu saat memperbarui aplikasi.
- Cadangkan database produksi melalui phpMyAdmin atau `mysqldump`; simpan salinan di lokasi aman.

## Pengembangan lokal

`npm run dev` tetap memakai penyimpanan browser lokal. API MySQL digunakan pada paket deploy ini.
