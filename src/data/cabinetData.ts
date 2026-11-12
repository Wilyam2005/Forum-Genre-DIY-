import { Division, Member } from '../types';

export const DIVISIONS: Division[] = [
  {
    id: 'bph',
    name: 'Badan Pengurus Harian',
    shortName: 'BPH',
    description: 'Jantung kepemimpinan dan penggerak utama orkestrasi arah strategis Kabinet AnomAdiwarna Genre DIY 2025-2027.',
    groupImage: '/posters/1.png',
    localGroupPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\1.png',
    coordinator: 'Noer Ahmad Syafiai',
    accentColor: '#D97706',
    badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
    memberCount: 5,
    iconName: 'Crown',
    focusAreas: ['Manajemen Organisasi', 'Kebijakan Strategis', 'Sinergi Antar Bidang', 'Akuntabilitas & Tata Kelola']
  },
  {
    id: 'ekraf',
    name: 'Ekonomi Kreatif',
    shortName: 'EKRAF',
    description: 'Pemberdayaan kemandirian finansial dan inkubasi wirausaha muda kreatif Genre DIY yang adaptif dan solutif.',
    groupImage: '/posters/7.png',
    localGroupPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\7.png',
    coordinator: 'Carolina Anya Azalia P',
    accentColor: '#059669',
    badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    memberCount: 6,
    iconName: 'Sparkles',
    focusAreas: ['Produk Kreatif & Merchandise', 'Ekonomi Remaja Mandiri', 'Fundraising Inovatif', 'Kewirausahaan Berencana']
  },
  {
    id: 'p4m',
    name: 'Perencanaan Pengembangan Program & Pengabdian Masyarakat',
    shortName: 'P4M',
    description: 'Garda terdepan inovasi program kerja berdampak langsung, edukasi Triad KKR, serta pengabdian masyarakat nyata di DIY.',
    groupImage: '/posters/14.png',
    localGroupPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\14.png',
    coordinator: 'Yuswan Dwi Hidayat',
    accentColor: '#0284C7',
    badgeColor: 'bg-sky-50 text-sky-900 border-sky-200',
    memberCount: 9,
    iconName: 'HeartHandshake',
    focusAreas: ['Edukasi Triad KKR', 'Pemberdayaan Remaja Sebaya', 'Program Prioritas Kemendikbangga', 'Aksi Sosial Kemasyarakatan']
  },
  {
    id: 'psdm',
    name: 'Pengembangan Sumber Daya Manusia',
    shortName: 'PSDM',
    description: 'Kawah candradimuka pembinaan karakter, peningkatan kapasitas kompetensi insan Genre, dan soliditas internal kepengurusan.',
    groupImage: '/posters/24.png',
    localGroupPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\24.png',
    coordinator: 'Ayesha Shifa',
    accentColor: '#7C3AED',
    badgeColor: 'bg-purple-50 text-purple-900 border-purple-200',
    memberCount: 7,
    iconName: 'Users',
    focusAreas: ['Upgrading & Training', 'Internal Bonding & Kesejahteraan Anggota', 'Seleksi & Regenerasi', 'Evaluasi Kinerja']
  },
  {
    id: 'humas',
    name: 'Humas dan Kerjasama',
    shortName: 'HUMAS',
    description: 'Jembatan komunikasi diplomatis dan akselerator kolaborasi pentahelix dengan stakeholder pemerintah, mitra swasta, dan jejaring komunitas.',
    groupImage: '/posters/32.png',
    localGroupPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\32.png',
    coordinator: 'Siti Yulaeha',
    accentColor: '#DB2777',
    badgeColor: 'bg-pink-50 text-pink-900 border-pink-200',
    memberCount: 6,
    iconName: 'Network',
    focusAreas: ['Hubungan Media & Stakeholder', 'Kemitraan Strategis', 'Narahubung Publik', 'Sponsorship & Audiensi']
  },
  {
    id: 'medkom',
    name: 'Media dan Komunikasi',
    shortName: 'MEDKOM',
    description: 'Ujung tombak visual storytelling, branding digital, manajemen konten interaktif, dan diseminasi data informasi Genre DIY kekinian.',
    groupImage: '/posters/39.png',
    localGroupPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\39.png',
    coordinator: 'Wilyam Yazid Hamdi',
    accentColor: '#0D9488',
    badgeColor: 'bg-teal-50 text-teal-900 border-teal-200',
    memberCount: 6,
    iconName: 'Camera',
    focusAreas: ['Desain Grafis & Audio Visual', 'Social Media Management', 'Kampanye Digital Terpadu', 'Sistem Data & Informasi']
  }
];

