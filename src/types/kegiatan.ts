// ─── Kegiatan (Activity News) Type Definitions ───────────────────────────────

export type KategoriKegiatan =
  | 'Seminar'
  | 'Workshop'
  | 'Lomba'
  | 'Sosial'
  | 'Rapat'
  | 'Pelatihan'
  | 'Kunjungan'
  | 'Kampanye'
  | 'Lainnya';

export interface TautanKegiatan {
  label: string;
  url: string;
}

export interface TautanCepat {
  id: string;
  label: string;
  url: string;
  urutan: number;
}

export interface Kegiatan {
  id: string;
  judul: string;
  slug: string;
  ringkasan: string;         // Short summary (shown in card)
  konten: string;            // Full HTML-like markdown content
  tanggal: string;           // ISO date string
  lokasi: string;
  kategori: KategoriKegiatan;
  divisi: string;
  gambarUtama: string;       // URL or base64 for the cover image
  galeri: string[];          // Additional image URLs
  tautan?: TautanKegiatan[];
  tags: string[];
  penulis: string;
  diterbitkan: boolean;
  jadwalTerbit?: string | null; // ISO datetime — if set, auto-publish at this time
  dibuatPada: string;        // ISO timestamp
  diperbarui: string;        // ISO timestamp
  jumlahViews: number;
}

export const KATEGORI_COLORS: Record<KategoriKegiatan, { bg: string; text: string; border: string }> = {
  Seminar:   { bg: 'bg-blue-100',   text: 'text-blue-800',   border: 'border-blue-200' },
  Workshop:  { bg: 'bg-violet-100', text: 'text-violet-800', border: 'border-violet-200' },
  Lomba:     { bg: 'bg-amber-100',  text: 'text-amber-800',  border: 'border-amber-200' },
  Sosial:    { bg: 'bg-emerald-100',text: 'text-emerald-800',border: 'border-emerald-200' },
  Rapat:     { bg: 'bg-slate-100',  text: 'text-slate-700',  border: 'border-slate-200' },
  Pelatihan: { bg: 'bg-sky-100',    text: 'text-sky-800',    border: 'border-sky-200' },
  Kunjungan: { bg: 'bg-teal-100',   text: 'text-teal-800',   border: 'border-teal-200' },
  Kampanye:  { bg: 'bg-pink-100',   text: 'text-pink-800',   border: 'border-pink-200' },
  Lainnya:   { bg: 'bg-gray-100',   text: 'text-gray-700',   border: 'border-gray-200' },
};

export const DIVISI_LIST = [
  'BPH',
  'EKRAF',
  'P4M',
  'PSDM',
  'HUMAS',
  'MEDKOM',
  'Semua Divisi',
];
