# Website Profil Organisasi Forum Genre D.I. Yogyakarta
## Kabinet AnomAdiwarna (Masa Bakti 2025 - 2027)

Website resmi profil organisasi **Forum Genre D.I. Yogyakarta (Generasi Berencana Daerah Istimewa Yogyakarta)** untuk **Kabinet AnomAdiwarna** masa bakti **2025 - 2027**. Didesain dengan estetika modern, berjiwa muda (*youthful & energetic*), dilengkapi elemen **3D WebGL interaktif**, tata letak **Bento-Grid asimetris**, **kartu 3D flip effect** untuk 45 anggota & divisi, timeline kegiatan, dan sistem pengujian QA bawaan (**Strix**).

---

## 🌟 Fitur Utama & Keunggulan

1. **Preloader Interaktif Centerpiece Logo Genre**
   - Menggunakan logo resmi `LOGO GENRE.png` dengan animasi aura cahaya *pulsing glow* dan progress bar organik.
2. **Hero Section 3D Interaktif (Three.js WebGL)**
   - Tipografi 3D responsif mouse "*Kabinet AnomAdiwarna 2025-2027*".
   - Inti lambang 3D geometris, cincin orbital emas-biru-toska, 5 satelit kabupaten/kota se-DIY, dan gugusan bintang partikel dinamis.
   - Indikator statistik organisasi: 45 Pengurus, 6 Bidang/Divisi, 5 Kab/Kota, 100% Remaja Berencana.
3. **Tentang Kami & Asymmetrical Bento Grid**
   - **Filosofi AnomAdiwarna**: Makna kata *Anom* (Muda, Inovatif, Pelopor) & *Adiwarna* (Sangat Indah, Cemerlang, Berkilau).
   - **Triad KKR**: Edukasi tolak pernikahan dini, seks pranikah, dan NAPZA.
   - **Salam Genre**: Penjelasan filosofis gestur tiga jari & yel-yel resmi.
   - **8 Fungsi Keluarga**: Fondasi ketahanan keluarga & pencegahan stunting dari hulu.
   - **Visi & Misi 2025-2027**: 5 komitmen aksi strategis organisasi.
4. **Galeri 3D Anggota & Divisi (3D Card Flip Effect)**
   - Menghubungkan seluruh **45 foto poster resmi** dari folder `POSTER NAMA ANGGHOTA DAN DEVISI DLL`.
   - Efek putar kartu 3D (*card flip*) memunculkan nama, jabatan, sub-bidang, quotes inspiratif, tags kompetensi, dan tautan lokal.
   - Filter instan per bidang: BPH, Ekonomi Kreatif, P4M, PSDM, Humas & Kerjasama, Media & Komunikasi.
   - Pencarian cerdas (*live search*) nama atau divisi.
   - Modal inspeksi detail dengan resolusi tinggi.
5. **Program Kerja Unggulan & Interactive Roadmap Timeline**
   - Apresiasi Duta Genre DIY, Genre Goes To School/Campus (GGTS/GGTC), GENTING DIY (Cegah Stunting), Genre Preneur Hub & Merch, ADUJAK DIY, dan Podcast Ngobrol Berencana (Ngobren DIY).
   - Timeline interaktif scroll-triggered dengan status (Selesai, Sedang Berjalan, Mendatang).
6. **Footer Interaktif & Maskot Remaja**
   - Maskot ceria interaktif yang bisa diklik untuk memunculkan pesan edukatif dan efek kembang api / *confetti*.
   - Kanal resmi: Instagram & TikTok (`@genre_diy`), YouTube (`Genre D. I. Yogyakarta`), serta alamat Sekretariat Perwakilan BKKBN D.I. Yogyakarta.
7. **Sistem Pengujian & Evaluasi Built-in (Strix QA & ECC)**
   - Optimasi **ECC (Efficient Compute & Canvas)**: Clamped Device Pixel Ratio (DPR), viewport intersection rendering pause, dan zero-leak disposal.
   - Evaluator **Strix QA**: Panel diagnostik in-app (tekan `Shift + Q` atau tombol floating) + script Node.js CI/CD (`npm run test:strix`).

