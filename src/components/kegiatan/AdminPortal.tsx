import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Lock, Unlock, KeyRound, ShieldCheck, CheckCircle2,
  LogOut, Plus, Edit2, Trash2, Eye, EyeOff,
  Save, X, Upload, AlertCircle, CheckCircle, Newspaper,
  Search, Image, Calendar, MapPin, Tag, User, FileText,
  Hash, Clock, Send, Play, ArrowRight, Sparkles, Fingerprint, Link2, Megaphone
} from 'lucide-react';
import type { Kegiatan, KategoriKegiatan } from '../../types/kegiatan';
import { KATEGORI_COLORS, DIVISI_LIST } from '../../types/kegiatan';
import { kegiatanStore } from '../../utils/kegiatanStore';
import { QuickLinksAdminPanel } from './QuickLinksAdminPanel';

// ── Toast ─────────────────────────────────────────────────────────────────────
interface ToastProps { message: string; type: 'success' | 'error'; }
const Toast: React.FC<ToastProps> = ({ message, type }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10 }}
    className={`fixed bottom-6 right-6 z-[500] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold ${
      type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
    }`}
  >
    {type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
    {message}
  </motion.div>
);

// ── Empty form ────────────────────────────────────────────────────────────────
const EMPTY_FORM: Omit<Kegiatan, 'id' | 'dibuatPada' | 'diperbarui' | 'jumlahViews'> = {
  judul: '',
  slug: '',
  ringkasan: '',
  konten: '',
  tanggal: new Date().toISOString().split('T')[0],
  lokasi: '',
  kategori: 'Seminar',
  divisi: 'BPH',
  gambarUtama: '',
  galeri: [],
  tautan: [],
  tags: [],
  penulis: '',
  diterbitkan: true,
  jadwalTerbit: null,
};

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ── Form Component ────────────────────────────────────────────────────────────
interface FormProps {
  initial?: Partial<Kegiatan>;
  onSave: (data: Omit<Kegiatan, 'id' | 'dibuatPada' | 'diperbarui' | 'jumlahViews'>) => void | Promise<void>;
  onCancel: () => void;
}

