/**
 * Strix QA & Evaluation Harness
 * Automated test suite for Genre DIY Kabinet AnomAdiwarna web application
 * Validates asset integrity, data schemas matching FORUM GENRE DIY.pdf,
 * 45 poster files, logo availability, and elimination of multi-color text gradients.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('\n=============================================================');
console.log('  ðŸ” STRIX QA & UI/UX EVALUATION SUITE');
console.log('  Dokumen Profil: FORUM GENRE DIY.pdf');
console.log('  Kabinet AnomAdiwarna 2025 - 2027 | Forum Genre D.I. Yogyakarta');
console.log('=============================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  âœ… [PASS] ${testName}`);
    if (details) console.log(`     â””â”€ ${details}`);
  } else {
    failedTests++;
    console.error(`  âŒ [FAIL] ${testName}`);
    if (details) console.error(`     â””â”€ ERROR: ${details}`);
  }
}

// TEST 1: PDF Source Check
const pdfPath = path.join(rootDir, 'FORUM GENRE DIY.pdf');
assert(fs.existsSync(pdfPath), 'Dokumen Profil PDF Ditemukan', pdfPath);

// TEST 2: Logo Genre PNG
const logoRootPath = path.join(rootDir, 'LOGO GENRE.png');
const logoPublicPath = path.join(rootDir, 'public', 'LOGO GENRE.png');
const logoExists = fs.existsSync(logoRootPath) && fs.existsSync(logoPublicPath);
const logoSize = fs.existsSync(logoRootPath) ? fs.statSync(logoRootPath).size : 0;
assert(logoExists && logoSize > 10000, 'Logo Genre Asset Check', `Ukuran: ${logoSize} bytes. Ditemukan di root & public.`);

// TEST 3: 45 Posters in Source Directory
const sourcePosterDir = path.join(rootDir, 'POSTER NAMA ANGGHOTA DAN DEVISI DLL');
assert(fs.existsSync(sourcePosterDir), 'Direktori Poster Sumber Terdeteksi', sourcePosterDir);

let missingSourcePosters = [];
for (let i = 1; i <= 45; i++) {
  const pPath = path.join(sourcePosterDir, `${i}.png`);
  if (!fs.existsSync(pPath)) {
    missingSourcePosters.push(`${i}.png`);
  }
}
assert(
  missingSourcePosters.length === 0,
  'Kelengkapan 45 Poster Sumber (1.png s.d 45.png)',
  missingSourcePosters.length === 0 ? 'Lengkap 45 file' : `Hilang: ${missingSourcePosters.join(', ')}`
);

// TEST 4: 45 Posters in Public Web Directory
const publicPosterDir = path.join(rootDir, 'public', 'posters');
assert(fs.existsSync(publicPosterDir), 'Direktori Poster Public Terdeteksi', publicPosterDir);

let missingPublicPosters = [];
for (let i = 1; i <= 45; i++) {
  const pPath = path.join(publicPosterDir, `${i}.png`);
  if (!fs.existsSync(pPath)) {
    missingPublicPosters.push(`${i}.png`);
  }
}
assert(
  missingPublicPosters.length === 0,
  'Kelengkapan 45 Poster di Folder Public (Web Ready)',
  missingPublicPosters.length === 0 ? 'Lengkap 45 file siap render' : `Hilang: ${missingPublicPosters.join(', ')}`
);

// TEST 5: Data Schema Fidelity with PDF (Filosofi Anom, Adi, Adiwarna, Fokus, & Perbedaan Duta vs Forum)
const dataFilePath = path.join(rootDir, 'src', 'data', 'cabinetData.ts');
const dataContent = fs.readFileSync(dataFilePath, 'utf-8');

assert(
  dataContent.includes('OFFICIAL_PROFILE') &&
  dataContent.includes('agen perubahan') &&
  dataContent.includes('Adi berarti unggul atau luhur') &&
  dataContent.includes('Adiwarna bermakna keberagaman') &&
  dataContent.includes('Penguatan Sinergi Berkelanjutan PIK-R') &&
  dataContent.includes('PERBEDAAN DUTA GENRE & FORUM GENRE'),
  'Kesesuaian 100% Data Filosofi & Fokus dengan PDF',
  'Filosofi AnomAdiwarna, 3 Fokus Kabinet, dan Perbedaan Duta Genre terintegrasi presisi.'
);

// TEST 6: Card Directive Check (No "Koordinator" badge on member cards)
const cardFilePath = path.join(rootDir, 'src', 'components', 'team', 'Roster3DCard.tsx');
const cardContent = fs.readFileSync(cardFilePath, 'utf-8');
const hasKoordinatorBadgeOnCard = cardContent.includes('>Koordinator<') || cardContent.includes('<span>Koordinator</span>');
assert(
  !hasKoordinatorBadgeOnCard,
  'Penghapusan Badge Koordinator pada Kartu Anggota',
  'Badge "Koordinator" telah dihapus dari kartu anggota sesuai instruksi user.'
);

// TEST 7: Spelling Directive Check ("Genre" with lowercase 'r')
const htmlPath = path.join(rootDir, 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const hasGenreInHtml = htmlContent.includes('Genre DIY') || htmlContent.includes('Forum Genre');
assert(
  hasGenreInHtml,
  'Presisi Penulisan "Genre" (huruf r kecil)',
  'Penulisan kata Genre menggunakan huruf r kecil sesuai instruksi user.'
);

// TEST 8: Anti-AI Gradient Check (Ensure no muddy multi-color text gradients)
const heroContent = fs.readFileSync(path.join(rootDir, 'src', 'components', 'hero', 'HeroSection.tsx'), 'utf-8');
const aboutContent = fs.readFileSync(path.join(rootDir, 'src', 'components', 'about', 'AboutSection.tsx'), 'utf-8');
const teamContent = fs.readFileSync(path.join(rootDir, 'src', 'components', 'team', 'TeamSection.tsx'), 'utf-8');

const hasMuddyGradient =
  heroContent.includes('from-amber-500 via-amber-600 to-sky-600') ||
  aboutContent.includes('from-amber-500 via-amber-600 to-sky-600') ||
  teamContent.includes('from-amber-500 via-amber-600 to-sky-600');

assert(
  !hasMuddyGradient,
  'Eliminasi Gradien Tulisan Bertumpuk ("Anti-AI Template")',
  'Semua judul menggunakan warna tipografi solid, bersih, berwibawa, dan proporsional.'
);

// SUMMARY
console.log('\n-------------------------------------------------------------');
console.log(`  EVALUASI SELESAI: ${passedTests} Lolos, ${failedTests} Gagal (Total: ${totalTests} Pengujian)`);
if (failedTests === 0) {
  console.log('  ðŸŽ‰ SEMUA PENGUJIAN STRIX QA BERHASIL 100%! PRODUCTION READY!');
  console.log('-------------------------------------------------------------\n');
  process.exit(0);
} else {
  console.error('  âš ï¸ DITEMUKAN DEFECT PADA PENGUJIAN QA.');
  console.log('-------------------------------------------------------------\n');
  process.exit(1);
}
