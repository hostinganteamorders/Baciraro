// Pindahkan foto public/produk ke Supabase Storage (bucket product-images, prefix produk/),
// kompres dulu, ubah alamat di tabel products, dan (opsional) hapus video di Supabase.
//
// Pemakaian (dari root proyek, pakai .env.local):
//   node scripts/media/migrate-produk.mjs                 -> RENCANA saja, tidak mengubah apa pun
//   node scripts/media/migrate-produk.mjs --local-only    -> kompres ke _media-out/ tanpa internet (cek hasil)
//   node scripts/media/migrate-produk.mjs --upload        -> kompres + unggah ke Supabase
//   node scripts/media/migrate-produk.mjs --update-db     -> ubah image_url/gallery di tabel products (backup dulu)
//   node scripts/media/migrate-produk.mjs --delete-videos -> daftar + hapus video di Supabase (minta konfirmasi)
// Tambahan: --limit=N untuk mencoba N file pertama saja.
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import { config } from 'dotenv';
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import readline from 'node:readline/promises';

config({ path: '.env.local' });
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_KEY;
const BUCKET = 'product-images';
const PREFIX = 'produk';
const SRC = 'public/produk';
const OUT = '_media-out';
const MAX_PX = 1600;
const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const limit = Number((args.find((a) => a.startsWith('--limit=')) || '').split('=')[1]) || Infinity;
const MB = (n) => (n / 1048576).toFixed(1) + ' MB';
const IMG = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const VIDEO = /\.(mp4|mov|webm|m4v|avi|mkv)$/i;
const TYPES = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml' };

const needNet = has('--upload') || has('--update-db') || has('--delete-videos') || args.length === 0;
if (needNet && (!SUPABASE_URL || !KEY)) { console.error('NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_KEY belum ada di .env.local'); process.exit(1); }
const sb = needNet ? createClient(SUPABASE_URL, KEY) : null;
const publicUrl = (rel) => `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${PREFIX}/${rel.split('/').map(encodeURIComponent).join('/')}`;

async function walkLocal(dir, base = dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walkLocal(p, base)));
    else out.push(p.slice(base.length + 1).split('\\').join('/'));
  }
  return out;
}

async function encode(buf, ext) {
  const img = sharp(buf, { failOn: 'none' }).rotate().resize({ width: MAX_PX, height: MAX_PX, fit: 'inside', withoutEnlargement: true });
  if (ext === '.png') return img.png({ compressionLevel: 9, effort: 8 }).toBuffer();
  if (ext === '.webp') return img.webp({ quality: 80 }).toBuffer();
  return img.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
}

async function pool(items, n, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; await fn(items[k], k); } }));
}

async function listStorage(bucket, prefix = '') {
  const out = [];
  for (let offset = 0; ; offset += 1000) {
    const { data, error } = await sb.storage.from(bucket).list(prefix, { limit: 1000, offset });
    if (error) throw new Error(`${bucket}/${prefix}: ${error.message}`);
    for (const it of data) {
      const p = prefix ? `${prefix}/${it.name}` : it.name;
      if (it.id === null) out.push(...(await listStorage(bucket, p)));
      else out.push({ path: p, size: it.metadata?.size || 0, type: it.metadata?.mimetype || '' });
    }
    if (data.length < 1000) break;
  }
  return out;
}

async function findVideos() {
  const { data: buckets, error } = await sb.storage.listBuckets();
  if (error) throw new Error(error.message);
  const vids = [];
  for (const b of buckets) {
    const files = await listStorage(b.name);
    vids.push(...files.filter((f) => VIDEO.test(f.path) || f.type.startsWith('video/')).map((f) => ({ bucket: b.name, ...f })));
  }
  return vids;
}

async function processFiles(mode) {
  let files = (await walkLocal(SRC)).filter((f) => !f.startsWith('.'));
  files = files.slice(0, limit);
  let before = 0, after = 0, ok = 0; const failed = [];
  await pool(files, 4, async (rel) => {
    const ext = extname(rel).toLowerCase();
    const orig = await readFile(join(SRC, rel));
    let out = orig;
    if (IMG.has(ext)) { try { const enc = await encode(orig, ext); if (enc.length < orig.length) out = enc; } catch (e) { failed.push(`${rel}: ${e.message}`); return; } }
    before += orig.length; after += out.length;
    if (mode === 'local') { const dest = join(OUT, PREFIX, rel); await mkdir(dirname(dest), { recursive: true }); await writeFile(dest, out); ok++; return; }
    const { error } = await sb.storage.from(BUCKET).upload(`${PREFIX}/${rel}`, out, { contentType: TYPES[ext] || 'application/octet-stream', upsert: true, cacheControl: '31536000' });
    if (error) failed.push(`${rel}: ${error.message}`); else ok++;
    if (ok % 25 === 0) console.log(`  ... ${ok}/${files.length}`);
  });
  console.log(`\n${ok}/${files.length} file selesai. Ukuran ${MB(before)} -> ${MB(after)} (hemat ${(100 - (after / before) * 100).toFixed(0)}%).`);
  if (failed.length) { console.log(`GAGAL ${failed.length}:`); failed.slice(0, 30).forEach((f) => console.log('  ' + f)); }
  if (mode === 'local') console.log(`Hasil ada di ${OUT}/ (tidak diunggah).`);
}