const KegiatanForm: React.FC<FormProps> = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState({ ...EMPTY_FORM, ...initial });
  const [linkError, setLinkError] = useState('');
  const [tagsInput, setTagsInput] = useState((initial?.tags || []).join(', '));
  const [galeriInput, setGaleriInput] = useState((initial?.galeri || []).join('\n'));
  const [previewImg, setPreviewImg] = useState(initial?.gambarUtama || '');
  const fileRef = useRef<HTMLInputElement>(null);

  // Determine initial publish mode:
  const getInitialMode = (): 'immediate' | 'schedule' | 'draft' => {
    if (initial?.diterbitkan) return 'immediate';
    if (initial?.jadwalTerbit) return 'schedule';
    return initial?.id ? 'draft' : 'immediate';
  };

  const [publishMode, setPublishMode] = useState<'immediate' | 'schedule' | 'draft'>(getInitialMode);

  // Default schedule datetime format: YYYY-MM-DDTHH:mm
  const getDefaultScheduleTime = () => {
    if (initial?.jadwalTerbit) {
      const d = new Date(initial.jadwalTerbit);
      return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    }
    const d = new Date();
    d.setHours(d.getHours() + 2);
    d.setMinutes(0);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  };

  const [scheduledDateTime, setScheduledDateTime] = useState<string>(getDefaultScheduleTime);

  const setPresetSchedule = (type: 'tonight' | 'tomorrow_morning' | 'tomorrow_evening' | 'three_days') => {
    const d = new Date();
    if (type === 'tonight') {
      d.setHours(19, 0, 0, 0);
      if (d.getTime() <= Date.now()) d.setDate(d.getDate() + 1);
    } else if (type === 'tomorrow_morning') {
      d.setDate(d.getDate() + 1);
      d.setHours(8, 0, 0, 0);
    } else if (type === 'tomorrow_evening') {
      d.setDate(d.getDate() + 1);
      d.setHours(19, 0, 0, 0);
    } else if (type === 'three_days') {
      d.setDate(d.getDate() + 3);
      d.setHours(9, 0, 0, 0);
    }
    setScheduledDateTime(new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16));
  };

  const set = (key: keyof typeof form, val: any) =>
    setForm(p => ({ ...p, [key]: val }));

  const handleJudulChange = (val: string) => {
    set('judul', val);
    if (!initial?.id) set('slug', toSlug(val));
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      set('gambarUtama', result);
      setPreviewImg(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const galeri = galeriInput.split('\n').map(g => g.trim()).filter(Boolean);
    const tautan = (form.tautan || []).map((link) => ({
      label: link.label.trim(),
      url: link.url.trim(),
    }));

    if (tautan.some((link) => {
      try {
        const url = new URL(link.url);
        return !link.label || !['http:', 'https:'].includes(url.protocol);
      } catch {
        return true;
      }
    })) {
      setLinkError('Periksa tautan: isi teks tombol dan gunakan URL http:// atau https:// yang valid.');
      return;
    }
    setLinkError('');

    let diterbitkan = false;
    let jadwalTerbit: string | null = null;

    if (publishMode === 'immediate') {
      diterbitkan = true;
      jadwalTerbit = null;
    } else if (publishMode === 'schedule') {
      diterbitkan = false;
      jadwalTerbit = scheduledDateTime ? new Date(scheduledDateTime).toISOString() : new Date(Date.now() + 3600000).toISOString();
    } else {
      diterbitkan = false;
      jadwalTerbit = null;
    }

    await onSave({
      ...form,
      tags,
      galeri,
      tautan,
      diterbitkan,
      jadwalTerbit,
    });
  };

  const KATEGORI_LIST: KategoriKegiatan[] = [
    'Seminar', 'Workshop', 'Lomba', 'Sosial', 'Rapat', 'Pelatihan', 'Kunjungan', 'Kampanye', 'Lainnya'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6"
    >
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onCancel} />
      <div className="relative w-full max-w-3xl max-h-[94vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-[#008dd3]/5 to-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#008dd3]/10">
              <Newspaper className="w-5 h-5 text-[#008dd3]" />
            </div>
            <div>
              <h3 className="font-black text-slate-900">{initial?.id ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}</h3>
              <p className="text-xs text-slate-400">Isi data kegiatan & atur jadwal penayangan</p>
            </div>
          </div>
          <button onClick={onCancel} className="p-2 rounded-xl hover:bg-slate-100 transition-all">
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Form body */}
        <form id="kegiatan-form" onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-5">
          {/* Judul */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              <FileText className="w-3.5 h-3.5 inline mr-1 text-[#008dd3]" /> Judul Kegiatan *
            </label>
            <input
              required
              value={form.judul}
              onChange={e => handleJudulChange(e.target.value)}
              placeholder="Contoh: Workshop Konten Kreatif 2025"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008dd3]/30 focus:border-[#008dd3] transition-all"
            />
            {form.slug && (
              <p className="text-[10px] text-slate-400 mt-1">Slug: <code className="text-[#008dd3]">{form.slug}</code></p>
            )}
          </div>

          {/* Ringkasan */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              <Hash className="w-3.5 h-3.5 inline mr-1 text-amber-500" /> Ringkasan (ditampilkan di kartu) *
            </label>
            <textarea
              required
              rows={2}
              value={form.ringkasan}
              onChange={e => set('ringkasan', e.target.value)}
              placeholder="Deskripsi singkat kegiatan (1-2 kalimat)..."
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008dd3]/30 focus:border-[#008dd3] transition-all resize-none"
            />
          </div>

          {/* Row: Tanggal, Lokasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                <Calendar className="w-3.5 h-3.5 inline mr-1 text-[#008dd3]" /> Tanggal Kegiatan *
              </label>
              <input
                required
                type="date"
                value={form.tanggal}
                onChange={e => set('tanggal', e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008dd3]/30 focus:border-[#008dd3] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                <MapPin className="w-3.5 h-3.5 inline mr-1 text-amber-500" /> Lokasi *
              </label>
              <input
                required
                value={form.lokasi}
                onChange={e => set('lokasi', e.target.value)}
                placeholder="Nama tempat / kota"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008dd3]/30 focus:border-[#008dd3] transition-all"
              />
            </div>
          </div>

          {/* Row: Kategori, Divisi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                <Tag className="w-3.5 h-3.5 inline mr-1 text-purple-500" /> Kategori *
              </label>
              <select
                value={form.kategori}
                onChange={e => set('kategori', e.target.value as KategoriKegiatan)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008dd3]/30 focus:border-[#008dd3] transition-all appearance-none"
              >
                {KATEGORI_LIST.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                <User className="w-3.5 h-3.5 inline mr-1 text-emerald-500" /> Divisi *
              </label>
              <select
                value={form.divisi}
                onChange={e => set('divisi', e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008dd3]/30 focus:border-[#008dd3] transition-all appearance-none"
              >
                {DIVISI_LIST.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Row: Penulis, Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                <User className="w-3.5 h-3.5 inline mr-1 text-slate-400" /> Penulis / Sumber
              </label>
              <input
                value={form.penulis}
                onChange={e => set('penulis', e.target.value)}
                placeholder="Divisi HUMAS / Nama penulis"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008dd3]/30 focus:border-[#008dd3] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                <Hash className="w-3.5 h-3.5 inline mr-1 text-pink-400" /> Tags (pisah dengan koma)
              </label>
              <input
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                placeholder="workshop, digital, remaja"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008dd3]/30 focus:border-[#008dd3] transition-all"
              />
            </div>
          </div>

          {/* Gambar Utama */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              <Image className="w-3.5 h-3.5 inline mr-1 text-[#008dd3]" /> Gambar Utama
            </label>
            <div className="flex gap-2">
              <input
                value={form.gambarUtama.startsWith('data:') ? '' : form.gambarUtama}
                onChange={e => { set('gambarUtama', e.target.value); setPreviewImg(e.target.value); }}
                placeholder="URL gambar (https://...) atau upload file"
                className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008dd3]/30 focus:border-[#008dd3] transition-all"
              />
              <button type="button" onClick={() => fileRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#008dd3]/10 border border-[#008dd3]/30 text-[#008dd3] text-xs font-bold hover:bg-[#008dd3]/20 transition-all">
                <Upload className="w-3.5 h-3.5" /> Upload
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
            </div>
            {previewImg && (
              <div className="mt-2 relative w-full h-32 rounded-xl overflow-hidden border border-slate-200">
                <img src={previewImg} alt="Preview" className="w-full h-full object-cover" />
                <button type="button" onClick={() => { set('gambarUtama', ''); setPreviewImg(''); }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Galeri */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              <Image className="w-3.5 h-3.5 inline mr-1 text-slate-400" /> Galeri Tambahan (1 URL per baris)
            </label>
            <textarea
              rows={2}
              value={galeriInput}
              onChange={e => setGaleriInput(e.target.value)}
              placeholder="https://url-gambar-1.jpg&#10;https://url-gambar-2.jpg"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008dd3]/30 focus:border-[#008dd3] transition-all resize-none font-mono"
            />
          </div>

          {/* Tautan CTA */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  <Link2 className="w-3.5 h-3.5 inline mr-1 text-[#008dd3]" /> Tombol Tautan
                </label>
                <p className="text-[11px] text-slate-400 mt-1">
                  Tampil di detail berita, misalnya untuk formulir pendaftaran atau informasi lanjut.
                </p>
              </div>
              <button
                type="button"
                onClick={() => set('tautan', [...(form.tautan || []), { label: '', url: '' }])}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#008dd3]/10 text-[#008dd3] text-xs font-bold hover:bg-[#008dd3]/20 transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah Tautan
              </button>
            </div>
            {(form.tautan || []).map((link, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_auto] gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50">
                <input
                  required
                  value={link.label}
                  onChange={e => set('tautan', (form.tautan || []).map((item, i) => i === index ? { ...item, label: e.target.value } : item))}
                  placeholder="Teks tombol, mis. Daftar Sekarang"
                  aria-label={`Teks tombol tautan ${index + 1}`}
                  className="w-full min-w-0 px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008dd3]/30"
                />
                <input
                  required
                  type="url"
                  value={link.url}
                  onChange={e => set('tautan', (form.tautan || []).map((item, i) => i === index ? { ...item, url: e.target.value } : item))}
                  placeholder="https://..."
                  aria-label={`URL tautan ${index + 1}`}
                  className="w-full min-w-0 px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008dd3]/30"
                />
                <button
                  type="button"
                  onClick={() => set('tautan', (form.tautan || []).filter((_, i) => i !== index))}
                  aria-label={`Hapus tautan ${index + 1}`}
                  className="flex items-center justify-center p-2 rounded-lg text-rose-500 hover:bg-rose-50 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {(form.tautan || []).length > 0 && (
              <p className="text-[11px] text-slate-400">Gunakan alamat yang diawali http:// atau https://.</p>
            )}
            {linkError && (
              <p role="alert" className="text-xs font-semibold text-rose-600">{linkError}</p>
            )}
          </div>

          {/* Konten */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              <FileText className="w-3.5 h-3.5 inline mr-1 text-slate-500" /> Konten Lengkap *
              <span className="ml-1 text-slate-400 font-normal">(mendukung Markdown: **bold**, *italic*, ## heading, - list)</span>
            </label>
            <textarea
              required
              rows={8}
              value={form.konten}
              onChange={e => set('konten', e.target.value)}
              placeholder="## Judul Kegiatan&#10;&#10;Tulis deskripsi lengkap kegiatan di sini...&#10;&#10;### Sub-judul&#10;- Poin 1&#10;- Poin 2"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008dd3]/30 focus:border-[#008dd3] transition-all resize-y font-mono"
            />
          </div>

          {/* ─── Mode Penerbitan (Publish Now vs Jadwalkan vs Draf) ─── */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/50 border border-slate-200 space-y-4">
            <div>
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                Pengaturan Penayangan (Status & Jadwal UP)
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                Pilih apakah postingan ingin langsung tayang sekarang, dijadwalkan otomatis, atau disimpan sebagai draf.
              </p>
            </div>

            {/* 3 Option Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Option 1: Langsung UP */}
              <button
                type="button"
                onClick={() => setPublishMode('immediate')}
                className={`flex flex-col p-3 rounded-xl border text-left transition-all ${
                  publishMode === 'immediate'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300/60'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Send className="w-3.5 h-3.5" />
                  <span>UP Langsung</span>
                </div>
                <span className={`text-[11px] mt-1 ${publishMode === 'immediate' ? 'text-emerald-100' : 'text-slate-500'}`}>
                  Langsung live & tampil sekarang
                </span>
              </button>

              {/* Option 2: Jadwalkan UP */}
              <button
                type="button"
                onClick={() => setPublishMode('schedule')}
                className={`flex flex-col p-3 rounded-xl border text-left transition-all ${
                  publishMode === 'schedule'
                    ? 'bg-[#008dd3] text-white border-[#008dd3] shadow-md ring-2 ring-sky-300/60'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Jadwalkan UP</span>
                </div>
                <span className={`text-[11px] mt-1 ${publishMode === 'schedule' ? 'text-sky-100' : 'text-slate-500'}`}>
                  Atur tanggal & jam otomatis
                </span>
              </button>

              {/* Option 3: Draf */}
              <button
                type="button"
                onClick={() => setPublishMode('draft')}
                className={`flex flex-col p-3 rounded-xl border text-left transition-all ${
                  publishMode === 'draft'
                    ? 'bg-amber-500 text-white border-amber-500 shadow-md ring-2 ring-amber-300/60'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Simpan Draf</span>
                </div>
                <span className={`text-[11px] mt-1 ${publishMode === 'draft' ? 'text-amber-100' : 'text-slate-500'}`}>
                  Hanya admin yang bisa lihat
                </span>
              </button>
            </div>

            {/* Scheduled Detail Inputs */}
            {publishMode === 'schedule' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-3.5 rounded-xl bg-white border border-[#008dd3]/30 shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#008dd3]" />
                    Pilih Waktu Tayang Otomatis (WIB):
                  </label>
                  <input
                    type="datetime-local"
                    required={publishMode === 'schedule'}
                    value={scheduledDateTime}
                    onChange={(e) => setScheduledDateTime(e.target.value)}
                    className="px-3 py-1.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008dd3]/40"
                  />
                </div>

                {/* Quick Presets */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Pilihan Cepat Waktu:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPresetSchedule('tonight')}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-sky-50 text-[#008dd3] hover:bg-sky-100 transition-colors"
                    >
                      🌙 Nanti Malam (19:00)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPresetSchedule('tomorrow_morning')}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-sky-50 text-[#008dd3] hover:bg-sky-100 transition-colors"
                    >
                      🌅 Besok Pagi (08:00)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPresetSchedule('tomorrow_evening')}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-sky-50 text-[#008dd3] hover:bg-sky-100 transition-colors"
                    >
                      🌆 Besok Malam (19:00)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPresetSchedule('three_days')}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-sky-50 text-[#008dd3] hover:bg-sky-100 transition-colors"
                    >
                      🗓️ 3 Hari Lagi
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 italic">
                  💡 Ketika jam tersebut tiba, sistem secara otomatis akan menerbitkan postingan ini ke beranda.
                </p>
              </motion.div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="shrink-0 px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-white">
          <button type="button" onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            Batal
          </button>
          <button
            type="submit"
            form="kegiatan-form"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#008dd3] text-white text-sm font-bold hover:bg-[#0079b8] transition-all shadow-md hover:shadow-lg"
          >
            <Save className="w-4 h-4" />
            {initial?.id ? 'Simpan Perubahan' : 'Simpan Kegiatan'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ── Main Admin Portal ─────────────────────────────────────────────────────────
interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSuccessUnlock, setIsSuccessUnlock] = useState(false);
  const [kegiatan, setKegiatan] = useState<Kegiatan[]>([]);
  const [featuredNewsId, setFeaturedNewsId] = useState<string | null>(null);
  const [featuredNewsSelection, setFeaturedNewsSelection] = useState('');
  const [searchQ, setSearchQ] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'scheduled' | 'draft'>('all');
  const [editing, setEditing] = useState<Kegiatan | null>(null);
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const refresh = useCallback(async () => {
    const allKegiatan = await kegiatanStore.getAll();
    const featuredId = await kegiatanStore.getFeaturedNewsId();
    const validFeaturedId = featuredId && allKegiatan.some((item) => item.id === featuredId && item.diterbitkan)
      ? featuredId
      : null;
    if (featuredId && !validFeaturedId) await kegiatanStore.setFeaturedNewsId(null);
    setKegiatan(allKegiatan);
    setFeaturedNewsId(validFeaturedId);
    setFeaturedNewsSelection(validFeaturedId || '');
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    document.body.style.overflow = 'hidden';
    const loadPortal = async () => {
      try {
        const authenticated = await kegiatanStore.isLoggedIn();
        if (!active) return;
        setLoggedIn(authenticated);
        if (authenticated) await refresh();
      } catch (reason) {
        console.error('Gagal memuat Portal Admin:', reason);
        if (active) showToast('Portal Admin gagal memuat data.', 'error');
      }
    };
    void loadPortal();
    return () => {
      active = false;
      document.body.style.overflow = '';
    };
  }, [isOpen, refresh, showToast]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setLoginError('Silakan masukkan kata sandi pengurus.');
      return;
    }

    setIsAuthenticating(true);
    setLoginError('');

    // Smooth authentication delay with visual unlocking feedback
    setTimeout(async () => {
      try {
        if (await kegiatanStore.login(password)) {
        setIsSuccessUnlock(true);
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.55 },
            colors: ['#008dd3', '#f59e0b', '#10b981'],
          });
        } catch {}

        setTimeout(async () => {
          setLoggedIn(true);
          setIsAuthenticating(false);
          setIsSuccessUnlock(false);
          setLoginError('');
          try {
            await refresh();
          } catch (reason) {
            console.error('Gagal memuat data Portal Admin:', reason);
            showToast('Login berhasil, tetapi data gagal dimuat.', 'error');
          }
        }, 650);
        } else {
          setIsAuthenticating(false);
          setLoginError('Kata sandi salah. Pastikan huruf besar/kecil sesuai.');
        }
      } catch (reason) {
        setIsAuthenticating(false);
        setLoginError(reason instanceof Error ? reason.message : 'Login gagal karena masalah koneksi.');
      }
    }, 450);
  };

  const handleLogout = async () => {
    try {
      await kegiatanStore.logout();
      setLoggedIn(false);
      setPassword('');
    } catch (reason) {
      showToast(reason instanceof Error ? reason.message : 'Logout gagal.', 'error');
    }
  };

  const handleSave = async (data: Omit<Kegiatan, 'id' | 'dibuatPada' | 'diperbarui' | 'jumlahViews'>) => {
    try {
      if (editing) {
        await kegiatanStore.update(editing.id, data);
        showToast('Kegiatan berhasil diperbarui ✓');
      } else {
        await kegiatanStore.create(data);
        showToast('Kegiatan baru berhasil disimpan ✓');
      }
      setEditing(null);
      setAdding(false);
      await refresh();
    } catch (reason) {
      showToast(reason instanceof Error ? reason.message : 'Kegiatan gagal disimpan.', 'error');
    }
  };

  const handleSetFeaturedNews = async () => {
    if (!featuredNewsSelection) return;
    const selectedNews = kegiatan.find((item) => item.id === featuredNewsSelection && item.diterbitkan);
    if (!selectedNews) {
      showToast('Pilih berita yang sudah tayang.', 'error');
      return;
    }
    try {
      await kegiatanStore.setFeaturedNewsId(selectedNews.id);
      setFeaturedNewsId(selectedNews.id);
      showToast('Sorotan berita berhasil diperbarui ✓');
    } catch (reason) {
      showToast(reason instanceof Error ? reason.message : 'Sorotan gagal disimpan.', 'error');
    }
  };

  const handleClearFeaturedNews = async () => {
    try {
      await kegiatanStore.setFeaturedNewsId(null);
      setFeaturedNewsId(null);
      setFeaturedNewsSelection('');
      showToast('Sorotan berita dinonaktifkan.');
    } catch (reason) {
      showToast(reason instanceof Error ? reason.message : 'Sorotan gagal dinonaktifkan.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await kegiatanStore.remove(id);
      setConfirmDelete(null);
      showToast('Kegiatan telah dihapus.');
      await refresh();
    } catch (reason) {
      showToast(reason instanceof Error ? reason.message : 'Kegiatan gagal dihapus.', 'error');
    }
  };

  const handlePublishNow = async (item: Kegiatan) => {
    try {
      await kegiatanStore.update(item.id, { diterbitkan: true, jadwalTerbit: null });
      showToast('Kegiatan langsung live di website! ✓');
      await refresh();
    } catch (reason) {
      showToast(reason instanceof Error ? reason.message : 'Kegiatan gagal diterbitkan.', 'error');
    }
  };

  const handleTogglePublish = async (item: Kegiatan) => {
    try {
      await kegiatanStore.update(item.id, { diterbitkan: !item.diterbitkan, jadwalTerbit: null });
      showToast(item.diterbitkan ? 'Kegiatan ditarik ke draf' : 'Kegiatan diterbitkan (Live) ✓');
      await refresh();
    } catch (reason) {
      showToast(reason instanceof Error ? reason.message : 'Status kegiatan gagal diperbarui.', 'error');
    }
  };

  // Filter based on tab and search
  const filtered = kegiatan.filter(k => {
    const matchSearch =
      k.judul.toLowerCase().includes(searchQ.toLowerCase()) ||
      k.kategori.toLowerCase().includes(searchQ.toLowerCase());

    if (!matchSearch) return false;

    if (activeTab === 'live') return k.diterbitkan;
    if (activeTab === 'scheduled') return !k.diterbitkan && !!k.jadwalTerbit;
    if (activeTab === 'draft') return !k.diterbitkan && !k.jadwalTerbit;
    return true;
  });

  const liveCount = kegiatan.filter(k => k.diterbitkan).length;
  const scheduledCount = kegiatan.filter(k => !k.diterbitkan && !!k.jadwalTerbit).length;
  const draftCount = kegiatan.filter(k => !k.diterbitkan && !k.jadwalTerbit).length;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[400] flex items-stretch sm:items-center justify-center p-0 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Panel Container */}
        <motion.div
          className="relative w-full sm:max-w-5xl h-full sm:h-auto sm:max-h-[92vh] bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        >
          {/* Admin Header */}
          <div className="flex items-center justify-between px-5 sm:px-8 py-4 bg-gradient-to-r from-[#008dd3] via-[#0079b8] to-[#0068a0] text-white shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/15 backdrop-blur-sm shadow-inner">
                <Lock className="w-5 h-5 text-sky-100" />
              </div>
              <div>
                <h2 className="font-black text-base sm:text-lg tracking-tight">Portal Admin Kegiatan</h2>
                <p className="text-[11px] sm:text-xs text-white/80 font-medium">Forum Genre D.I. Yogyakarta</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {loggedIn && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              )}
              <button
                onClick={onClose}
                aria-label="Tutup Portal"
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25 transition-all text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── LOGIN SCREEN DENGAN ANIMASI INTERAKTIF & TANPA MENAMPILKAN SANDI ── */}
          {!loggedIn ? (
            <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-y-auto bg-gradient-to-b from-[#F0F9FF] via-white to-[#F8FAFC]">
              
              {/* Ambient Glowing Orbs Background */}
              <div className="absolute -top-16 -left-16 w-60 h-60 bg-[#008dd3]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-amber-400/15 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }} />

              {/* Decorative Rotating Geometric Lines */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-[#008dd3]/10 pointer-events-none"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full border border-dashed border-amber-300/15 pointer-events-none"
              />

              {/* Centered Interactive Card with Physical Shake on Error */}
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  x: loginError ? [-12, 12, -8, 8, -4, 4, 0] : 0,
                }}
                transition={{ duration: 0.35 }}
                className="relative z-10 w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-2xl rounded-3xl border border-sky-100 shadow-xl p-6 sm:p-8 my-auto"
              >
                {/* Security Pill Tag */}
                <div className="flex justify-center mb-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/90 text-[11px] font-bold text-slate-700 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Autentikasi Internal Pengurus</span>
                  </div>
                </div>

                {/* Animated Central Emblem with Rotating Halo */}
                <div className="relative w-20 h-20 mx-auto mb-5 flex items-center justify-center">
                  {/* Outer spinning gradient ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#008dd3] via-sky-300 to-amber-400 p-[2px] opacity-80"
                  >
                    <div className="w-full h-full rounded-2xl bg-white" />
                  </motion.div>

                  {/* Inner glowing badge */}
                  <motion.div
                    animate={{
                      scale: isSuccessUnlock ? [1, 1.15, 1] : [1, 1.05, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className={`relative z-10 w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transition-colors duration-300 ${
                      isSuccessUnlock
                        ? 'bg-emerald-500 text-white shadow-emerald-200'
                        : loginError
                        ? 'bg-rose-500 text-white shadow-rose-200'
                        : 'bg-gradient-to-tr from-[#008dd3] to-[#0079b8] text-white shadow-sky-200'
                    }`}
                  >
                    {isSuccessUnlock ? (
                      <CheckCircle2 className="w-8 h-8 animate-bounce" />
                    ) : isAuthenticating ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <KeyRound className="w-7 h-7" />
                      </motion.div>
                    ) : (
                      <Lock className="w-7 h-7" />
                    )}
                  </motion.div>
                </div>

                {/* Title & Description */}
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                    {isSuccessUnlock ? 'Akses Terbuka!' : 'Login Portal Admin'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    {isSuccessUnlock
                      ? 'Sedang membuka dashboard pengelolaan kegiatan...'
                      : 'Masukkan kata sandi pengurus untuk mengelola berita & kegiatan'}
                  </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Kata Sandi Pengurus:
                    </label>
                    <div className="relative group">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#008dd3] transition-colors">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <input
                        type={showPw ? 'text' : 'password'}
                        value={password}
                        disabled={isAuthenticating || isSuccessUnlock}
                        onChange={e => {
                          setPassword(e.target.value);
                          if (loginError) setLoginError('');
                        }}
                        placeholder="Ketik password admin..."
                        className={`w-full pl-10 pr-12 py-3 text-base sm:text-sm bg-slate-50 border rounded-2xl focus:outline-none focus:bg-white transition-all shadow-inner ${
                          loginError
                            ? 'border-rose-300 ring-4 ring-rose-100 bg-rose-50/50'
                            : 'border-slate-200 focus:border-[#008dd3] focus:ring-4 focus:ring-[#008dd3]/20'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw(p => !p)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                        title={showPw ? 'Sembunyikan sandi' : 'Lihat sandi'}
                      >
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Error Notification */}
                  <AnimatePresence>
                    {loginError && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -6, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-rose-600 font-semibold flex items-center gap-1.5 p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{loginError}</span>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Interactive Button */}
                  <motion.button
                    type="submit"
                    disabled={isAuthenticating || isSuccessUnlock}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    className={`w-full py-3.5 rounded-2xl font-black text-sm tracking-wide text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
                      isSuccessUnlock
                        ? 'bg-emerald-500 shadow-emerald-200'
                        : isAuthenticating
                        ? 'bg-[#0079b8] cursor-wait'
                        : 'bg-gradient-to-r from-[#008dd3] to-[#0079b8] hover:from-[#0079b8] hover:to-[#0068a0] shadow-sky-200 hover:shadow-lg'
                    }`}
                  >
                    {isSuccessUnlock ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Berhasil Terverifikasi!</span>
                      </>
                    ) : isAuthenticating ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Memverifikasi Sandi...</span>
                      </>
                    ) : (
                      <>
                        <span>Buka Kunci Portal</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Security Footer Note — TANPA MENAMPILKAN SANDI */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Sistem Keamanan Khusus Pengurus Forum Genre DIY</span>
                </div>
              </motion.div>
            </div>
          ) : (
            /* Dashboard */
            <div className="flex-1 overflow-y-auto">
              {/* Header stats & action */}
              <div className="px-5 sm:px-8 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeTab === 'all' ? 'bg-slate-900 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Semua ({kegiatan.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('live')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeTab === 'live' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
                    }`}
                  >
                    ● Live ({liveCount})
                  </button>
                  <button
                    onClick={() => setActiveTab('scheduled')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeTab === 'scheduled' ? 'bg-[#008dd3] text-white shadow-sm' : 'bg-white text-[#008dd3] border border-sky-200 hover:bg-sky-50'
                    }`}
                  >
                    ⏰ Terjadwal ({scheduledCount})
                  </button>
                  <button
                    onClick={() => setActiveTab('draft')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeTab === 'draft' ? 'bg-amber-500 text-white shadow-sm' : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
                    }`}
                  >
                    ○ Draf ({draftCount})
                  </button>
                </div>

                <button
                  onClick={() => setAdding(true)}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#008dd3] text-white text-xs sm:text-sm font-bold hover:bg-[#0079b8] transition-all shadow-sm hover:shadow-md ml-auto"
                >
                  <Plus className="w-4 h-4" /> Tambah Kegiatan
                </button>
              </div>

              {/* Featured news / post-splash promotion */}
              <div className="px-5 sm:px-8 py-4 border-b border-slate-100 bg-white">
                <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                      <Megaphone className="w-4 h-4 text-amber-500" />
                      Sorotan Berita Setelah Splash
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Berita terpilih muncul 3 detik setelah splash selama 7 detik.
                      {featuredNewsId ? ' Sorotan aktif.' : ' Belum ada sorotan aktif.'}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 lg:w-[min(100%,36rem)]">
                    <select
                      value={featuredNewsSelection}
                      onChange={e => setFeaturedNewsSelection(e.target.value)}
                      className="w-full min-w-0 flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008dd3]/30"
                      aria-label="Pilih berita untuk sorotan"
                    >
                      <option value="">Pilih berita yang sudah tayang...</option>
                      {kegiatan.filter(item => item.diterbitkan).map(item => (
                        <option key={item.id} value={item.id}>{item.judul}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleSetFeaturedNews}
                      disabled={!featuredNewsSelection}
                      className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
                    >
                      Jadikan Sorotan
                    </button>
                    {featuredNewsId && (
                      <button
                        onClick={handleClearFeaturedNews}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-all whitespace-nowrap"
                      >
                        Nonaktifkan
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <QuickLinksAdminPanel onNotify={showToast} />

              {/* Search */}
              <div className="px-5 sm:px-8 py-3 border-b border-slate-100 bg-white">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQ}
                    onChange={e => setSearchQ(e.target.value)}
                    placeholder="Cari judul kegiatan atau kategori..."
                    className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008dd3]/30 focus:border-[#008dd3] transition-all"
                  />
                </div>
              </div>

              {/* Table / List */}
              <div className="px-5 sm:px-8 py-4">
                {filtered.length === 0 ? (
                  <div className="text-center py-16 text-slate-400">
                    <Newspaper className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="font-semibold text-sm">Tidak ada kegiatan di kategori ini</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filtered
                      .sort((a, b) => new Date(b.dibuatPada).getTime() - new Date(a.dibuatPada).getTime())
                      .map((item) => {
                        const kat = KATEGORI_COLORS[item.kategori];
                        const isScheduled = !item.diterbitkan && !!item.jadwalTerbit;

                        return (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50 transition-all"
                          >
                            {/* Left: Thumbnail & Details */}
                            <div className="flex items-start gap-3 min-w-0 flex-1">
                              {/* Thumbnail */}
                              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                                {item.gambarUtama ? (
                                  <img src={item.gambarUtama} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Image className="w-5 h-5 text-slate-300" />
                                  </div>
                                )}
                              </div>

                              {/* Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${kat.bg} ${kat.text} ${kat.border}`}>
                                    {item.kategori}
                                  </span>

                                  {/* Status badge */}
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                    item.diterbitkan
                                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                      : isScheduled
                                      ? 'bg-sky-100 text-[#008dd3] border border-sky-200'
                                      : 'bg-amber-100 text-amber-700 border border-amber-200'
                                  }`}>
                                    {item.diterbitkan ? (
                                      '● Live di Website'
                                    ) : isScheduled ? (
                                      <>
                                        <Clock className="w-2.5 h-2.5" />
                                        ⏰ Terjadwal:{' '}
                                        {new Date(item.jadwalTerbit!).toLocaleDateString('id-ID', {
                                          day: 'numeric',
                                          month: 'short',
                                        })}{' '}
                                        {new Date(item.jadwalTerbit!).toLocaleTimeString('id-ID', {
                                          hour: '2-digit',
                                          minute: '2-digit',
                                        })} WIB
                                      </>
                                    ) : (
                                      '○ Draf'
                                    )}
                                  </span>
                                </div>

                                <h4 className="text-sm font-bold text-slate-900 truncate">{item.judul}</h4>
                                <p className="text-xs text-slate-500 mt-0.5">
                                  {formatDate(item.tanggal)} • {item.lokasi} • Divisi {item.divisi} • {item.jumlahViews} views
                                </p>
                              </div>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                              {/* If scheduled or draft, allow immediate publish */}
                              {!item.diterbitkan && (
                                <button
                                  onClick={() => handlePublishNow(item)}
                                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition-all"
                                  title="UP / Terbitkan Sekarang"
                                >
                                  <Play className="w-3 h-3 fill-emerald-600" />
                                  <span>UP Sekarang</span>
                                </button>
                              )}

                              {/* Toggle visibility */}
                              {item.diterbitkan && (
                                <button
                                  onClick={() => handleTogglePublish(item)}
                                  title="Tarik ke Draf"
                                  className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all text-xs"
                                >
                                  <EyeOff className="w-4 h-4" />
                                </button>
                              )}

                              {/* Edit */}
                              <button
                                onClick={() => setEditing(item)}
                                title="Edit Kegiatan"
                                className="p-2 rounded-xl bg-[#008dd3]/10 text-[#008dd3] hover:bg-[#008dd3]/20 transition-all"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => setConfirmDelete(item.id)}
                                title="Hapus Kegiatan"
                                className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Form Modal */}
        <AnimatePresence>
          {(adding || editing) && (
            <KegiatanForm
              initial={editing || undefined}
              onSave={handleSave}
              onCancel={() => { setAdding(false); setEditing(null); }}
            />
          )}
        </AnimatePresence>

        {/* Confirm Delete */}
        <AnimatePresence>
          {confirmDelete && (
            <motion.div
              className="absolute inset-0 z-10 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center border border-red-100">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                  <Trash2 className="w-6 h-6 text-red-500" />
                </div>
                <h4 className="font-black text-slate-900 mb-2">Hapus Kegiatan?</h4>
                <p className="text-sm text-slate-500 mb-5">Tindakan ini tidak dapat dibatalkan.</p>
                <div className="flex gap-3">
                  <button onClick={() => setConfirmDelete(null)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                    Batal
                  </button>
                  <button onClick={() => handleDelete(confirmDelete)}
                    className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-all">
                    Hapus
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>
    </AnimatePresence>
  );
};
