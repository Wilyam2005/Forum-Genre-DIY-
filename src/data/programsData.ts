import { ProgramItem } from '../types';

// ============================================================
//  DATA PROGRAM KERJA RESMI KABINET ANOMADIWARNA 2025–2027
//  Forum Genre D.I. Yogyakarta
//  Sumber: Dokumen Resmi Kabinet AnomAdiwarna
// ============================================================

export const FLAGSHIP_PROGRAMS: ProgramItem[] = [
  // ─── BPH ──────────────────────────────────────────────────────
  {
    id: 'prog-bph-1',
    title: 'ADUJAK Genre DIY 2026 & Apresiasi Duta Genre',
    tagline: 'Puncak Apresiasi Role Model Remaja Berencana DIY',
    category: 'BPH',
    quarter: 'Q2–Q4 2025 & 2026',
    date: 'Mei–Oktober 2025/2026',
    division: 'BPH',
    description:
      'Rangkaian puncak kegiatan yang menggabungkan Apresiasi Duta Genre (pemilihan role model remaja berencana DIY) dan Jambore Ajang Kreativitas. Mencakup karantina kepemimpinan, debat kependudukan, unjuk bakat, dan apresiasi bagi PIK-R serta Forum Genre Kabupaten/Kota.',
    impactMetrics: [
      { label: 'Peserta Jambore', value: '600+ Pemuda' },
      { label: 'Finalis Duta Genre', value: '30 Duta' },
      { label: 'Cabang Lomba', value: '12 Kategori' },
    ],
    status: 'Sedang Berjalan',
    highlights: [
      'Karantina kepemimpinan & debat kependudukan',
      'Unjuk bakat seni tradisional & kontemporer',
      'Apresiasi PIK-R & Forum Genre Kab/Kota',
      'Malam penobatan Duta Genre DIY',
    ],
  },
  {
    id: 'prog-bph-2',
    title: 'Genre Guyup & Rapat Kerja FGI DIY',
    tagline: 'Silaturahmi & Penyelarasan Arah Program Lintas Tingkat',
    category: 'BPH',
    quarter: 'Berkala Setiap Semester',
    date: 'Berkelanjutan 2025–2027',
    division: 'BPH',
    description:
      'Forum silaturahmi, evaluasi berkala, dan penyelarasan arah program antara Forum Genre tingkat provinsi dengan seluruh pengurus di tingkat Kabupaten/Kota se-DIY.',
    impactMetrics: [
      { label: 'Forum Kab/Kota', value: '5 Wilayah' },
      { label: 'Sesi Evaluasi', value: 'Per Semester' },
      { label: 'Pengurus Aktif', value: '45 Insan' },
    ],
    status: 'Sedang Berjalan',
    highlights: [
      'Sinergi Forum Genre Provinsi & Kab/Kota',
      'Evaluasi capaian program kerja berkala',
      'Rapat kerja tahunan FGI DIY',
      'Penyelarasan visi & misi lintas tingkat',
    ],
  },

  // ─── P4M ──────────────────────────────────────────────────────
  {
    id: 'prog-p4m-1',
    title: 'Genre Goes To School & Campus (GGTS/GGTC)',
    tagline: 'Safari Edukasi Interaktif Generasi Berencana se-DIY',
    category: 'P4M',
    quarter: 'Q1 & Q3 Setiap Tahun',
    date: 'Februari–Oktober 2025/2026',
    division: 'P4M',
    description:
      'Safari edukasi tatap muka interaktif ke lebih dari 50 SMA/SMK dan perguruan tinggi se-DIY. Membawakan materi Triad KRR dan life skill, dilengkapi game simulasi Tentang Kita dan Pojok Konseling Sebaya.',
    impactMetrics: [
      { label: 'Sekolah & Kampus', value: '50+ Titik' },
      { label: 'Siswa/Mahasiswa', value: '8.000+ Remaja' },
      { label: 'PIK-R Terbentuk', value: '15 Pos Baru' },
    ],
    status: 'Sedang Berjalan',
    highlights: [
      'Game simulasi modul Tentang Kita',
      'Pojok Konseling Sebaya rahasia & gratis',
      'Materi Triad KRR & life skill interaktif',
      'Sharing session Duta Genre DIY',
    ],
  },
  {
    id: 'prog-p4m-2',
    title: 'GENTING DIY — Gerakan Remaja Cegah Stunting',
    tagline: 'Kampanye Nyata Pencegahan Stunting dari Hulu',
    category: 'P4M',
    quarter: 'Sepanjang Tahun',
    date: 'Berkelanjutan 2025–2027',
    division: 'P4M & HUMAS',
    description:
      'Berkolaborasi dengan Humas, program ini merupakan kampanye pencegahan stunting dari hulu: minum Tablet Tambah Darah (TTD) serentak, edukasi gizi lokal, dan sosialisasi di desa binaan.',
    impactMetrics: [
      { label: 'Tablet TTD Terdistribusi', value: '12.000+ Butir' },
      { label: 'Desa/Kalurahan Binaan', value: '25 Titik' },
      { label: 'Remaja Putri Terpapar', value: '6.500+ Orang' },
    ],
    status: 'Sedang Berjalan',
    highlights: [
      'Minum TTD serentak di 5 Kab/Kota',
      'Edukasi gizi lokal & "Isi Piringku"',
      'Sosialisasi di desa/kalurahan binaan',
      'Kolaborasi lintas divisi HUMAS & P4M',
    ],
  },
  {
    id: 'prog-p4m-3',
    title: 'Genre on the Street',
    tagline: 'Kampanye Publik Interaktif di Ruang Terbuka',
    category: 'P4M',
    quarter: 'Q1–Q4 Setiap Tahun',
    date: 'Rutin Setiap Kuartal',
    division: 'P4M',
    description:
      'Kampanye publik interaktif di ruang terbuka (seperti Car Free Day) yang menghadirkan booth edukasi Genre, konseling remaja ringan, kuis edukatif, hingga pemetaan minat bergabung ke PIK-R.',
    impactMetrics: [
      { label: 'Lokasi Kampanye', value: '10+ Titik' },
      { label: 'Pengunjung Booth', value: '3.000+ Orang' },
      { label: 'Minat PIK-R Baru', value: '200+ Remaja' },
    ],
    status: 'Sedang Berjalan',
    highlights: [
      'Booth edukasi Genre di Car Free Day',
      'Konseling remaja ringan & kuis edukatif',
      'Pemetaan minat bergabung PIK-R',
      'Distribusi materi informasi Triad KRR',
    ],
  },
  {
    id: 'prog-p4m-4',
    title: 'Adiwarna in Action',
    tagline: 'Aksi Pengabdian Masyarakat Langsung ke Desa Binaan',
    category: 'P4M',
    quarter: 'Q2 & Q4 Setiap Tahun',
    date: 'Berkelanjutan 2025–2027',
    division: 'P4M',
    description:
      'Aksi pengabdian masyarakat nyata yang turun langsung ke desa atau kelurahan binaan untuk berkolaborasi dengan komunitas: Karang Taruna, Bina Keluarga Remaja (BKR), dan Bina Keluarga Lansia (BKL).',
    impactMetrics: [
      { label: 'Desa/Kelurahan', value: '10+ Binaan' },
      { label: 'Mitra Komunitas', value: 'BKR, BKL, Karang Taruna' },
      { label: 'Penerima Manfaat', value: '2.000+ Warga' },
    ],
    status: 'Sedang Berjalan',
    highlights: [
      'Kolaborasi dengan Karang Taruna & BKR',
      'Edukasi keluarga di kalurahan binaan',
      'Program BKL (Bina Keluarga Lansia)',
      'Dokumentasi & monitoring dampak lapangan',
    ],
  },

  // ─── EKRAF ────────────────────────────────────────────────────
  {
    id: 'prog-ekraf-1',
    title: 'GEDONGAN — Genre Dodol Sandhangan',
    tagline: 'Unit Bisnis Resmi Merchandise & Atribut Genre DIY',
    category: 'EKRAF',
    quarter: 'Berkelanjutan',
    date: 'Sepanjang 2025–2027',
    division: 'EKRAF',
    description:
      'Unit bisnis resmi organisasi yang memproduksi dan memasarkan merchandise serta atribut resmi (seperti pakaian dan pernak-pernik ajang ADUJAK) sebagai sumber pendanaan mandiri organisasi.',
    impactMetrics: [
      { label: 'Produk Terjual', value: '1.200+ Pcs' },
      { label: 'Dana Mandiri', value: 'Rp 45 Juta+' },
      { label: 'Jenis Produk', value: '15+ Varian' },
    ],
    status: 'Sedang Berjalan',
    highlights: [
      'Official merch drop AnomAdiwarna Series',
      'Atribut resmi ajang ADUJAK Genre DIY',
      'Pakaian & pernak-pernik berkarakter Genre',
      'Sumber pendanaan mandiri organisasi',
    ],
  },
  {
    id: 'prog-ekraf-2',
    title: 'LOKAKAYA',
    tagline: 'Publikasi Digital & Promosi UMKM Mitra UPPKA',
    category: 'EKRAF',
    quarter: 'Rutin Bulanan',
    date: 'Berkelanjutan 2025–2027',
    division: 'EKRAF',
    description:
      'Program publikasi digital di media sosial yang membantu memperluas eksposur dan memasarkan produk-produk UMKM lokal mitra UPPKA secara profesional.',
    impactMetrics: [
      { label: 'UMKM Mitra', value: '20+ Pelaku' },
      { label: 'Konten Dipublikasi', value: '60+ Konten' },
      { label: 'Jangkauan Audience', value: '50.000+ Impresi' },
    ],
    status: 'Sedang Berjalan',
    highlights: [
      'Kurasai & publikasi konten UMKM mitra',
      'Kolaborasi strategis UPPKA & Genre DIY',
      'Pemasaran digital profesional berbasis data',
      'Ekspansi pasar produk lokal DIY',
    ],
  },
  {
    id: 'prog-ekraf-3',
    title: 'Create and Communicate (CnC)',
    tagline: 'Kelas Pemberdayaan Soft-Skill & Kemandirian Ekonomi Remaja',
    category: 'EKRAF',
    quarter: 'Q1–Q3 Setiap Tahun',
    date: 'Berkala 2025–2027',
    division: 'EKRAF',
    description:
      'Rangkaian kelas pemberdayaan soft-skill: beauty class, public speaking, dan workshop keterampilan tangan (membatik/merangkai bunga) guna membangun kemandirian ekonomi remaja PIK-R dan Finalis Duta Genre.',
    impactMetrics: [
      { label: 'Peserta Kelas', value: '180+ Remaja' },
      { label: 'Jenis Workshop', value: '5+ Kelas' },
      { label: 'Mitra Pelatih', value: '10+ Profesional' },
    ],
    status: 'Sedang Berjalan',
    highlights: [
      'Beauty class & public speaking workshop',
      'Workshop membatik & merangkai bunga',
      'Sasaran: Remaja PIK-R & Finalis Duta Genre',
      'Membangun kemandirian ekonomi pemuda',
    ],
  },

  // ─── MEDKOM ───────────────────────────────────────────────────
  {
    id: 'prog-medkom-1',
    title: 'Website Genre DIY',
    tagline: 'Portal Digital Terpadu Kabinet AnomAdiwarna',
    category: 'MEDKOM',
    quarter: 'Q1 2025 (Launch)',
    date: 'Rilis & Berkelanjutan 2025–2027',
    division: 'MEDKOM',
    description:
      'Pembangunan portal digital terpadu sebagai pusat akses profil kabinet, modul panduan, artikel informasi edukatif, serta sentralisasi data (Dashboard Monitoring) PIK-R se-DIY.',
    impactMetrics: [
      { label: 'Konten Dipublikasi', value: '100+ Artikel' },
      { label: 'Data PIK-R Terpusat', value: 'Se-DIY' },
      { label: 'Rata-rata Pengunjung', value: '5.000+/Bulan' },
    ],
    status: 'Sedang Berjalan',
    highlights: [
      'Profil kabinet & database anggota online',
      'Modul panduan edukasi Triad KRR digital',
      'Dashboard monitoring data PIK-R se-DIY',
      'Artikel & berita kegiatan Genre DIY',
    ],
  },
  {
    id: 'prog-medkom-2',
    title: 'Podcast Re-Action Talk',
    tagline: 'Siniar Edukatif Isu Kependudukan & Gaya Hidup Remaja',
    category: 'MEDKOM',
    quarter: 'Rutin Dwi-Mingguan',
    date: 'Berkelanjutan 2025–2027',
    division: 'MEDKOM',
    description:
      'Siniar edukatif yang membahas isu kependudukan, kesehatan reproduksi, dan tren remaja yang dikemas menarik dalam bentuk video klip singkat (clipper) di media sosial.',
    impactMetrics: [
      { label: 'Episode Dirilis', value: '36+ Episode' },
      { label: 'Total Views', value: '150.000+' },
      { label: 'Platform Distribusi', value: 'YouTube, Spotify' },
    ],
    status: 'Sedang Berjalan',
    highlights: [
      'Isu kependudukan & kesehatan reproduksi',
      'Format clipper viral di media sosial',
      'Bintang tamu psikolog, dokter & tokoh muda',
      'Distribusi di YouTube, Spotify & TikTok',
    ],
  },
  {
    id: 'prog-medkom-3',
    title: 'Pelatihan Desain Grafis & Genre Media Kit',
    tagline: 'Standardisasi Visual & Peningkatan Skill Admin PIK-R',
    category: 'MEDKOM',
    quarter: 'Q1 & Q3 Setiap Tahun',
    date: 'Berkala 2025–2027',
    division: 'MEDKOM',
    description:
      'Lokakarya peningkatan skill desain (Canva/Software Grafis) bagi para admin sosmed PIK-R, sekaligus penyebaran buku pedoman identitas visual (Logo, Font, Warna) agar tampilan feeds seluruh PIK-R se-DIY terstandardisasi.',
    impactMetrics: [
      { label: 'Admin PIK-R Dilatih', value: '150+ Orang' },
      { label: 'PIK-R Ter-onboard', value: '100+ PIK-R' },
      { label: 'Media Kit Terdistribusi', value: 'Se-DIY' },
    ],
    status: 'Mendatang',
    highlights: [
      'Workshop Canva & software grafis profesional',
      'Penyebaran buku pedoman identitas visual Genre',
      'Standardisasi tampilan feeds PIK-R se-DIY',
      'Komunitas admin PIK-R digital aktif',
    ],
  },
  {
    id: 'prog-medkom-4',
    title: 'MedKom Visit',
    tagline: 'Penjajakan Kerja Sama dengan Redaksi Media Massa Lokal',
    category: 'MEDKOM',
    quarter: 'Q2 Setiap Tahun',
    date: 'Berkala 2025–2027',
    division: 'MEDKOM',
    description:
      'Penjajakan kerja sama melalui kunjungan ke redaksi media massa lokal (seperti Tribun Jogja) untuk memperkuat publisitas kegiatan Genre DIY ke jangkauan masyarakat luas.',
    impactMetrics: [
      { label: 'Media Partner', value: '5+ Redaksi' },
      { label: 'Liputan Terbit', value: '30+ Artikel' },
      { label: 'Jangkauan Pembaca', value: '200.000+' },
    ],
    status: 'Mendatang',
    highlights: [
      'Kunjungan ke redaksi Tribun Jogja & media lokal',
      'MoU kerja sama publisitas Genre DIY',
      'Peningkatan jangkauan ke masyarakat luas',
      'Liputan berkelanjutan kegiatan Genre DIY',
    ],
  },

  // ─── HUMAS ────────────────────────────────────────────────────
  {
    id: 'prog-humas-1',
    title: 'Link N Deal',
    tagline: 'Inisiasi & Pemeliharaan Relasi Mitra Strategis Genre DIY',
    category: 'HUMAS',
    quarter: 'Berkelanjutan',
    date: 'Sepanjang 2025–2027',
    division: 'HUMAS',
    description:
      'Program inisiasi dan pemeliharaan relasi untuk menjaring mitra strategis, instansi pemerintah, komunitas, dan pihak sponsor guna mendukung operasional dan pendanaan program Genre.',
    impactMetrics: [
      { label: 'Mitra Strategis', value: '30+ Instansi' },
      { label: 'MoU Terjalin', value: '15+ Dokumen' },
      { label: 'Dukungan Sponsor', value: 'Rp 80 Juta+' },
    ],
    status: 'Sedang Berjalan',
    highlights: [
      'Jaring mitra pemerintah & komunitas DIY',
      'Pengelolaan hubungan sponsor & donatur',
      'MoU kerja sama strategis lintas sektor',
      'Pemeliharaan relasi berkelanjutan',
    ],
  },
  {
    id: 'prog-humas-2',
    title: 'Genre Connection',
    tagline: 'Penguatan Jaringan Humas Forum Genre 5 Kab/Kota Se-DIY',
    category: 'HUMAS',
    quarter: 'Rutin Per Dua Bulan',
    date: 'Berkelanjutan 2025–2027',
    division: 'HUMAS',
    description:
      'Langkah penguatan jaringan secara proaktif dan berkelanjutan dengan para narahubung (Humas) Forum Genre di 5 Kabupaten/Kota untuk melahirkan kolaborasi bersama yang konkret.',
    impactMetrics: [
      { label: 'Forum Kab/Kota', value: '5 Wilayah' },
      { label: 'Sesi Jaringan', value: 'Per 2 Bulan' },
      { label: 'Kolaborasi Terwujud', value: '10+ Kegiatan' },
    ],
    status: 'Sedang Berjalan',
    highlights: [
      'Koordinasi rutin narahubung 5 Kab/Kota',
      'Forum komunikasi & berbagi informasi',
      'Melahirkan kolaborasi bersama konkret',
      'Sinergi program Genre lintas wilayah',
    ],
  },

  // ─── PSDM ─────────────────────────────────────────────────────
  {
    id: 'prog-psdm-1',
    title: 'Bertumbuh',
    tagline: 'Forum Kajian Kurikulum & Capacity Building Internal Pengurus',
    category: 'PSDM',
    quarter: 'Berkala Per Dua Bulan',
    date: 'Berkelanjutan 2025–2027',
    division: 'PSDM',
    description:
      'Forum pengkajian kurikulum dan pendalaman materi (capacity building) untuk internal pengurus FGI DIY sebagai landasan teoretis sebelum mengeksekusi program di lapangan.',
    impactMetrics: [
      { label: 'Peserta Per Sesi', value: '45 Pengurus' },
      { label: 'Materi Dikaji', value: '20+ Modul' },
      { label: 'Frekuensi', value: 'Dwi-Bulanan' },
    ],
    status: 'Sedang Berjalan',
    highlights: [
      'Capacity building internal pengurus FGI DIY',
      'Pendalaman materi & kurikulum Genre',
      'Landasan teoretis sebelum eksekusi lapangan',
      'Peningkatan kompetensi pengurus berkelanjutan',
    ],
  },
  {
    id: 'prog-psdm-2',
    title: 'Retas Batas & AnomAdiwarna Award',
    tagline: 'Team Building & Apresiasi Kinerja Pengurus Bulanan',
    category: 'PSDM',
    quarter: 'Berkala Tahunan & Bulanan',
    date: 'Berkelanjutan 2025–2027',
    division: 'PSDM',
    description:
      'Upaya menjaga soliditas dan motivasi pengurus melalui kegiatan team building (Retas Batas) serta penganugerahan apresiasi bulanan bagi figur internal yang memiliki kinerja cemerlang.',
    impactMetrics: [
      { label: 'Peserta Team Building', value: '45 Pengurus' },
      { label: 'Penerima Award', value: 'Bulanan' },
      { label: 'Soliditas Internal', value: 'Terukur & Meningkat' },
    ],
    status: 'Sedang Berjalan',
    highlights: [
      'Team building Retas Batas tahunan',
      'AnomAdiwarna Award pengurus berprestasi',
      'Apresiasi kinerja cemerlang bulanan',
      'Menjaga soliditas & motivasi internal',
    ],
  },
];