---

## 📁 Struktur Proyek (Superpowers Architecture)

```
FG DIY/
├── LOGO GENRE.png                          # Logo resmi centerpiece
├── POSTER NAMA ANGGHOTA DAN DEVISI DLL/    # 45 file poster asli (1.png s/d 45.png)
├── public/
│   ├── LOGO GENRE.png                      # Logo web public
│   └── posters/                            # 45 poster untuk web server
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   └── HeroCanvas3D.tsx            # Three.js 3D WebGL Canvas
│   │   ├── about/
│   │   │   ├── AboutSection.tsx            # Section filosofi
│   │   │   └── BentoGrid.tsx               # Bento-grid & modal edukasi
│   │   ├── common/
│   │   │   ├── Navbar.tsx                  # Navbar glassmorphic
│   │   │   ├── Preloader.tsx               # Preloader animasi logo
│   │   │   └── StrixQAInspector.tsx        # In-app QA evaluator
│   │   ├── footer/
│   │   │   ├── Footer.tsx                  # Footer resmi & kontak
│   │   │   └── GenreMascotInteractive.tsx  # Maskot ceria interaktif
│   │   ├── hero/
│   │   │   └── HeroSection.tsx             # 3D Typography & stats
│   │   ├── programs/
│   │   │   ├── ProgramsSection.tsx         # Flagship program cards
│   │   │   └── ProgramTimeline.tsx         # Vertical animated timeline
│   │   └── team/
│   │       ├── DivisionSelector.tsx        # Filter 6 bidang
│   │       ├── MemberDetailModal.tsx       # Detail poster modal
│   │       ├── Roster3DCard.tsx            # 3D Flip card effect
│   │       └── TeamSection.tsx             # Container galeri anggota
│   ├── data/
│   │   ├── cabinetData.ts                  # Database 45 pengurus & 6 divisi
│   │   └── programsData.ts                 # Database program & linimasa
│   ├── types/
│   │   └── index.ts                        # TypeScript interfaces
│   ├── utils/
│   │   ├── eccOptimizer.ts                 # ECC engine optimizer
│   │   └── soundEffects.ts                 # Web Audio procedural SFX
│   ├── App.tsx                             # Master App component
│   ├── index.css                           # Tailwind & 3D CSS utilities
│   └── main.tsx                            # React entry point
├── test/
│   └── strix-qa.js                         # Strix automated QA runner
├── start-website.bat                       # 1-click launcher Windows
├── vite.config.ts                          # Vite config
├── tailwind.config.js                      # Custom brand palette Genre DIY
├── package.json
└── README.md
```

### Deploy dengan database MySQL

Paket deploy Node.js dan MySQL tersedia di [`deploy/genre`](./deploy/genre/README.md), termasuk file SQL skema dan data awal. Berita, sorotan, dan tautan dikelola melalui Portal Admin. Jalankan `npm run build:deploy` untuk membangun frontend deploy, lalu ikuti panduan untuk mengimpor `deploy/genre/database.sql` dan mengatur koneksi MySQL.

---

## 🚀 Cara Menjalankan

### Cara 1: Menggunakan File Batch (1-Klik di Windows)
Cukup klik ganda pada file:
```
start-website.bat
```

### Cara 2: Menggunakan Terminal / Terminal Powershell
1. Jalankan development server:
   ```bash
   npm run dev
   ```

   Untuk login Portal Admin saat pengembangan lokal, salin `.env.development.local.example` menjadi `.env.development.local`, ganti nilainya dengan password pilihan Anda, lalu mulai ulang Vite. File lokal tersebut tidak untuk diunggah.
   Password lokal ini terpisah dari password hosting; atur `ADMIN_PASSWORD` di file `.env` VPS sesuai panduan deploy.
2. Buka URL yang tertera di browser (biasanya `http://localhost:5173`).

### Menjalankan Pengujian Strix QA
Jalankan evaluasi otomatis aset dan integritas data:
```bash
npm run test:strix
```

### Membangun Versi Produksi (*Build Production*)
```bash
npm run build
```
Hasil build produksi siap deploy tersedia di direktori `dist/`.
