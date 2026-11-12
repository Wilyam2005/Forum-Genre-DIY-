# Deploy Forum GenRe DIY ke VPS

Folder ini berisi aplikasi web hasil build, API Node.js, database SQLite, dan konfigurasi Docker/Caddy. Database dibuat otomatis saat aplikasi pertama kali dijalankan dan disimpan di `data/genre.sqlite`.

## Persiapan di VPS

- VPS Linux dengan Docker Engine dan Docker Compose plugin.
- Domain dengan akses pengaturan DNS.
- Firewall VPS mengizinkan koneksi masuk pada port TCP 80 dan 443.

## Langkah deploy

1. Pastikan folder `public/` berisi hasil build terbaru. Dari folder proyek utama, jalankan `npm run build:deploy`, lalu salin isi `dist/` ke `deploy/genre/public/`.
2. Salin seluruh folder `deploy/genre/` ke VPS.
3. Di VPS, masuk ke folder tersebut lalu salin `.env.example` menjadi `.env`.
4. Isi `DOMAIN` dengan domain yang akan dipakai. Ganti `ADMIN_PASSWORD` dengan password rahasia minimal 12 karakter.
5. Buat secret sesi menggunakan `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"` lalu isikan hasilnya ke `SESSION_SECRET`.
6. Arahkan DNS record `A` domain ke alamat IP VPS. Jika memakai record `AAAA`, pastikan IPv6 VPS juga aktif.
7. Jalankan `docker compose up -d --build`.
8. Verifikasi aplikasi dengan `docker compose ps` dan `docker compose logs -f app caddy`, lalu buka domain menggunakan HTTPS.

Caddy akan meminta sertifikat TLS otomatis setelah DNS mengarah ke VPS dan port 80/443 dapat diakses.

## Database dan keamanan

- Data berita, status publikasi, sorotan, jumlah tayangan, dan tombol tautan cepat disimpan di SQLite.
- `data/` dipasang sebagai direktori persisten. Jangan hapus folder tersebut ketika memperbarui aplikasi.
- Password admin dan secret sesi hanya disimpan di `.env`, bukan di frontend atau Git.
- Untuk mencadangkan database, hentikan aplikasi dengan `docker compose stop app`, salin `data/genre.sqlite` ke lokasi aman, lalu hidupkan kembali dengan `docker compose start app`.
- Jangan mengunggah `.env` atau berkas database produksi ke repositori publik.

## Pengembangan lokal

`npm run dev` tetap menggunakan penyimpanan browser lokal. API dan SQLite aktif pada paket Docker ini, agar situs lokal lama tetap dapat dijalankan tanpa server.