// ─── TIMELINE EVENTS ───────────────────────────────────────────
export const TIMELINE_EVENTS = [
  {
    date: 'Januari 2025',
    title: 'Pelantikan & Rakerda Kabinet AnomAdiwarna',
    division: 'BPH & PSDM',
    desc: 'Pengukuhan resmi jajaran 45 pengurus 2025–2027 di hadapan Perwakilan BKKBN DIY dan penetapan Rencana Strategis (Renstra) AnomAdiwarna.',
    status: 'Selesai',
  },
  {
    date: 'Februari – April 2025',
    title: 'Kickoff Genre Goes To School Tahap I (GGTS)',
    division: 'P4M',
    desc: 'Roadshow edukasi ke 20 SMA/SMK di Sleman dan Kota Yogyakarta mengenai Triad KRR, game simulasi Tentang Kita, dan Pojok Konseling Sebaya.',
    status: 'Selesai',
  },
  {
    date: 'Maret 2025',
    title: 'Peluncuran GEDONGAN & Merch Drop AnomAdiwarna',
    division: 'EKRAF',
    desc: 'Peresmian unit bisnis GEDONGAN dan peluncuran perdana merchandise resmi AnomAdiwarna Series sebagai sumber pendanaan mandiri organisasi.',
    status: 'Selesai',
  },
  {
    date: 'April 2025',
    title: 'Genre on the Street — Kampanye Publik Tahap I',
    division: 'P4M',
    desc: 'Kampanye interaktif di Car Free Day Yogyakarta: booth edukasi Genre, konseling ringan, dan pemetaan minat bergabung PIK-R.',
    status: 'Selesai',
  },
  {
    date: 'Mei – Juli 2025',
    title: 'Apresiasi Duta Genre DIY 2025',
    division: 'BPH',
    desc: 'Rangkaian seleksi administrasi, karantina kepemimpinan & budaya, debat kependudukan, unjuk bakat, dan malam penobatan Duta Genre DIY 2025.',
    status: 'Sedang Berjalan',
  },
  {
    date: 'Juni 2025',
    title: 'GENTING DIY — Kampanye Cegah Stunting Tahap I',
    division: 'P4M & HUMAS',
    desc: 'Distribusi Tablet Tambah Darah (TTD) serentak di 5 Kab/Kota, edukasi gizi lokal, dan sosialisasi di kalurahan binaan.',
    status: 'Sedang Berjalan',
  },
  {
    date: 'Agustus 2025',
    title: 'Create and Communicate (CnC) — Workshop Batch I',
    division: 'EKRAF',
    desc: 'Kelas pertama pemberdayaan soft-skill: beauty class, public speaking, dan workshop membatik untuk remaja PIK-R & Finalis Duta Genre.',
    status: 'Mendatang',
  },
  {
    date: 'September 2025',
    title: 'MedKom Visit & Pelatihan Desain Grafis PIK-R',
    division: 'MEDKOM',
    desc: 'Kunjungan ke redaksi Tribun Jogja & media lokal, dilanjutkan workshop Canva & Genre Media Kit untuk admin sosmed PIK-R se-DIY.',
    status: 'Mendatang',
  },
  {
    date: 'Oktober 2025',
    title: 'ADUJAK Genre DIY 2025 — Jambore Ajang Kreativitas',
    division: 'BPH & PSDM',
    desc: 'Temu akbar 600+ pengurus PIK-R se-DIY dalam perkemahan kepemimpinan, kompetisi konten kreatif, dan malam AnomAdiwarna Award.',
    status: 'Mendatang',
  },
  {
    date: 'November 2025',
    title: 'Genre Goes To Campus (GGTC) Tahap II',
    division: 'P4M',
    desc: 'Safari edukasi lanjutan ke perguruan tinggi di Bantul, Gunungkidul, dan Kulon Progo beserta sesi Adiwarna in Action di desa binaan.',
    status: 'Mendatang',
  },
  {
    date: 'Desember 2025',
    title: 'Genre Guyup & Refleksi Akhir Tahun FGI DIY',
    division: 'BPH',
    desc: 'Forum silaturahmi puncak tahunan, evaluasi capaian program 2025, dan penyelarasan target Renstra 2026 bersama seluruh Forum Genre Kab/Kota.',
    status: 'Mendatang',
  },
];
