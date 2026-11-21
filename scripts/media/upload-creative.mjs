// Unggah foto halaman /creative (hasil kompresi WebP) ke Supabase Storage.
// Sumber : _media-out/creative/<slug>/fNNN.webp (+ fNNN-t.webp)  — dibuat oleh proses kompres foto
// Tujuan : bucket product-images, folder creative/<slug>/
//
// Pemakaian (dari root proyek, pakai .env.local):
//   node scripts/media/upload-creative.mjs            -> RENCANA saja (daftar file + ukuran)
//   node scripts/media/upload-creative.mjs --upload   -> unggah hanya foto yang dipakai di halaman web
//   node scripts/media/upload-creative.mjs --upload --all -> unggah SEMUA foto hasil kompres (arsip)
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

config({ path: '.env.local' });
const args = process.argv.slice(2);
const doUpload = args.includes('--upload');
const all = args.includes('--all');
const BUCKET = 'product-images';
const ROOT = '_media-out/creative';
const used = JSON.parse(await readFile('scripts/media/creative-used.json', 'utf8'));
const MB = (n) => (n / 1048576).toFixed(1) + ' MB';

const jobs = [];
for (const slug of Object.keys(used)) {
  const dir = join(ROOT, slug);
  if (!existsSync(dir)) { console.warn(`! folder tidak ada: ${dir}`); continue; }
  const names = all
    ? (await readdir(dir)).filter((f) => /^f\d{3}(-t)?\.webp$/.test(f))
    : used[slug].flatMap((n) => { const b = `f${String(n).padStart(3, '0')}`; return [`${b}.webp`, `${b}-t.webp`]; });
  for (const f of names) {
    const p = join(dir, f);
    if (!existsSync(p)) { console.warn(`! hilang: ${p}`); continue; }
    jobs.push({ path: p, key: `creative/${slug}/${f}`, size: (await stat(p)).size });
  }
}
// Etalase piala Annual Games (PNG transparan hasil ekspor Figma → WebP): _media-out/creative/annual-games-2026/piala/pNN.webp
const pialaDir = join(ROOT, 'annual-games-2026', 'piala');
if (existsSync(pialaDir)) {
  for (const f of (await readdir(pialaDir)).filter((x) => /^p\d{2}\.webp$/.test(x))) {
    const p = join(pialaDir, f);
    jobs.push({ path: p, key: `creative/annual-games-2026/piala/${f}`, size: (await stat(p)).size });
  }
}
const total = jobs.reduce((a, j) => a + j.size, 0);
console.log(`${jobs.length} file, total ${MB(total)} ${all ? '(semua)' : '(yang dipakai di web)'}`);
if (!doUpload) { console.log('Mode rencana. Tambahkan --upload untuk mengunggah.'); process.exit(0); }

const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL, KEY = process.env.SUPABASE_SERVICE_KEY;
if (!URL_ || !KEY) { console.error('NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_KEY belum ada di .env.local'); process.exit(1); }
const sb = createClient(URL_, KEY);
let done = 0, fail = 0, i = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (i < jobs.length) {
    const j = jobs[i++];
    const { error } = await sb.storage.from(BUCKET).upload(j.key, await readFile(j.path), {
      contentType: 'image/webp', cacheControl: '31536000', upsert: true,
    });
    if (error) { fail++; console.error('GAGAL', j.key, error.message); } else done++;
    if ((done + fail) % 20 === 0) console.log(`${done + fail}/${jobs.length}`);
  }
}));
console.log(`selesai: ${done} terunggah, ${fail} gagal`);
