import type { Kegiatan, KategoriKegiatan, TautanCepat } from '../types/kegiatan';

const STORAGE_KEY = 'genre_diy_kegiatan';
const ADMIN_KEY = 'genre_diy_admin_auth';
const FEATURED_NEWS_KEY = 'genre_diy_featured_news';
const QUICK_LINKS_KEY = 'genre_diy_quick_links';
const QUICK_LINKS_CHANGED_EVENT = 'genre:quick-links-changed';
const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const USE_REMOTE_API = import.meta.env.MODE === 'deploy' && Boolean(API_BASE_URL);

async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    credentials: 'same-origin',
  });
  const result = await response.json().catch(() => null) as { error?: string } | T | null;
  if (!response.ok) {
    const message = result && typeof result === 'object' && 'error' in result
      ? result.error
      : `Permintaan gagal (${response.status}).`;
    throw new Error(message || `Permintaan gagal (${response.status}).`);
  }
  return result as T;
}

// ── Seed data ─────────────────────────────────────────────────────────────────
export const SEED_DATA: Kegiatan[] = [
  {
    id: 'keg-001',
    judul: 'Seminar Nasional Generasi Berencana 2025',
    slug: 'seminar-nasional-generasi-berencana-2025',
    ringkasan: 'Seminar bertema "Remaja Sehat, Indonesia Kuat" dengan pembicara dari BKKBN Pusat dan akademisi UGM. Dihadiri lebih dari 300 peserta dari seluruh DIY.',
    konten: `## Seminar Nasional Generasi Berencana 2025

Forum Genre D.I. Yogyakarta sukses menggelar **Seminar Nasional Generasi Berencana 2025** yang bertema *"Remaja Sehat, Indonesia Kuat"*. Kegiatan berlangsung di Gedung Kuliah Umum UGM dan dihadiri lebih dari **300 peserta** dari berbagai kabupaten/kota se-DIY.

### Pembicara Utama
- **Dr. Hasto Wardoyo, Sp.OG(K)** – Kepala BKKBN Pusat
- **Prof. Ova Emilia, M.Med.Ed., Ph.D.** – Guru Besar Fakultas Kedokteran UGM
- **Kak Aulia Rachman** – Ketua Forum Genre DIY Kabinet AnomAdiwarna

### Agenda Kegiatan
1. Registrasi & Welcome Coffee (08.00–09.00 WIB)
2. Pembukaan & Menyanyikan Lagu Indonesia Raya (09.00–09.30)
3. Sesi Seminar Panel (09.30–12.00)
4. ISHOMA (12.00–13.00)
5. Diskusi Kelompok & Workshop Mini (13.00–15.30)
6. Penutupan & Doorprize (15.30–16.00)

### Hasil & Dampak
Seminar ini menghasilkan **Deklarasi Remaja Berencana DIY 2025** yang ditandatangani oleh perwakilan dari 5 kabupaten/kota. Peserta juga mendapatkan modul edukasi kesehatan reproduksi yang dapat diimplementasikan di PIK-R masing-masing.`,
    tanggal: '2025-03-15',
    lokasi: 'Gedung Kuliah Umum UGM, Yogyakarta',
    kategori: 'Seminar',
    divisi: 'HUMAS',
    gambarUtama: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    galeri: [
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80',
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&q=80',
    ],
    tags: ['seminar', 'kesehatan reproduksi', 'generasi berencana', 'UGM'],
    penulis: 'Divisi HUMAS',
    diterbitkan: true,
    dibuatPada: '2025-03-16T10:00:00.000Z',
    diperbarui: '2025-03-16T10:00:00.000Z',
    jumlahViews: 248,
  },
  {
    id: 'keg-002',
    judul: 'Workshop Konten Kreatif & Digital Marketing Remaja',
    slug: 'workshop-konten-kreatif-digital-marketing',
    ringkasan: 'Workshop intensif pembuatan konten media sosial untuk PIK-R se-DIY. Peserta belajar storytelling, desain grafis, dan strategi kampanye digital.',
    konten: `## Workshop Konten Kreatif & Digital Marketing Remaja

Divisi **EKRAF & MEDKOM** Forum Genre DIY menggelar workshop intensif selama **2 hari penuh** bagi pengelola media sosial PIK-R se-D.I. Yogyakarta.

### Materi Workshop
**Hari 1 – Konten Kreatif**
- Dasar-dasar storytelling untuk remaja
- Teknik fotografi menggunakan smartphone
- Desain grafis dengan Canva Pro
- Caption writing yang engaging

**Hari 2 – Digital Strategy**
- Algoritma Instagram & TikTok 2025
- Pembuatan konten video pendek
- Strategi kampanye sosial PIK-R
- Analytics & reporting media sosial

### Output Peserta
Setiap PIK-R pulang dengan **konten siap posting** dan **kalender editorial** selama 1 bulan ke depan.`,
    tanggal: '2025-04-20',
    lokasi: 'Co-Working Space YogLoop, Jl. Magelang Km 6',
    kategori: 'Workshop',
    divisi: 'EKRAF',
    gambarUtama: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    galeri: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
    ],
    tags: ['workshop', 'konten kreatif', 'digital marketing', 'PIK-R', 'media sosial'],
    penulis: 'Divisi EKRAF',
    diterbitkan: true,
    dibuatPada: '2025-04-21T08:00:00.000Z',
    diperbarui: '2025-04-21T08:00:00.000Z',
    jumlahViews: 182,
  },
  {
    id: 'keg-003',
    judul: 'Bakti Sosial Genre Goes to Desa – Gunungkidul',
    slug: 'bakti-sosial-genre-goes-to-desa-gunungkidul',
    ringkasan: 'Kegiatan bakti sosial ke Desa Paliyan, Gunungkidul. Pembagian sembako, penyuluhan kesehatan remaja, dan pembersihan lingkungan bersama warga.',
    konten: `## Bakti Sosial Genre Goes to Desa – Gunungkidul

Dalam rangka memperingati **Hari Remaja Internasional**, Forum Genre DIY bersama Forum Genre Kabupaten Gunungkidul menggelar kegiatan bakti sosial bertajuk **"Genre Goes to Desa"** di Desa Paliyan.

### Rangkaian Kegiatan
- 🌅 **07.00** – Berangkat dari Yogyakarta
- 🏡 **09.00** – Tiba & Pembukaan oleh Kepala Desa
- 🩺 **09.30–11.30** – Penyuluhan Kesehatan Remaja & Konseling
- 🍱 **12.00** – Pembagian 150 paket sembako
- 🌿 **13.00–15.00** – Kerja bakti & penanaman pohon
- 🎉 **15.30** – Pentas seni & penutupan

### Penerima Manfaat
Kegiatan ini menyentuh **±200 warga** termasuk 50 remaja usia PIK-R yang mendapatkan penyuluhan langsung dari kader Genre DIY.`,
    tanggal: '2025-08-12',
    lokasi: 'Desa Paliyan, Kec. Paliyan, Gunungkidul',
    kategori: 'Sosial',
    divisi: 'P4M',
    gambarUtama: 'https://images.unsplash.com/photo-1593113616828-6f22bca04804?w=800&q=80',
    galeri: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80',
    ],
    tags: ['bakti sosial', 'gunungkidul', 'kesehatan', 'remaja', 'desa'],
    penulis: 'Divisi P4M',
    diterbitkan: true,
    dibuatPada: '2025-08-13T07:00:00.000Z',
    diperbarui: '2025-08-13T07:00:00.000Z',
    jumlahViews: 310,
  },
  {
    id: 'keg-004',
    judul: 'Pelatihan Fasilitator PIK-R Angkatan III 2025',
    slug: 'pelatihan-fasilitator-pik-r-angkatan-iii',
    ringkasan: 'Pelatihan intensif 3 hari untuk calon fasilitator PIK-R se-DIY. Materi meliputi konseling sebaya, komunikasi efektif, dan manajemen organisasi.',
    konten: `## Pelatihan Fasilitator PIK-R Angkatan III 2025

Divisi **PSDM** Forum Genre DIY kembali hadir dengan **Pelatihan Fasilitator PIK-R Angkatan III** — program rutin tahunan untuk mencetak kader Genre yang unggul dan siap memimpin.

### Peserta
- 60 peserta dari PIK-R Pelajar & Mahasiswa se-DIY
- Mewakili 15 sekolah/perguruan tinggi

### Kurikulum Pelatihan
| Sesi | Materi | Pemateri |
|------|--------|----------|
| 1 | Dasar-dasar Genre & PIK-R | Kord. PSDM |
| 2 | Konseling Sebaya | Psikolog BKKBN |
| 3 | Komunikasi Efektif | Trainer Muda |
| 4 | Manajemen Organisasi | BPH Genre DIY |
| 5 | Simulasi & Praktik | Tim Fasilitator |

Peserta yang lulus mendapatkan **Sertifikat Fasilitator PIK-R** yang diakui BKKBN D.I. Yogyakarta.`,
    tanggal: '2025-09-05',
    lokasi: 'Balai Diklat BKKBN DIY, Yogyakarta',
    kategori: 'Pelatihan',
    divisi: 'PSDM',
    gambarUtama: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    galeri: [],
    tags: ['pelatihan', 'fasilitator', 'PIK-R', 'PSDM', 'kader'],
    penulis: 'Divisi PSDM',
    diterbitkan: true,
    dibuatPada: '2025-09-06T09:00:00.000Z',
    diperbarui: '2025-09-06T09:00:00.000Z',
    jumlahViews: 195,
  },
  {
    id: 'keg-005',
    judul: 'Kampanye "Stop Pernikahan Dini" di Car Free Day Malioboro',
    slug: 'kampanye-stop-pernikahan-dini-cfd-malioboro',
    ringkasan: 'Aksi kampanye kreatif di CFD Malioboro dengan flash mob, pembagian leaflet, dan instalasi seni interaktif. Menjangkau ribuan warga Yogyakarta.',
    konten: `## Kampanye "Stop Pernikahan Dini" di Car Free Day Malioboro

Forum Genre DIY turun ke jalan! Dalam aksi bertajuk **"Muda, Berencana, Berdampak"**, anggota Forum Genre dari 5 kabupaten/kota berkumpul di **kawasan Malioboro** saat Car Free Day.

### Highlight Kegiatan
🎭 **Flash Mob** – 45 anggota Genre tampil dengan koreografi bertema "Remaja Berencana" yang menarik perhatian ribuan pengunjung CFD.

🖼️ **Instalasi Seni** – Photo booth interaktif dengan properti edukasi tentang dampak pernikahan dini.

📋 **Pembagian Materi** – 1.000 leaflet dan 500 booklet edukasi kesehatan reproduksi remaja.

📱 **Live Streaming** – Total penonton live di Instagram & TikTok mencapai **4.500+** akun.

### Dampak
Pasca kegiatan, akun Instagram @genre_diy mengalami kenaikan followers sebesar **+1.200** dan konten campaign viral dengan total reach **85.000+**.`,
    tanggal: '2025-10-05',
    lokasi: 'Kawasan Malioboro, Yogyakarta',
    kategori: 'Kampanye',
    divisi: 'HUMAS',
    gambarUtama: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
    galeri: [
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80',
    ],
    tags: ['kampanye', 'pernikahan dini', 'malioboro', 'CFD', 'flash mob'],
    penulis: 'Divisi HUMAS',
    diterbitkan: true,
    dibuatPada: '2025-10-06T11:00:00.000Z',
    diperbarui: '2025-10-06T11:00:00.000Z',
    jumlahViews: 521,
  },
  {
    id: 'keg-006',
    judul: 'Rapat Koordinasi Kabupaten/Kota Se-DIY Q4 2025',
    slug: 'rakor-kabupaten-kota-q4-2025',
    ringkasan: 'Rapat koordinasi triwulan IV membahas evaluasi program kerja 2025 dan perencanaan awal 2026. Dihadiri seluruh perwakilan Forum Genre 5 kab/kota.',
    konten: `## Rapat Koordinasi Kabupaten/Kota Se-DIY Q4 2025

BPH Forum Genre DIY menyelenggarakan **Rapat Koordinasi Triwulan IV** sebagai forum evaluasi dan perencanaan antar kabupaten/kota se-D.I. Yogyakarta.

### Agenda Utama
1. Laporan Realisasi Program Kerja 2025 per Divisi
2. Evaluasi Kolaborasi Antar-Forum Kab/Kota
3. Review Anggaran & Keuangan
4. Perencanaan Program Kerja 2026 (awal)
5. Pembahasan Kalender Kegiatan Bersama

### Peserta
- Ketua & Sekretaris Forum Genre dari 5 Kab/Kota
- BPH Forum Genre DIY (semua divisi)
- Perwakilan BKKBN DIY sebagai pembina

### Keputusan Penting
✅ Penetapan 3 program unggulan kolaborasi 2026  
✅ Pembentukan tim kerja lintas kabupaten  
✅ Jadwal konsolidasi PIK-R semester I 2026`,
    tanggal: '2025-11-02',
    lokasi: 'Aula BKKBN DIY, Jl. Kenari No. 58',
    kategori: 'Rapat',
    divisi: 'BPH',
    gambarUtama: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
    galeri: [],
    tags: ['rakor', 'koordinasi', 'BPH', 'evaluasi', 'perencanaan'],
    penulis: 'Divisi BPH',
    diterbitkan: true,
    dibuatPada: '2025-11-03T08:00:00.000Z',
    diperbarui: '2025-11-03T08:00:00.000Z',
    jumlahViews: 134,
  },
];

