// Insert MakerWorld batch-2 products from scripts/3d/batch2_manifest.json
// Usage: node scripts/insert_batch2.mjs
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

const manifest = JSON.parse(readFileSync(new URL('./3d/batch2_manifest.json', import.meta.url), 'utf8'));
const IMG_DIR = join(process.cwd(), 'public/produk/3d/mw-b2');

function imagesFor(slug) {
  if (!existsSync(IMG_DIR)) return { hero: null, gallery: [] };
  const files = readdirSync(IMG_DIR)
    .filter((f) => f.startsWith(`${slug}-`))
    .sort();
  const hero = files.find((f) => f.startsWith(`${slug}-1.`)) ?? null;
  const gallery = files.filter((f) => f !== hero);
  return {
    hero: hero ? `/produk/3d/mw-b2/${hero}` : null,
    gallery: gallery.map((f) => `/produk/3d/mw-b2/${f}`),
  };
}

async function run() {
  const { data: maxRow } = await supabase
    .from('products')
    .select('id')
    .order('id', { ascending: false })
    .limit(1);
  const maxId = maxRow?.[0]?.id ?? 0;
  const created = [];
  const updated = [];

  let i = 0;
  for (const m of manifest) {
    const { hero, gallery } = imagesFor(m.slug);
    if (!hero) {
      console.error('SKIP (no hero image)', m.slug);
      continue;
    }
    const variant = { label: 'Standar', weight_g: m.weight_g, minutes: m.print_time_min };
    const payload = {
      id: maxId + i + 1,
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
      weight_g: m.weight_g,
      print_time_min: m.print_time_min,
      variants: [variant],
      artists: [],
    };
    const { error, status } = await supabase
      .from('products')
      .upsert(payload, { onConflict: 'slug' });
    if (error) {
      console.error('ERR', m.slug, error.message, error.details || '');
    } else if (status === 201) {
      created.push(m.slug);
      console.log('CREATED', m.slug, m.weight_g + 'g');
    } else {
      updated.push(m.slug);
      console.log('UPDATED', m.slug, m.weight_g + 'g');
    }
    i++;
  }
  console.log(`\nDone. created=${created.length} updated=${updated.length}`);
}

run();