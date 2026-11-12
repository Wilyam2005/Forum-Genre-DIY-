import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Mail, MapPin, Heart, ExternalLink, ArrowUpRight, MessageCircle, Music2, Download, ClipboardList } from 'lucide-react';
import { Card3D } from '../common/Card3D';
import { sounds } from '../../utils/soundEffects';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative bg-white border-t border-slate-200 pt-20 pb-12 overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#008dd3] to-transparent" />

      {/* Ambient blobs */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-[#008dd3]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-60 h-60 bg-sky-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* CTA Banner with 3D Tilt */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Card3D maxTilt={5} glareOpacity={0.15}>
            <div             className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-[#EFF8FF] via-white to-sky-50 border border-slate-200/90 relative flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-soft [transform-style:preserve-3d]">
              
              <div className="text-center md:text-left max-w-xl [transform:translateZ(25px)]">
                <span className="text-xs font-black uppercase tracking-widest text-[#008dd3] bg-sky-100 px-3 py-1 rounded-full border border-sky-200 inline-block">
                  Pojok Remaja Berencana
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 font-display">
                  Saatnya Yang Muda Yang{' '}
                  <span className="text-[#008dd3]">Berencana!</span>
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                  Punya ide kolaborasi, pertanyaan seputar konseling remaja, atau ingin mengundang Forum Genre DIY ke sekolah/kampusmu? Mari terhubung!
                </p>
                <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
                  <a
                    href="https://instagram.com/genre_diy"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sounds.playClick()}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#008dd3] text-white text-xs font-bold hover:bg-[#0079b8] transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Instagram className="w-4 h-4 text-white/80" />
                    <span>@genre_diy</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://api.whatsapp.com/send/?phone=6288802697580&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sounds.playClick()}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Kami</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="mailto:forumgenrediy@gmail.com"
                    onClick={() => sounds.playClick()}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:border-[#008dd3] hover:bg-sky-50 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Mail className="w-4 h-4 text-sky-600" />
                    <span>Kirim Email</span>
                  </a>
                </div>
              </div>

              {/* Logo Emblem Floating */}
              <div className="shrink-0 flex flex-col items-center gap-3 [transform:translateZ(40px)]">
                <div className="relative w-28 h-32">
                  <div className="absolute inset-0 bg-[#008dd3]/20 rounded-full blur-xl animate-pulse" />
                  <img
                    src="/LOGO GENRE.png"
                    alt="Logo Genre DIY"
                    className="relative w-full h-full object-contain filter drop-shadow-lg hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-center">
                  <span className="block text-xs font-black text-slate-900">Forum Genre DIY</span>
                  <span className="block text-[10px] text-slate-500 font-semibold">Kabinet AnomAdiwarna</span>
                </div>
              </div>
            </div>
          </Card3D>
        </motion.div>

        {/* Links Grid — 5 columns on lg, 2 on md */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-slate-200 text-sm"
        >
          {/* Col 1: Identity & Logo */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-12">
                <img
                  src="/LOGO GENRE.png"
                  alt="Logo Genre DIY"
                  className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(0,141,211,0.2)]"
                />
              </div>
              <div>
                <span className="font-extrabold text-lg text-slate-900 block">
                  Genre <span className="text-amber-500">DIY</span>
                </span>
                <span className="text-xs text-slate-500 font-semibold">Kabinet AnomAdiwarna</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Forum Generasi Berencana Daerah Istimewa Yogyakarta masa bakti 2025–2027. Di bawah binaan Perwakilan BKKBN D.I. Yogyakarta.
            </p>
            <div className="text-[11px] font-mono text-amber-800 font-bold bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 inline-block">
              Periode Aktif: 2025 — 2027
            </div>
          </motion.div>

          {/* Col 2: Navigasi Cepat */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              {[
                { label: 'Beranda Utama', href: '#hero' },
                { label: 'Filosofi AnomAdiwarna', href: '#about' },
                { label: 'Kegiatan Genre DIY', href: '#kegiatan' },
                { label: 'Galeri 45 Anggota & Divisi', href: '#team' },
                { label: 'Program Kerja & Timeline', href: '#programs' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => sounds.playClick()}
                    className="flex items-center gap-1.5 hover:text-[#008dd3] transition-colors group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-[#008dd3] transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Media Sosial & Kanal Resmi */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Kanal Resmi Remaja
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href="https://instagram.com/genre_diy"
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-2.5 text-slate-700 hover:text-pink-600 transition-colors group"
              >
                <div className="p-1.5 rounded-lg bg-pink-100 text-pink-600 group-hover:bg-pink-200 transition-colors">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block">@genre_diy</span>
                  <span className="text-[10px] text-slate-500">Instagram Resmi</span>
                </div>
                <ExternalLink className="w-3 h-3 ml-auto text-slate-400 group-hover:text-pink-500 opacity-0 group-hover:opacity-100 transition-all" />
              </a>

              <a
                href="https://www.tiktok.com/@genrediy_official?_r=1"
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-2.5 text-slate-700 hover:text-slate-900 transition-colors group"
              >
                <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-slate-200 transition-colors">
                  <Music2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block">@genrediy_official</span>
                  <span className="text-[10px] text-slate-500">TikTok Resmi</span>
                </div>
                <ExternalLink className="w-3 h-3 ml-auto text-slate-400 group-hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-all" />
              </a>

              <a
                href="https://www.youtube.com/@genredi.yogyakarta2643"
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-2.5 text-slate-700 hover:text-red-600 transition-colors group"
              >
                <div className="p-1.5 rounded-lg bg-red-100 text-red-600 group-hover:bg-red-200 transition-colors">
                  <Youtube className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block">Genre D. I. Yogyakarta</span>
                  <span className="text-[10px] text-slate-500">Kanal YouTube & Podcast</span>
                </div>
                <ExternalLink className="w-3 h-3 ml-auto text-slate-400 group-hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all" />
              </a>

              <a
                href="https://api.whatsapp.com/send/?phone=6288802697580&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-2.5 text-slate-700 hover:text-emerald-600 transition-colors group"
              >
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block">Contact Person WA</span>
                  <span className="text-[10px] text-slate-500">Hubungi Kami</span>
                </div>
                <ExternalLink className="w-3 h-3 ml-auto text-slate-400 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all" />
              </a>
            </div>
          </motion.div>

          {/* Col 4: Sekretariat & Pembina */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Sekretariat & Pembina
            </h4>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Perwakilan BKKBN D.I. Yogyakarta, Jl. Kenari No. 58, Muja Muju, Kec. Umbulharjo, Kota Yogyakarta, D.I. Yogyakarta 55165
                </span>
              </div>
              <a
                href="mailto:forumgenrediy@gmail.com"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 hover:bg-sky-100 transition-colors"
              >
                <Mail className="w-4 h-4 text-sky-600" />
                <span className="font-bold">forumgenrediy@gmail.com</span>
              </a>
            </div>
          </motion.div>

          {/* Col 5: Download & Pelaporan */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Download & Pelaporan
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href="https://drive.google.com/drive/folders/1yhDF0r5JRMQOSMWPx83-o7U67nP755S0"
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-2.5 text-slate-700 hover:text-[#008dd3] transition-colors group"
              >
                <div className="p-1.5 rounded-lg bg-sky-100 text-[#008dd3] group-hover:bg-sky-200 transition-colors">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block">Download Materi</span>
                  <span className="text-[10px] text-slate-500">Materi Genre DIY</span>
                </div>
                <ExternalLink className="w-3 h-3 ml-auto text-slate-400 group-hover:text-[#008dd3] opacity-0 group-hover:opacity-100 transition-all" />
              </a>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdSyldJt5oObgbRbp1J2HvfO8Xtl405bUXzo-EYEqzNNEK8CQ/viewform?usp=send_form"
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-2.5 text-slate-700 hover:text-violet-600 transition-colors group"
              >
                <div className="p-1.5 rounded-lg bg-violet-100 text-violet-600 group-hover:bg-violet-200 transition-colors">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block">Portal Pelaporan Data PIK-R</span>
                  <span className="text-[10px] text-slate-500">Data PIK-Remaja/Mahasiswa DIY</span>
                </div>
                <ExternalLink className="w-3 h-3 ml-auto text-slate-400 group-hover:text-violet-500 opacity-0 group-hover:opacity-100 transition-all" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center md:text-left"
        >
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2">
            <p>© {new Date().getFullYear()} Forum Genre D.I. Yogyakarta • Kabinet AnomAdiwarna 2025–2027.</p>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="font-extrabold text-[#008dd3] bg-[#008dd3]/10 px-2.5 py-0.5 rounded-full border border-[#008dd3]/20">
              @By:Webtagons
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>untuk Remaja Istimewa Yogyakarta</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