// ── Store Operations ──────────────────────────────────────────────────────────

function getAllRaw(): Kegiatan[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First time — seed the data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
      return SEED_DATA;
    }
    return JSON.parse(raw) as Kegiatan[];
  } catch {
    return SEED_DATA;
  }
}

function save(data: Kegiatan[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** Auto-publish any scheduled posts whose jadwalTerbit time has passed */
function autoPublishScheduled(): void {
  const all = getAllRaw();
  const now = new Date();
  let changed = false;
  all.forEach((k) => {
    if (!k.diterbitkan && k.jadwalTerbit) {
      const scheduledAt = new Date(k.jadwalTerbit);
      if (scheduledAt <= now) {
        k.diterbitkan = true;
        k.jadwalTerbit = null;
        k.diperbarui = now.toISOString();
        changed = true;
      }
    }
  });
  if (changed) save(all);
}

function getAllLocal(): Kegiatan[] {
  autoPublishScheduled();
  return getAllRaw();
}

function getPublishedLocal(): Kegiatan[] {
  autoPublishScheduled();
  return getAllRaw()
    .filter((k) => k.diterbitkan)
    .sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
}

function getByIdLocal(id: string): Kegiatan | undefined {
  return getAllLocal().find((k) => k.id === id);
}

function createLocal(data: Omit<Kegiatan, 'id' | 'dibuatPada' | 'diperbarui' | 'jumlahViews'>): Kegiatan {
  const all = getAllLocal();
  const now = new Date().toISOString();
  const newItem: Kegiatan = {
    ...data,
    id: `keg-${Date.now()}`,
    jadwalTerbit: data.jadwalTerbit ?? null,
    dibuatPada: now,
    diperbarui: now,
    jumlahViews: 0,
  };
  save([...all, newItem]);
  return newItem;
}

function updateLocal(id: string, data: Partial<Kegiatan>): Kegiatan | null {
  const all = getAllLocal();
  const idx = all.findIndex((k) => k.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...data, diperbarui: new Date().toISOString() };
  save(all);
  return all[idx];
}

function removeLocal(id: string): boolean {
  const all = getAllLocal();
  const filtered = all.filter((k) => k.id !== id);
  if (filtered.length === all.length) return false;
  save(filtered);
  return true;
}

function incrementViewsLocal(id: string): void {
  const all = getAllLocal();
  const item = all.find((k) => k.id === id);
  if (item) {
    item.jumlahViews = (item.jumlahViews || 0) + 1;
    save(all);
  }
}

// ── Admin Auth ────────────────────────────────────────────────────────────────
const LOCAL_ADMIN_PASSWORD = import.meta.env.VITE_LOCAL_ADMIN_PASSWORD || '';

function loginLocal(password: string): boolean {
  if (!LOCAL_ADMIN_PASSWORD) {
    throw new Error('Portal Admin lokal belum dikonfigurasi. Atur VITE_LOCAL_ADMIN_PASSWORD di .env.development.local.');
  }
  if (password === LOCAL_ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_KEY, 'true');
    return true;
  }
  return false;
}

function logoutLocal(): void {
  localStorage.removeItem(ADMIN_KEY);
}

function isLoggedInLocal(): boolean {
  return localStorage.getItem(ADMIN_KEY) === 'true';
}

function getFeaturedNewsIdLocal(): string | null {
  return localStorage.getItem(FEATURED_NEWS_KEY);
}

function setFeaturedNewsIdLocal(id: string | null): void {
  if (id) {
    localStorage.setItem(FEATURED_NEWS_KEY, id);
  } else {
    localStorage.removeItem(FEATURED_NEWS_KEY);
  }
}

function getQuickLinksLocal(): TautanCepat[] {
  const raw = localStorage.getItem(QUICK_LINKS_KEY);
  return raw ? JSON.parse(raw) as TautanCepat[] : [];
}

function saveQuickLinksLocal(links: TautanCepat[]): void {
  localStorage.setItem(QUICK_LINKS_KEY, JSON.stringify(links));
}

function createQuickLinkLocal(data: Omit<TautanCepat, 'id' | 'urutan'>): TautanCepat {
  const links = getQuickLinksLocal();
  const link = { ...data, id: `link-${Date.now()}`, urutan: links.length };
  saveQuickLinksLocal([...links, link]);
  return link;
}

function updateQuickLinkLocal(id: string, data: Pick<TautanCepat, 'label' | 'url'>): TautanCepat | null {
  const links = getQuickLinksLocal();
  const index = links.findIndex((link) => link.id === id);
  if (index < 0) return null;
  links[index] = { ...links[index], ...data };
  saveQuickLinksLocal(links);
  return links[index];
}

function removeQuickLinkLocal(id: string): boolean {
  const links = getQuickLinksLocal();
  const remaining = links.filter((link) => link.id !== id);
  if (remaining.length === links.length) return false;
  saveQuickLinksLocal(remaining.map((link, urutan) => ({ ...link, urutan })));
  return true;
}

function notifyQuickLinksChanged(): void {
  window.dispatchEvent(new Event(QUICK_LINKS_CHANGED_EVENT));
}

export const kegiatanStore = {
  async getAll(): Promise<Kegiatan[]> {
    return USE_REMOTE_API ? apiFetch('/admin/kegiatan') : getAllLocal();
  },
  async getPublished(): Promise<Kegiatan[]> {
    return USE_REMOTE_API ? apiFetch('/kegiatan') : getPublishedLocal();
  },
  async getById(id: string): Promise<Kegiatan | undefined> {
    return USE_REMOTE_API ? apiFetch(`/kegiatan/${encodeURIComponent(id)}`) : getByIdLocal(id);
  },
  async create(data: Omit<Kegiatan, 'id' | 'dibuatPada' | 'diperbarui' | 'jumlahViews'>): Promise<Kegiatan> {
    return USE_REMOTE_API
      ? apiFetch('/admin/kegiatan', { method: 'POST', body: JSON.stringify(data) })
      : createLocal(data);
  },
  async update(id: string, data: Partial<Kegiatan>): Promise<Kegiatan | null> {
    return USE_REMOTE_API
      ? apiFetch(`/admin/kegiatan/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(data) })
      : updateLocal(id, data);
  },
  async remove(id: string): Promise<boolean> {
    if (!USE_REMOTE_API) return removeLocal(id);
    await apiFetch(`/admin/kegiatan/${encodeURIComponent(id)}`, { method: 'DELETE' });
    return true;
  },
  async incrementViews(id: string): Promise<void> {
    if (USE_REMOTE_API) {
      await apiFetch(`/kegiatan/${encodeURIComponent(id)}/views`, { method: 'POST' });
      return;
    }
    incrementViewsLocal(id);
  },
  async login(password: string): Promise<boolean> {
    if (!USE_REMOTE_API) return loginLocal(password);
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
      credentials: 'same-origin',
    });
    if (response.status === 401) return false;
    const result = await response.json().catch(() => null) as { error?: string } | null;
    if (!response.ok) throw new Error(result?.error || `Login gagal (${response.status}).`);
    return true;
  },
  async logout(): Promise<void> {
    if (USE_REMOTE_API) {
      await apiFetch('/auth/logout', { method: 'POST' });
      return;
    }
    logoutLocal();
  },
  async isLoggedIn(): Promise<boolean> {
    return USE_REMOTE_API ? apiFetch('/auth/session') : isLoggedInLocal();
  },
  async getFeaturedNewsId(): Promise<string | null> {
    if (!USE_REMOTE_API) return getFeaturedNewsIdLocal();
    const featured = await apiFetch<Kegiatan | null>('/featured');
    return featured?.id || null;
  },
  async getFeaturedNews(): Promise<Kegiatan | null> {
    if (USE_REMOTE_API) return apiFetch('/featured');
    const id = getFeaturedNewsIdLocal();
    return id ? getPublishedLocal().find((item) => item.id === id) || null : null;
  },
  async setFeaturedNewsId(id: string | null): Promise<void> {
    if (USE_REMOTE_API) {
      await apiFetch('/admin/featured', { method: 'PUT', body: JSON.stringify({ id }) });
      return;
    }
    setFeaturedNewsIdLocal(id);
  },
  async getQuickLinks(): Promise<TautanCepat[]> {
    if (USE_REMOTE_API) return apiFetch('/quick-links');
    return getQuickLinksLocal().sort((a, b) => a.urutan - b.urutan);
  },
  async createQuickLink(data: Omit<TautanCepat, 'id' | 'urutan'>): Promise<TautanCepat> {
    const link = USE_REMOTE_API
      ? await apiFetch<TautanCepat>('/admin/quick-links', { method: 'POST', body: JSON.stringify(data) })
      : createQuickLinkLocal(data);
    notifyQuickLinksChanged();
    return link;
  },
  async updateQuickLink(id: string, data: Pick<TautanCepat, 'label' | 'url'>): Promise<TautanCepat | null> {
    const link = USE_REMOTE_API
      ? await apiFetch<TautanCepat>(`/admin/quick-links/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(data) })
      : updateQuickLinkLocal(id, data);
    notifyQuickLinksChanged();
    return link;
  },
  async removeQuickLink(id: string): Promise<boolean> {
    let removed: boolean;
    if (USE_REMOTE_API) {
      await apiFetch(`/admin/quick-links/${encodeURIComponent(id)}`, { method: 'DELETE' });
      removed = true;
    } else {
      removed = removeQuickLinkLocal(id);
    }
    if (removed) notifyQuickLinksChanged();
    return removed;
  },
};
