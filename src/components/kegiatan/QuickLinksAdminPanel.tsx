import React, { useEffect, useState } from 'react';
import { Edit2, ExternalLink, Link2, Plus, Save, Trash2, X } from 'lucide-react';
import type { TautanCepat } from '../../types/kegiatan';
import { kegiatanStore } from '../../utils/kegiatanStore';

interface QuickLinksAdminPanelProps {
  onNotify: (message: string, type?: 'success' | 'error') => void;
}

export const QuickLinksAdminPanel: React.FC<QuickLinksAdminPanelProps> = ({ onNotify }) => {
  const [links, setLinks] = useState<TautanCepat[]>([]);
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [formError, setFormError] = useState('');

  const refresh = async () => {
    const items = await kegiatanStore.getQuickLinks();
    setLinks(items);
    setLoadError('');
  };

  useEffect(() => {
    let active = true;
    kegiatanStore.getQuickLinks()
      .then((items) => { if (active) setLinks(items); })
      .catch((reason: unknown) => {
        console.error('Gagal memuat tombol informasi di portal admin:', reason);
        if (active) setLoadError('Data tombol informasi gagal dimuat dari database.');
      });
    return () => { active = false; };
  }, []);

  const resetForm = () => {
    setLabel('');
    setUrl('');
    setEditingId(null);
    setIsAdding(false);
    setFormError('');
  };

  const beginEdit = (link: TautanCepat) => {
    setLabel(link.label);
    setUrl(link.url);
    setEditingId(link.id);
    setIsAdding(true);
    setFormError('');
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url.trim());
    } catch {
      setFormError('Masukkan URL yang valid dan diawali http:// atau https://.');
      return;
    }
    if (!label.trim() || !['http:', 'https:'].includes(parsedUrl.protocol)) {
      setFormError('Isi nama tombol dan gunakan URL http:// atau https://.');
      return;
    }

    setIsSaving(true);
    setFormError('');
    try {
      const data = { label: label.trim(), url: parsedUrl.toString() };
      if (editingId) {
        await kegiatanStore.updateQuickLink(editingId, data);
        onNotify('Tautan berhasil diperbarui ✓');
      } else {
        await kegiatanStore.createQuickLink(data);
        onNotify('Tautan baru berhasil ditambahkan ✓');
      }
      await refresh();
      resetForm();
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : 'Tautan gagal disimpan.';
      setFormError(message);
      onNotify(message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (link: TautanCepat) => {
    if (!window.confirm(`Hapus tombol "${link.label}"?`)) return;
    try {
      await kegiatanStore.removeQuickLink(link.id);
      await refresh();
      onNotify('Tautan berhasil dihapus.');
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : 'Tautan gagal dihapus.';
      onNotify(message, 'error');
    }
  };

  return (
    <section className="px-5 py-5 sm:px-8 border-b border-slate-100 bg-white" aria-labelledby="admin-quick-links-heading">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 id="admin-quick-links-heading" className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <Link2 className="h-4 w-4 text-[#008dd3]" /> Kelola Tombol Informasi & Layanan
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Tombol tampil pada bagian Pusat Informasi sebelum berita dan menyesuaikan layar HP maupun laptop.
            </p>
          </div>
          {!isAdding && (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#008dd3] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#0079b8]"
            >
              <Plus className="h-4 w-4" /> Tambah Tombol
            </button>
          )}
        </div>

        {isAdding && (
          <form onSubmit={handleSave} className="grid grid-cols-1 gap-2 rounded-2xl border border-sky-100 bg-sky-50/60 p-3 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_auto]">
            <input
              required
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              placeholder="Contoh: Pendaftaran Duta Genre DIY 2027"
              aria-label="Nama tombol informasi"
              className="min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-[#008dd3] focus:outline-none focus:ring-2 focus:ring-[#008dd3]/20"
            />
            <input
              required
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://alamat-formulir-atau-informasi"
              aria-label="Alamat tombol informasi"
              className="min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-[#008dd3] focus:outline-none focus:ring-2 focus:ring-[#008dd3]/20"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5" /> {editingId ? 'Simpan' : 'Tambah'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                aria-label="Batal tambah tautan"
                className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {formError && <p role="alert" className="text-xs font-semibold text-rose-600 sm:col-span-3">{formError}</p>}
          </form>
        )}

        {loadError && <p role="alert" className="text-xs font-semibold text-rose-600">{loadError}</p>}
        {links.length > 0 ? (
          <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {links.map((link) => (
              <li key={link.id} className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5">
                <ExternalLink className="h-4 w-4 shrink-0 text-[#008dd3]" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-800">{link.label}</p>
                  <p className="truncate text-xs text-slate-400">{link.url}</p>
                </div>
                <button
                  type="button"
                  onClick={() => beginEdit(link)}
                  aria-label={`Edit ${link.label}`}
                  className="rounded-lg p-2 text-[#008dd3] hover:bg-sky-50"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => void handleDelete(link)}
                  aria-label={`Hapus ${link.label}`}
                  className="rounded-lg p-2 text-rose-500 hover:bg-rose-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          !loadError && !isAdding && (
            <p className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-400">
              Belum ada tombol informasi. Tambahkan tombol untuk formulir pendaftaran atau layanan resmi.
            </p>
          )
        )}
      </div>
    </section>
  );
};