export const MEMBERS: Member[] = [
  // --- BPH (1-6) ---
  {
    id: 2,
    name: 'Noer Ahmad Syafiai',
    role: 'Ketua',
    divisionId: 'bph',
    divisionName: 'BPH',
    image: '/posters/2.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\2.png',
    quote: 'Membawa Genre DIY berakar pada nilai luhur Yogyakarta, bertumbuh adaptif menjawab tantangan masa depan remaja.',
    instagram: '@genre_diy',
    tags: ['Ketua Umum', 'Leadership', 'Strategic Vision']
  },
  {
    id: 3,
    name: 'Baso Rifaldi',
    role: 'Wakil Ketua',
    divisionId: 'bph',
    divisionName: 'BPH',
    image: '/posters/3.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\3.png',
    quote: 'Sinergi tanpa henti, mewujudkan kolaborasi inklusif antar lini kepengurusan.',
    instagram: '@genre_diy',
    tags: ['Wakil Ketua', 'Operations', 'Strategic Execution']
  },
  {
    id: 4,
    name: 'Vista Aulia Rahmadanti',
    role: 'Sekretaris',
    divisionId: 'bph',
    divisionName: 'BPH',
    image: '/posters/4.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\4.png',
    quote: 'Tertib administrasi adalah cerminan profesionalitas dan akuntabilitas organisasi generasi emas.',
    instagram: '@genre_diy',
    tags: ['Sekretaris', 'Administrasi', 'Tata Kelola']
  },
  {
    id: 5,
    name: 'Andhini Dwi Isnayanti',
    role: 'Wakil Sekretaris',
    divisionId: 'bph',
    divisionName: 'BPH',
    image: '/posters/5.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\5.png',
    quote: 'Dokumentasi rapi, komunikasi presisi, gerak langkah organisasi senantiasa harmonis.',
    instagram: '@genre_diy',
    tags: ['Wakil Sekretaris', 'Notulensi', 'Arsip']
  },
  {
    id: 6,
    name: 'Maulin Cikal Widyandani',
    role: 'Bendahara',
    divisionId: 'bph',
    divisionName: 'BPH',
    image: '/posters/6.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\6.png',
    quote: 'Transparansi finansial mewujudkan kepercayaan penuh dan daya tahan pergerakan pemuda.',
    instagram: '@genre_diy',
    tags: ['Bendahara', 'Financial Planning', 'Transparansi']
  },

  // --- EKONOMI KREATIF (7-13) ---
  {
    id: 8,
    name: 'Carolina Anya Azalia P',
    role: 'Koordinator Bidang',
    divisionId: 'ekraf',
    divisionName: 'EKRAF',
    image: '/posters/8.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\8.png',
    quote: 'Mengubah ide kreatif menjadi roda kemandirian finansial yang menginspirasi pemuda Jogja.',
    instagram: '@genre_diy',
    tags: ['Creative Economy', 'Business Modeling']
  },
  {
    id: 9,
    name: 'Jeni Kurnia Hati',
    role: 'Koor Sub Bidang Usaha dan Produk Kreatif',
    divisionId: 'ekraf',
    divisionName: 'EKRAF',
    subDivision: 'Usaha & Produk Kreatif',
    image: '/posters/9.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\9.png',
    quote: 'Karya bernilai jual tinggi berawal dari keberanian merespons tren generasi muda.',
    instagram: '@genre_diy',
    tags: ['Merchandise', 'Product Design']
  },
  {
    id: 10,
    name: 'Talitha Nadia Hunafa',
    role: 'Sub Bidang Usaha dan Produk Kreatif',
    divisionId: 'ekraf',
    divisionName: 'EKRAF',
    subDivision: 'Usaha & Produk Kreatif',
    image: '/posters/10.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\10.png',
    quote: 'Sentuhan estetik dan inovasi tiada henti dalam tiap produk kebanggaan Genre DIY.',
    instagram: '@genre_diy',
    tags: ['Produk Kreatif', 'Branding Produk']
  },
  {
    id: 11,
    name: 'Devlin Putri Jessyca',
    role: 'Sub Bidang Usaha dan Produk Kreatif',
    divisionId: 'ekraf',
    divisionName: 'EKRAF',
    subDivision: 'Usaha & Produk Kreatif',
    image: '/posters/11.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\11.png',
    quote: 'Peluang hadir saat kreativitas dipadukan dengan konsistensi eksekusi yang nyata.',
    instagram: '@genre_diy',
    tags: ['Distribusi', 'Pemasaran']
  },
  {
    id: 12,
    name: 'Natasya Azzahra Najwa W',
    role: 'Koordinator Sub Bidang Ekonomi Remaja',
    divisionId: 'ekraf',
    divisionName: 'EKRAF',
    subDivision: 'Ekonomi Remaja',
    image: '/posters/12.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\12.png',
    quote: 'Remaja mandiri finansial adalah fondasi keluarga tangguh di masa depan.',
    instagram: '@genre_diy',
    tags: ['Ekonomi Remaja', 'Financial Literacy']
  },
  {
    id: 13,
    name: 'Juvita Putri Maharani',
    role: 'Sub Bidang Ekonomi Remaja',
    divisionId: 'ekraf',
    divisionName: 'EKRAF',
    subDivision: 'Ekonomi Remaja',
    image: '/posters/13.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\13.png',
    quote: 'Belajar berbisnis sejak muda melatih mental tangguh pantang menyerah.',
    instagram: '@genre_diy',
    tags: ['Literasi Keuangan', 'Inkubasi Bisnis']
  },

  // --- P4M (14-23) ---
  {
    id: 15,
    name: 'Yuswan Dwi Hidayat',
    role: 'Koordinator Bidang',
    divisionId: 'p4m',
    divisionName: 'P4M',
    image: '/posters/15.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\15.png',
    quote: 'Merancang program bukan sekadar terlaksana, melainkan menyentuh dan mengubah hidup remaja.',
    instagram: '@genre_diy',
    tags: ['Program Planning', 'Pengabdian Masyarakat']
  },
  {
    id: 16,
    name: 'Wuri Rahmadiani',
    role: 'Koor Sub Bidang Remaja',
    divisionId: 'p4m',
    divisionName: 'P4M',
    subDivision: 'Remaja',
    image: '/posters/16.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\16.png',
    quote: 'Mendengar, memahami, dan merangkul suara remaja dari seluruh pelosok DIY.',
    instagram: '@genre_diy',
    tags: ['Pemberdayaan Remaja', 'Peer Counselor']
  },
  {
    id: 17,
    name: 'Shufia Agnia',
    role: 'Sub Bidang Remaja',
    divisionId: 'p4m',
    divisionName: 'P4M',
    subDivision: 'Remaja',
    image: '/posters/17.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\17.png',
    quote: 'Ruang aman bagi remaja untuk bercerita dan berkembang tanpa rasa takut terhakimi.',
    instagram: '@genre_diy',
    tags: ['Remaja Sebaya', 'Edukasi KKR']
  },
  {
    id: 18,
    name: 'Fika Nuraini Romadhona',
    role: 'Sub Bidang Remaja',
    divisionId: 'p4m',
    divisionName: 'P4M',
    subDivision: 'Remaja',
    image: '/posters/18.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\18.png',
    quote: 'Merajut kebersamaan remaja dengan edukasi bermakna dan menyenangkan.',
    instagram: '@genre_diy',
    tags: ['Pendampingan', 'Konseling']
  },
  {
    id: 19,
    name: 'Agung Putra Darmara',
    role: 'Koor Sub Bidang Program Prioritas Kemendikbangga',
    divisionId: 'p4m',
    divisionName: 'P4M',
    subDivision: 'Prioritas Kemendikbangga',
    image: '/posters/19.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\19.png',
    quote: 'Menyukseskan agenda prioritas kependudukan, pencegahan stunting dari hulu, dan keluarga berkualitas.',
    instagram: '@genre_diy',
    tags: ['Prioritas Nasional', 'Cegah Stunting']
  },
  {
    id: 20,
    name: 'Sayyidatu Marsa Salsabila',
    role: 'Sub Bidang Program Prioritas Kemendikbangga',
    divisionId: 'p4m',
    divisionName: 'P4M',
    subDivision: 'Prioritas Kemendikbangga',
    image: '/posters/20.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\20.png',
    quote: 'Kesehatan reproduksi remaja adalah kunci melahirkan generasi masa depan yang unggul.',
    instagram: '@genre_diy',
    tags: ['Edukasi Gizi Remaja', 'Advokasi']
  },
  {
    id: 21,
    name: 'Muhammad Akbar Syahputra',
    role: 'Koor Sub Bidang Masyarakat',
    divisionId: 'p4m',
    divisionName: 'P4M',
    subDivision: 'Masyarakat',
    image: '/posters/21.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\21.png',
    quote: 'Hadir langsung di tengah masyarakat, menebarkan energi positif dan aksi konkrit.',
    instagram: '@genre_diy',
    tags: ['Bakti Sosial', 'Community Engagement']
  },
  {
    id: 22,
    name: 'Arina Binti Adhima',
    role: 'Sub Bidang Masyarakat',
    divisionId: 'p4m',
    divisionName: 'P4M',
    subDivision: 'Masyarakat',
    image: '/posters/22.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\22.png',
    quote: 'Masyarakat yang guyub dan teredukasi melahirkan lingkungan tumbuh kembang remaja yang optimal.',
    instagram: '@genre_diy',
    tags: ['Sosialisasi Kampung KB', 'Pengabdian']
  },
  {
    id: 23,
    name: 'Muhamad Ridho Rasyidin',
    role: 'Sub Bidang Masyarakat',
    divisionId: 'p4m',
    divisionName: 'P4M',
    subDivision: 'Masyarakat',
    image: '/posters/23.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\23.png',
    quote: 'Beraksi dengan ketulusan, merangkul ragam lapisan demi perubahan nyata.',
    instagram: '@genre_diy',
    tags: ['Aksi Lapangan', 'Pemberdayaan Warga']
  },

  // --- PSDM (24-31) ---
  {
    id: 25,
    name: 'Ayesha Shifa',
    role: 'Koordinator Bidang',
    divisionId: 'psdm',
    divisionName: 'PSDM',
    image: '/posters/25.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\25.png',
    quote: 'Membangun sumber daya manusia berdaya saing, berintegritas tinggi, dan penuh welas asih.',
    instagram: '@genre_diy',
    tags: ['Human Capital', 'Leadership Development']
  },
  {
    id: 26,
    name: 'Abror Rijal Rabbani',
    role: 'Koor Sub Bidang Pengembangan',
    divisionId: 'psdm',
    divisionName: 'PSDM',
    subDivision: 'Pengembangan',
    image: '/posters/26.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\26.png',
    quote: 'Setiap anggota memiliki potensi tak terbatas; tugas kita adalah mengasahnya hingga bersinar.',
    instagram: '@genre_diy',
    tags: ['Capacity Building', 'Training Master']
  },
  {
    id: 27,
    name: 'Stefany Salma Shalikhah',
    role: 'Sub Bidang Pengembangan',
    divisionId: 'psdm',
    divisionName: 'PSDM',
    subDivision: 'Pengembangan',
    image: '/posters/27.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\27.png',
    quote: 'Belajar dan bertumbuh bersama adalah petualangan terindah dalam kepengurusan ini.',
    instagram: '@genre_diy',
    tags: ['Workshop & Modul', 'Self-Improvement']
  },
  {
    id: 28,
    name: 'Ibnu Fahmi Ramadhan',
    role: 'Sub Bidang Pengembangan',
    divisionId: 'psdm',
    divisionName: 'PSDM',
    subDivision: 'Pengembangan',
    image: '/posters/28.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\28.png',
    quote: 'Disiplin dan dedikasi menghasilkan konsistensi kepemimpinan pemuda yang tangguh.',
    instagram: '@genre_diy',
    tags: ['Mentoring', 'Talent Scouting']
  },
  {
    id: 29,
    name: 'Luthfi Yahya',
    role: 'Koor Sub Bidang Internal',
    divisionId: 'psdm',
    divisionName: 'PSDM',
    subDivision: 'Internal',
    image: '/posters/29.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\29.png',
    quote: 'Keluarga kedua yang selalu hangat, merangkul setiap perbedaan dalam kehangatan kekeluargaan.',
    instagram: '@genre_diy',
    tags: ['Internal Harmony', 'Team Bonding']
  },
  {
    id: 30,
    name: 'Syabila Sri Puspitasari',
    role: 'Sub Bidang Internal',
    divisionId: 'psdm',
    divisionName: 'PSDM',
    subDivision: 'Internal',
    image: '/posters/30.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\30.png',
    quote: 'Menjaga senyum dan semangat anggota tetap membara sepanjang 2025-2027.',
    instagram: '@genre_diy',
    tags: ['Wellness Pengurus', 'Gathering']
  },
  {
    id: 31,
    name: 'Maharani Hafizhah',
    role: 'Sub Bidang Internal',
    divisionId: 'psdm',
    divisionName: 'PSDM',
    subDivision: 'Internal',
    image: '/posters/31.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\31.png',
    quote: 'Kebersamaan adalah kekuatan magis yang mengubah hal sulit menjadi penuh tawa.',
    instagram: '@genre_diy',
    tags: ['Regenerasi', 'Keluarga Genre']
  },

  // --- HUMAS DAN KERJASAMA (32-38) ---
  {
    id: 33,
    name: 'Siti Yulaeha',
    role: 'Koordinator Bidang',
    divisionId: 'humas',
    divisionName: 'HUMAS',
    image: '/posters/33.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\33.png',
    quote: 'Membangun jembatan komunikasi yang kokoh, memperluas jejaring aksi pemuda DIY.',
    instagram: '@genre_diy',
    tags: ['Public Relations', 'Strategic Partnership']
  },
  {
    id: 34,
    name: 'Dwika Sindy Ananda',
    role: 'Koor Sub Bidang Narahubung',
    divisionId: 'humas',
    divisionName: 'HUMAS',
    subDivision: 'Narahubung',
    image: '/posters/34.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\34.png',
    quote: 'Komunikasi responsif, ramah, dan solutif sebagai wajah hangat Genre DIY di mata publik.',
    instagram: '@genre_diy',
    tags: ['Public Liaison', 'Customer Care']
  },
  {
    id: 35,
    name: 'Selfa Nabila Khoirunnisa',
    role: 'Sub Bidang Narahubung',
    divisionId: 'humas',
    divisionName: 'HUMAS',
    subDivision: 'Narahubung',
    image: '/posters/35.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\35.png',
    quote: 'Setiap pertanyaan layak mendapat sambutan ramah dan jawaban berencana.',
    instagram: '@genre_diy',
    tags: ['Protokoler', 'Pelayanan Informasi']
  },
  {
    id: 36,
    name: 'Sabda Makarim Banihaqim',
    role: 'Koor Sub Bidang Kerjasama',
    divisionId: 'humas',
    divisionName: 'HUMAS',
    subDivision: 'Kerjasama',
    image: '/posters/36.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\36.png',
    quote: 'Kolaborasi pentahelix adalah akselerator utama memperluas jangkauan kebaikan.',
    instagram: '@genre_diy',
    tags: ['Partnership', 'MoU & Sponsorship']
  },
  {
    id: 37,
    name: 'Dini Nur Aini',
    role: 'Sub Bidang Kerjasama',
    divisionId: 'humas',
    divisionName: 'HUMAS',
    subDivision: 'Kerjasama',
    image: '/posters/37.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\37.png',
    quote: 'Menghubungkan impian remaja dengan para pemangku kebijakan yang peduli masa depan bangsa.',
    instagram: '@genre_diy',
    tags: ['Audiensi Stakeholder', 'Networking']
  },
  {
    id: 38,
    name: 'Rena Suryaningsih',
    role: 'Sub Bidang Kerjasama',
    divisionId: 'humas',
    divisionName: 'HUMAS',
    subDivision: 'Kerjasama',
    image: '/posters/38.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\38.png',
    quote: 'Harmonisasi kerjasama lintas sektor demi generasi muda berkualitas.',
    instagram: '@genre_diy',
    tags: ['Kolaborasi Lembaga', 'Aliansi Remaja']
  },

  // --- MEDIA DAN KOMUNIKASI (39-45) ---
  {
    id: 40,
    name: 'Wilyam Yazid Hamdi',
    role: 'Koordinator Bidang',
    divisionId: 'medkom',
    divisionName: 'MEDKOM',
    image: '/posters/40.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\40.png',
    quote: 'Membingkai narasi positif remaja Jogja lewat estetika visual dan pesan berdampak.',
    instagram: '@genre_diy',
    tags: ['Creative Director', 'Digital Strategy']
  },
  {
    id: 41,
    name: 'Naurah Azzahra',
    role: 'Koor Sub Bidang Manajemen Media Kreatif',
    divisionId: 'medkom',
    divisionName: 'MEDKOM',
    subDivision: 'Media Kreatif',
    image: '/posters/41.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\41.png',
    quote: 'Konten kekinian yang fun, relatable, namun sarat edukasi berbobot bagi Gen Z.',
    instagram: '@genre_diy',
    tags: ['Social Media Strategist', 'Content Planner']
  },
  {
    id: 42,
    name: 'Nurul Ismawati',
    role: 'Sub Bidang Manajemen Media Kreatif',
    divisionId: 'medkom',
    divisionName: 'MEDKOM',
    subDivision: 'Media Kreatif',
    image: '/posters/42.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\42.png',
    quote: 'Warna, tipografi, dan komposisi adalah bahasa universal menggerakkan nurani remaja.',
    instagram: '@genre_diy',
    tags: ['Graphic Designer', 'Visual Art']
  },
  {
    id: 43,
    name: 'Restu Pratama Ramdhan',
    role: 'Sub Bidang Manajemen Media Kreatif',
    divisionId: 'medkom',
    divisionName: 'MEDKOM',
    subDivision: 'Media Kreatif',
    image: '/posters/43.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\43.png',
    quote: 'Menangkap momen magis pergerakan pemuda ke dalam lensa abadi video sinematik.',
    instagram: '@genre_diy',
    tags: ['Videographer', 'Motion Designer']
  },
  {
    id: 44,
    name: 'Dhea Amalia Nur Hidayah',
    role: 'Koordinator Sub Bidang Data dan Informasi',
    divisionId: 'medkom',
    divisionName: 'MEDKOM',
    subDivision: 'Data & Informasi',
    image: '/posters/44.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\44.png',
    quote: 'Data akurat adalah kompas utama merumuskan strategi kampanye remaja tepat sasaran.',
    instagram: '@genre_diy',
    tags: ['Data Analyst', 'Information Architecture']
  },
  {
    id: 45,
    name: 'Rila Desfauri',
    role: 'Sub Bidang Data dan Informasi',
    divisionId: 'medkom',
    divisionName: 'MEDKOM',
    subDivision: 'Data & Informasi',
    image: '/posters/45.png',
    localPath: 'D:\\GENRE DIY 2026\\FG DIY\\POSTER NAMA ANGGHOTA DAN DEVISI DLL\\45.png',
    quote: 'Informasi valid dan terverifikasi mencerdaskan remaja di era banjir informasi digital.',
    instagram: '@genre_diy',
    tags: ['Infografis Data', 'Web Content']
  }
];

