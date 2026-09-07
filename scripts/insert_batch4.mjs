// Insert MakerWorld batch-4 products from scripts/3d/batch4_manifest.json
// Usage: node scripts/insert_batch4.mjs
// Ids are fixed: 900020..900037 (matches supabase-mw-batch4.sql).
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

const manifest = JSON.parse(readFileSync(new URL('./3d/batch4_manifest.json', import.meta.url), 'utf8'));
const IMG_DIR = join(process.cwd(), 'public/produk/3d/batch4');
const BASE_ID = 900020;

function imagesFor(slug) {
  if (!existsSync(IMG_DIR)) return { hero: null, gallery: [] };
  const files = readdirSync(IMG_DIR)
    .filter((f) => f.startsWith(`${slug}-`))
    .sort();
  const hero = files.find((f) => f.startsWith(`${slug}-1.`)) ?? null;
  const gallery = files.filter((f) => f !== hero);
  return {
    hero: hero ? `/produk/3d/batch4/${hero}` : null,
    gallery: gallery.map((f) => `/produk/3d/batch4/${f}`),
  };
}

async function run() {
  const created = [];
  const updated = [];
  const skipped = [];

  for (let i = 0; i < manifest.length; i++) {
    const m = manifest[i];
    const { hero, gallery } = imagesFor(m.slug);
    if (!hero) {
      skipped.push(m.slug);
      console.error('SKIP (no hero image)', m.slug);
      continue;
    }
    const w = Math.round(m.weight_g);
    const t = m.print_time_min;
    const wMc = Math.round(w * 1.9);
    const tMc = Math.max(t, Math.round(t * 1.5));
    const payload = {
      id: BASE_ID + i,
      slug: m.slug,
      title: m.title,
      description: m.description,
      category: '3dprint',
      story: m.story,
      materials: [],
      total_plastic_kg: 0,
      image_url: hero,
      gallery,
      is_active: true,
      weight_g: w,
      print_time_min: t,
      variants: [
        { label: 'Standar', weight_g: w, minutes: t },
        { label: 'Multicolor', weight_g: wMc, minutes: tMc },
      ],
      artists: [],
    };
    const { error, status } = await supabase
      .from('products')
      .upsert(payload, { onConflict: 'id' });
    if (error) {
      console.error('ERR', m.slug, error.message, error.details || '');
    } else if (status === 201) {
      created.push(m.slug);
      console.log('CREATED', payload.id, m.slug, w + 'g');
    } else {
      updated.push(m.slug);
      console.log('UPDATED', payload.id, m.slug, w + 'g');
    }
  }
  console.log(`\nDone. created=${created.length} updated=${updated.length} skipped=${skipped.length}`);
}

run();