function mapPath(p) {
  if (typeof p !== 'string' || !p.startsWith('/produk/')) return p;
  const rel = decodeURI(p.slice('/produk/'.length));
  return existsSync(join(SRC, rel)) ? publicUrl(rel) : p;
}

async function updateDb() {
  const { data, error } = await sb.from('products').select('id, slug, image_url, gallery');
  if (error) throw new Error(error.message);
  const backup = `scripts/media/backup-products-${Date.now()}.json`;
  await writeFile(backup, JSON.stringify(data, null, 2));
  console.log(`Backup lama: ${backup}`);
  let changed = 0;
  for (const r of data) {
    const gal = typeof r.gallery === 'string' ? JSON.parse(r.gallery || '[]') : r.gallery;
    const newGal = Array.isArray(gal) ? gal.map(mapPath) : gal;
    const newImg = mapPath(r.image_url);
    if (newImg === r.image_url && JSON.stringify(newGal) === JSON.stringify(gal)) continue;
    const { error: e } = await sb.from('products').update({ image_url: newImg, gallery: newGal }).eq('id', r.id);
    if (e) console.log(`  GAGAL ${r.slug}: ${e.message}`); else changed++;
  }
  console.log(`${changed} produk diperbarui. Untuk membatalkan, pulihkan nilai dari file backup.`);
}

async function deleteVideos() {
  const vids = await findVideos();
  if (!vids.length) { console.log('Tidak ada video di Supabase Storage.'); return; }
  const { data: prods } = await sb.from('products').select('slug, image_url, gallery');
  console.log(`Ditemukan ${vids.length} video (${MB(vids.reduce((a, v) => a + v.size, 0))}):`);
  for (const v of vids) {
    const used = (prods || []).filter((p) => JSON.stringify([p.image_url, p.gallery]).includes(v.path)).map((p) => p.slug);
    console.log(`  ${v.bucket}/${v.path}  ${MB(v.size)}${used.length ? '  <-- DIPAKAI oleh: ' + used.join(', ') : ''}`);
  }
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ans = await rl.question('\nHapus PERMANEN semua video di atas? Tidak bisa dibatalkan. Ketik HAPUS untuk lanjut: ');
  rl.close();
  if (ans.trim() !== 'HAPUS') { console.log('Dibatalkan, tidak ada yang dihapus.'); return; }
  for (const b of new Set(vids.map((v) => v.bucket))) {
    const { error } = await sb.storage.from(b).remove(vids.filter((v) => v.bucket === b).map((v) => v.path));
    console.log(error ? `GAGAL ${b}: ${error.message}` : `Terhapus dari ${b}`);
  }
}

async function plan() {
  const files = await walkLocal(SRC);
  const imgs = files.filter((f) => IMG.has(extname(f).toLowerCase()));
  console.log(`RENCANA (tidak ada yang diubah)\n- ${files.length} file di ${SRC} (${imgs.length} gambar) akan diunggah ke ${BUCKET}/${PREFIX}/ setelah dikompres maks ${MAX_PX}px`);
  try {
    const vids = await findVideos();
    console.log(`- Video di Supabase: ${vids.length}${vids.length ? '\n    ' + vids.map((v) => `${v.bucket}/${v.path} (${MB(v.size)})`).join('\n    ') : ''}`);
  } catch (e) { console.log('- Tidak bisa membaca Supabase:', e.message); }
  console.log('\nLangkah: --upload, lalu --update-db, lalu --delete-videos (masing-masing terpisah).');
}

if (has('--local-only')) await processFiles('local');
else if (has('--upload')) await processFiles('upload');
if (has('--update-db')) await updateDb();
if (has('--delete-videos')) await deleteVideos();
if (args.length === 0) await plan();