// DATA RESMI DARI FORUM GENRE DIY.pdf
export const OFFICIAL_PROFILE = {
  about: {
    title: 'Forum Genre',
    description: 'Forum Genre adalah salah satu organisasi remaja terbesar di Indonesia yang fokus membantu remaja merencanakan masa depannya sehingga dapat mewujudkan mimpi Indonesia Emas 2045. Berdiri sejak tahun 2010, Forum Genre telah berkontribusi aktif dalam membantu dan hadir di tengah-tengah remaja Indonesia melalui Pusat Informasi Konseling Remaja (PIK-R) yang keberadaannya tersebar di berbagai sekolah (SMP/SMA/Perguruan Tinggi) dan masyarakat.',
    establishedYear: 2010,
    targetEra: 'Indonesia Emas 2045'
  },
  stats: [
    { label: 'Tahun Pengabdian', value: '15+', detail: 'Berdiri Sejak 2010' },
    { label: 'Forum Genre Provinsi', value: '34', detail: 'Seluruh Indonesia' },
    { label: 'Forum Genre Kab/Kota', value: '382', detail: 'Tingkat Daerah' },
    { label: 'Pusat Informasi & Konseling Remaja', value: '33.321', detail: 'PIK-R Sekolah & Warga' },
    { label: 'Anggota Aktif', value: '440.000+', detail: 'Remaja Berencana' },
    { label: 'Mitra & Partners', value: '300+', detail: 'Lintas Sektor' },
    { label: 'Projek & Aksi Nyata', value: '200+', detail: 'Telah Terlaksana' },
    { label: 'Total Media Followers', value: '400.000+', detail: 'Jejaring Digital' },
    { label: 'Penerima Manfaat', value: '6.000.000', detail: 'Masyarakat & Pemuda' }
  ],
  hierarchy: [
    { level: 'Pusat', name: 'Genre Indonesia', desc: 'Tingkat Nasional Pengarah Kebijakan Makro' },
    { level: 'Provinsi', name: 'Genre Prov (D.I. Yogyakarta)', desc: 'Penggerak & Pembina Wilayah Provinsi' },
    { level: 'Kab/Kota', name: 'Genre Kab/Kota', desc: 'Ujung Tombak Eksekusi di 5 Wilayah DIY' },
    { level: 'Basis', name: 'PIK-R', desc: 'Pusat Informasi Konseling Remaja Sekolah & Desa' }
  ],
  pillars: {
    tujuan: [
      'Meningkatkan kualitas remaja',
      'Membantu remaja merencanakan masa depan',
      'Mencegah risiko TRIAD KRR (seks bebas, napza, pernikahan dini)',
      'Membentuk generasi sehat, cerdas, dan berkarakter'
    ],
    fungsi: [
      'Wadah koordinasi remaja',
      'Penggerak program dan kegiatan',
      'Media edukasi dan sosialisasi',
      'Jembatan antara remaja dan Kemendukbangga'
    ],
    peran: [
      'Melakukan sosialisasi ke sekolah & masyarakat',
      'Mengembangkan dan membina PIK-R',
      'Mengadakan pelatihan dan kampanye',
      'Kolaborasi dengan instansi dan komunitas'
    ],
    sasaran: [
      'Remaja usia 10 - 24 tahun yang belum menikah',
      'Pendidik Sebaya (Peer Educator) & Konselor Sebaya (Peer Counselor)',
      'Keluarga yang memiliki remaja serta lingkungan masyarakat umum'
    ]
  },
  philosophy: {
    name: 'AnomAdiwarna',
    anom: {
      term: 'ANOM',
      meaning: 'Anom bermakna muda atau remaja, melambangkan semangat, energi, dan potensi generasi muda sebagai agen perubahan.'
    },
    adi: {
      term: 'ADI',
      meaning: 'Adi berarti unggul atau luhur, mencerminkan nilai keutamaan, integritas, serta kualitas kepemimpinan yang berkarakter.'
    },
    adiwarna: {
      term: 'ADIWARNA',
      meaning: 'Adiwarna bermakna keberagaman, menggambarkan perbedaan latar belakang, gagasan, dan potensi remaja yang berpadu menjadi kekuatan bersama.'
    },
    synthesis: 'Secara keseluruhan, Anom Adiwarna bermakna remaja yang berkarakter unggul dalam keberagaman, bergerak bersama, dan berdampak nyata bagi lingkungan dan masyarakat.'
  },
  cabinetFocus: [
    {
      id: 'focus-1',
      title: 'Penguatan Sinergi Berkelanjutan PIK-R dan Forum Genre Kabupaten/Kota',
      desc: 'Forum Genre DIY berfokus pada penguatan sinergi yang berkesinambungan antara Pusat Informasi dan Konseling Remaja (PIK-R) dengan Forum Genre Kabupaten/Kota sebagai ujung tombak pelaksanaan program di daerah. Melalui koordinasi, pendampingan, dan integrasi program yang terstruktur, kabinet mendorong agar setiap kegiatan Genre dapat berjalan selaras, berkelanjutan, serta memberikan dampak nyata bagi remaja di seluruh wilayah Daerah Istimewa Yogyakarta.'
    },
    {
      id: 'focus-2',
      title: 'Perluasan Kolaborasi dan Dukungan Lintas Sektor',
      desc: 'Forum Genre DIY mengarahkan upaya organisasi pada perluasan kolaborasi dengan berbagai pihak lintas sektor, baik pemerintah, lembaga pendidikan, komunitas, maupun mitra strategis lainnya. Kolaborasi ini bertujuan untuk memperkuat pelaksanaan program, memperluas jangkauan sasaran, serta meningkatkan efektivitas dan keberlanjutan kegiatan.'
    },
    {
      id: 'focus-3',
      title: 'Pembentukan SDM Berkualitas dalam Lingkungan Organisasi yang Solid',
      desc: 'Forum Genre DIY berfokus pada pembentukan sumber daya manusia yang berkualitas, berdaya saing, dan berintegritas dengan tetap menjunjung tinggi nilai kebersamaan. Penguatan kualitas individu yang disertai dengan solidaritas, kekompakan, dan rasa saling memiliki diharapkan mampu menciptakan organisasi yang solid, adaptif, dan berkelanjutan.'
    }
  ],
  distinction: {
    title: 'Perbedaan Duta Genre & Forum Genre',
    forumGenre: {
      name: 'Forum Genre',
      desc: 'Forum Genre merupakan wadah atau organisasi remaja yang menjadi tempat berhimpun, berkoordinasi, dan menjalankan berbagai program kerja terkait edukasi dan pengembangan remaja, seperti melalui kegiatan PIK-R.'
    },
    dutaGenre: {
      name: 'Duta Genre',
      desc: 'Duta Genre adalah individu terpilih yang berperan sebagai perwakilan atau ikon dari program Genre. Duta Genre bertugas menjadi role model, menyampaikan pesan-pesan edukatif kepada remaja, serta menjadi wajah program dalam berbagai kegiatan.'
    }
  }
};
