-- Baciraro 3D Print Variants Migration
-- Run this in Supabase SQL Editor
-- Adds pricing / weight / print-time metadata for 3D Print products
-- and seeds official MakerWorld slicer estimates (grams, minutes, variants).

-- 1. Schema
ALTER TABLE products ADD COLUMN IF NOT EXISTS weight_g INT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS print_time_min INT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS variants JSONB DEFAULT '[]';

-- 2. Seed data (official MakerWorld print-profile estimates, PLA display)
UPDATE products SET
  weight_g = 9,
  print_time_min = 62,
  variants = '[
    {"label":"One color (faster)","weight_g":9,"minutes":62},
    {"label":"0.12mm layer, 4 walls, 15% infill","weight_g":104,"minutes":595}
  ]'
WHERE slug = '3d-spiderman-flexi';

UPDATE products SET
  weight_g = 12,
  print_time_min = 109,
  variants = '[
    {"label":"0.12mm layer, 2 walls, 15% infill","weight_g":12,"minutes":109},
    {"label":"Full colour 0.16mm","weight_g":186,"minutes":617},
    {"label":"No Chest colour 0.16mm","weight_g":192,"minutes":657}
  ]'
WHERE slug = '3d-mini-spidy';

UPDATE products SET
  weight_g = 27,
  print_time_min = 51,
  variants = '[
    {"label":"0.2mm layer, 3 walls, 15% infill","weight_g":27,"minutes":51}
  ]'
WHERE slug = '3d-jesus-cross';

UPDATE products SET
  weight_g = 10,
  print_time_min = 41,
  variants = '[
    {"label":"0.2mm layer, 2 walls, 15% infill","weight_g":10,"minutes":41}
  ]'
WHERE slug = '3d-jesus-on-cross';

UPDATE products SET
  weight_g = 19,
  print_time_min = 103,
  variants = '[
    {"label":"Single Color","weight_g":19,"minutes":103},
    {"label":"AMS Version (4 warna)","weight_g":149,"minutes":706}
  ]'
WHERE slug = '3d-knitted-jesus';

UPDATE products SET
  weight_g = 29,
  print_time_min = 87,
  variants = '[
    {"label":"0.2mm layer, 2 walls, 7% infill","weight_g":29,"minutes":87},
    {"label":"Single color","weight_g":42,"minutes":108},
    {"label":"Colored eyes","weight_g":90,"minutes":271}
  ]'
WHERE slug = '3d-barn-owl';

UPDATE products SET
  weight_g = 18,
  print_time_min = 84,
  variants = '[
    {"label":"Small lightweight 0% infill","weight_g":18,"minutes":84},
    {"label":"Small 0.16mm layer, 10% infill","weight_g":37,"minutes":115},
    {"label":"0.2mm layer, 2 walls, 15% infill","weight_g":83,"minutes":138},
    {"label":"Large 0.2mm layer, 10% infill","weight_g":92,"minutes":152},
    {"label":"140% scale (PETG)","weight_g":195,"minutes":383},
    {"label":"0.16mm layer, 2 walls, 8% infill","weight_g":534,"minutes":1763}
  ]'
WHERE slug = '3d-manguni';

-- Tarsier: set inactive until commercial permission from creator (Meshtush)
UPDATE products SET is_active = false WHERE slug = '3d-tarsier-finger';