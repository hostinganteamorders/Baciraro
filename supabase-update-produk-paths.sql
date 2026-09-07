-- Update path gambar produk di public/produk setelah dipindah ke folder per kategori.
-- Menyesuaikan image_url & gallery (jsonb) di tabel products.
-- Jalankan di Supabase SQL Editor.

BEGIN;

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Lukisan Asap dan Kenangan.png', '/produk/lukisan/Close-up Tekstur Material Lukisan Asap dan Kenangan.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Lukisan Asap dan Kenangan.png', '/produk/lukisan/Close-up Tekstur Material Lukisan Asap dan Kenangan.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Lukisan Asap dan Kenangan.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Lukisan Asap dan Kenangan.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Lukisan Ayam.png', '/produk/lukisan/Close-up Tekstur Material Lukisan Ayam.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Lukisan Ayam.png', '/produk/lukisan/Close-up Tekstur Material Lukisan Ayam.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Lukisan Ayam.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Lukisan Ayam.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Lukisan Penjaga Tradisi.png', '/produk/lukisan/Close-up Tekstur Material Lukisan Penjaga Tradisi.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Lukisan Penjaga Tradisi.png', '/produk/lukisan/Close-up Tekstur Material Lukisan Penjaga Tradisi.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Lukisan Penjaga Tradisi.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Lukisan Penjaga Tradisi.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Lukisan Tarsius.png', '/produk/lukisan/Close-up Tekstur Material Lukisan Tarsius.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Lukisan Tarsius.png', '/produk/lukisan/Close-up Tekstur Material Lukisan Tarsius.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Lukisan Tarsius.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Lukisan Tarsius.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Lukisan Tawa Kehidupan.png', '/produk/lukisan/Close-up Tekstur Material Lukisan Tawa Kehidupan.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Lukisan Tawa Kehidupan.png', '/produk/lukisan/Close-up Tekstur Material Lukisan Tawa Kehidupan.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Lukisan Tawa Kehidupan.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Lukisan Tawa Kehidupan.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Lukisan Wajah Jenaka.png', '/produk/lukisan/Close-up Tekstur Material Lukisan Wajah Jenaka.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Lukisan Wajah Jenaka.png', '/produk/lukisan/Close-up Tekstur Material Lukisan Wajah Jenaka.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Lukisan Wajah Jenaka.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Lukisan Wajah Jenaka.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Lukisan Asap dan Kenangan.png', '/produk/lukisan/Flat Lay Katalog Lukisan Asap dan Kenangan.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Lukisan Asap dan Kenangan.png', '/produk/lukisan/Flat Lay Katalog Lukisan Asap dan Kenangan.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Lukisan Asap dan Kenangan.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Lukisan Asap dan Kenangan.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Lukisan Ayam.png', '/produk/lukisan/Flat Lay Katalog Lukisan Ayam.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Lukisan Ayam.png', '/produk/lukisan/Flat Lay Katalog Lukisan Ayam.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Lukisan Ayam.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Lukisan Ayam.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Lukisan Penjaga Tradisi.png', '/produk/lukisan/Flat Lay Katalog Lukisan Penjaga Tradisi.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Lukisan Penjaga Tradisi.png', '/produk/lukisan/Flat Lay Katalog Lukisan Penjaga Tradisi.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Lukisan Penjaga Tradisi.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Lukisan Penjaga Tradisi.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Lukisan Tarsius.png', '/produk/lukisan/Flat Lay Katalog Lukisan Tarsius.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Lukisan Tarsius.png', '/produk/lukisan/Flat Lay Katalog Lukisan Tarsius.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Lukisan Tarsius.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Lukisan Tarsius.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Lukisan Tawa Kehidupan.png', '/produk/lukisan/Flat Lay Katalog Lukisan Tawa Kehidupan.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Lukisan Tawa Kehidupan.png', '/produk/lukisan/Flat Lay Katalog Lukisan Tawa Kehidupan.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Lukisan Tawa Kehidupan.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Lukisan Tawa Kehidupan.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Lukisan Wajah Jenaka.png', '/produk/lukisan/Flat Lay Katalog Lukisan Wajah Jenaka.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Lukisan Wajah Jenaka.png', '/produk/lukisan/Flat Lay Katalog Lukisan Wajah Jenaka.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Lukisan Wajah Jenaka.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Lukisan Wajah Jenaka.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Lukisan Ayam.png', '/produk/lukisan/Lifestyle Lukisan Ayam.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Lukisan Ayam.png', '/produk/lukisan/Lifestyle Lukisan Ayam.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Lukisan Ayam.png%' OR gallery::text LIKE '%/produk/Lifestyle Lukisan Ayam.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Lukisan Penjaga Tradisi.png', '/produk/lukisan/Lifestyle Lukisan Penjaga Tradisi.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Lukisan Penjaga Tradisi.png', '/produk/lukisan/Lifestyle Lukisan Penjaga Tradisi.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Lukisan Penjaga Tradisi.png%' OR gallery::text LIKE '%/produk/Lifestyle Lukisan Penjaga Tradisi.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Lukisan Tarsius.png', '/produk/lukisan/Lifestyle Lukisan Tarsius.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Lukisan Tarsius.png', '/produk/lukisan/Lifestyle Lukisan Tarsius.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Lukisan Tarsius.png%' OR gallery::text LIKE '%/produk/Lifestyle Lukisan Tarsius.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Lukisan Tawa Kehidupan.png', '/produk/lukisan/Lifestyle Lukisan Tawa Kehidupan.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Lukisan Tawa Kehidupan.png', '/produk/lukisan/Lifestyle Lukisan Tawa Kehidupan.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Lukisan Tawa Kehidupan.png%' OR gallery::text LIKE '%/produk/Lifestyle Lukisan Tawa Kehidupan.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Lukisan Wajah Jenaka.png', '/produk/lukisan/Lifestyle Lukisan Wajah Jenaka.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Lukisan Wajah Jenaka.png', '/produk/lukisan/Lifestyle Lukisan Wajah Jenaka.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Lukisan Wajah Jenaka.png%' OR gallery::text LIKE '%/produk/Lifestyle Lukisan Wajah Jenaka.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Anjing.png', '/produk/kriya/Close-up Tekstur Material Anjing.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Anjing.png', '/produk/kriya/Close-up Tekstur Material Anjing.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Anjing.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Anjing.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Arrow Sign.png', '/produk/kriya/Close-up Tekstur Material Arrow Sign.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Arrow Sign.png', '/produk/kriya/Close-up Tekstur Material Arrow Sign.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Arrow Sign.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Arrow Sign.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Beruang 2.png', '/produk/kriya/Close-up Tekstur Material Beruang 2.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Beruang 2.png', '/produk/kriya/Close-up Tekstur Material Beruang 2.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Beruang 2.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Beruang 2.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Beruang 3.png', '/produk/kriya/Close-up Tekstur Material Beruang 3.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Beruang 3.png', '/produk/kriya/Close-up Tekstur Material Beruang 3.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Beruang 3.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Beruang 3.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Beruang 4.png', '/produk/kriya/Close-up Tekstur Material Beruang 4.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Beruang 4.png', '/produk/kriya/Close-up Tekstur Material Beruang 4.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Beruang 4.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Beruang 4.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Beruang 5.png', '/produk/kriya/Close-up Tekstur Material Beruang 5.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Beruang 5.png', '/produk/kriya/Close-up Tekstur Material Beruang 5.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Beruang 5.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Beruang 5.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Beruang 6.png', '/produk/kriya/Close-up Tekstur Material Beruang 6.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Beruang 6.png', '/produk/kriya/Close-up Tekstur Material Beruang 6.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Beruang 6.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Beruang 6.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Beruang.png', '/produk/kriya/Close-up Tekstur Material Beruang.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Beruang.png', '/produk/kriya/Close-up Tekstur Material Beruang.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Beruang.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Beruang.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Biodigester.png', '/produk/kriya/Close-up Tekstur Material Biodigester.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Biodigester.png', '/produk/kriya/Close-up Tekstur Material Biodigester.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Biodigester.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Biodigester.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Burung Hantu 2.png', '/produk/kriya/Close-up Tekstur Material Burung Hantu 2.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Burung Hantu 2.png', '/produk/kriya/Close-up Tekstur Material Burung Hantu 2.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Burung Hantu 2.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Burung Hantu 2.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Burung Hantu.png', '/produk/kriya/Close-up Tekstur Material Burung Hantu.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Burung Hantu.png', '/produk/kriya/Close-up Tekstur Material Burung Hantu.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Burung Hantu.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Burung Hantu.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Ikan.png', '/produk/kriya/Close-up Tekstur Material Ikan.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Ikan.png', '/produk/kriya/Close-up Tekstur Material Ikan.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Ikan.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Ikan.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Infinite Book.png', '/produk/kriya/Close-up Tekstur Material Infinite Book.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Infinite Book.png', '/produk/kriya/Close-up Tekstur Material Infinite Book.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Infinite Book.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Infinite Book.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Kipas.png', '/produk/kriya/Close-up Tekstur Material Kipas.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Kipas.png', '/produk/kriya/Close-up Tekstur Material Kipas.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Kipas.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Kipas.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Kuda Laut.png', '/produk/kriya/Close-up Tekstur Material Kuda Laut.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Kuda Laut.png', '/produk/kriya/Close-up Tekstur Material Kuda Laut.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Kuda Laut.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Kuda Laut.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Love.png', '/produk/kriya/Close-up Tekstur Material Love.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Love.png', '/produk/kriya/Close-up Tekstur Material Love.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Love.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Love.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Medali.png', '/produk/kriya/Close-up Tekstur Material Medali.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Medali.png', '/produk/kriya/Close-up Tekstur Material Medali.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Medali.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Medali.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Penyu 2.png', '/produk/kriya/Close-up Tekstur Material Penyu 2.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Penyu 2.png', '/produk/kriya/Close-up Tekstur Material Penyu 2.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Penyu 2.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Penyu 2.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Penyu.png', '/produk/kriya/Close-up Tekstur Material Penyu.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Penyu.png', '/produk/kriya/Close-up Tekstur Material Penyu.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Penyu.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Penyu.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Rangkong.png', '/produk/kriya/Close-up Tekstur Material Rangkong.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Rangkong.png', '/produk/kriya/Close-up Tekstur Material Rangkong.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Rangkong.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Rangkong.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Salib 2.png', '/produk/kriya/Close-up Tekstur Material Salib 2.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Salib 2.png', '/produk/kriya/Close-up Tekstur Material Salib 2.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Salib 2.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Salib 2.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Salib.png', '/produk/kriya/Close-up Tekstur Material Salib.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Salib.png', '/produk/kriya/Close-up Tekstur Material Salib.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Salib.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Salib.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Sofa.png', '/produk/kriya/Close-up Tekstur Material Sofa.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Sofa.png', '/produk/kriya/Close-up Tekstur Material Sofa.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Sofa.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Sofa.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Taring.png', '/produk/kriya/Close-up Tekstur Material Taring.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Taring.png', '/produk/kriya/Close-up Tekstur Material Taring.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Taring.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Taring.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Tatakan.png', '/produk/kriya/Close-up Tekstur Material Tatakan.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Tatakan.png', '/produk/kriya/Close-up Tekstur Material Tatakan.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Tatakan.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Tatakan.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Tulisan.png', '/produk/kriya/Close-up Tekstur Material Tulisan.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Tulisan.png', '/produk/kriya/Close-up Tekstur Material Tulisan.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Tulisan.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Tulisan.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Close-up Tekstur Material Yaki.png', '/produk/kriya/Close-up Tekstur Material Yaki.png'),
    gallery = replace(gallery::text, '/produk/Close-up Tekstur Material Yaki.png', '/produk/kriya/Close-up Tekstur Material Yaki.png')::jsonb
WHERE image_url LIKE '%/produk/Close-up Tekstur Material Yaki.png%' OR gallery::text LIKE '%/produk/Close-up Tekstur Material Yaki.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Anjing.png', '/produk/kriya/Flat Lay Katalog Anjing.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Anjing.png', '/produk/kriya/Flat Lay Katalog Anjing.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Anjing.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Anjing.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Arrow Sign.png', '/produk/kriya/Flat Lay Katalog Arrow Sign.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Arrow Sign.png', '/produk/kriya/Flat Lay Katalog Arrow Sign.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Arrow Sign.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Arrow Sign.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Beruang 2.png', '/produk/kriya/Flat Lay Katalog Beruang 2.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Beruang 2.png', '/produk/kriya/Flat Lay Katalog Beruang 2.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Beruang 2.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Beruang 2.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Beruang 3.png', '/produk/kriya/Flat Lay Katalog Beruang 3.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Beruang 3.png', '/produk/kriya/Flat Lay Katalog Beruang 3.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Beruang 3.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Beruang 3.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Beruang 4.png', '/produk/kriya/Flat Lay Katalog Beruang 4.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Beruang 4.png', '/produk/kriya/Flat Lay Katalog Beruang 4.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Beruang 4.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Beruang 4.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Beruang 5.png', '/produk/kriya/Flat Lay Katalog Beruang 5.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Beruang 5.png', '/produk/kriya/Flat Lay Katalog Beruang 5.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Beruang 5.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Beruang 5.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Beruang 6.png', '/produk/kriya/Flat Lay Katalog Beruang 6.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Beruang 6.png', '/produk/kriya/Flat Lay Katalog Beruang 6.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Beruang 6.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Beruang 6.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Beruang.png', '/produk/kriya/Flat Lay Katalog Beruang.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Beruang.png', '/produk/kriya/Flat Lay Katalog Beruang.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Beruang.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Beruang.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Biodigester.png', '/produk/kriya/Flat Lay Katalog Biodigester.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Biodigester.png', '/produk/kriya/Flat Lay Katalog Biodigester.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Biodigester.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Biodigester.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Burung Hantu 2.png', '/produk/kriya/Flat Lay Katalog Burung Hantu 2.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Burung Hantu 2.png', '/produk/kriya/Flat Lay Katalog Burung Hantu 2.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Burung Hantu 2.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Burung Hantu 2.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Burung Hantu.png', '/produk/kriya/Flat Lay Katalog Burung Hantu.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Burung Hantu.png', '/produk/kriya/Flat Lay Katalog Burung Hantu.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Burung Hantu.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Burung Hantu.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Ikan.png', '/produk/kriya/Flat Lay Katalog Ikan.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Ikan.png', '/produk/kriya/Flat Lay Katalog Ikan.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Ikan.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Ikan.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Infinite Book.png', '/produk/kriya/Flat Lay Katalog Infinite Book.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Infinite Book.png', '/produk/kriya/Flat Lay Katalog Infinite Book.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Infinite Book.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Infinite Book.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Kipas.png', '/produk/kriya/Flat Lay Katalog Kipas.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Kipas.png', '/produk/kriya/Flat Lay Katalog Kipas.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Kipas.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Kipas.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Kuda Laut.png', '/produk/kriya/Flat Lay Katalog Kuda Laut.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Kuda Laut.png', '/produk/kriya/Flat Lay Katalog Kuda Laut.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Kuda Laut.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Kuda Laut.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Love.png', '/produk/kriya/Flat Lay Katalog Love.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Love.png', '/produk/kriya/Flat Lay Katalog Love.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Love.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Love.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Medali.png', '/produk/kriya/Flat Lay Katalog Medali.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Medali.png', '/produk/kriya/Flat Lay Katalog Medali.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Medali.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Medali.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Penyu 2.png', '/produk/kriya/Flat Lay Katalog Penyu 2.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Penyu 2.png', '/produk/kriya/Flat Lay Katalog Penyu 2.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Penyu 2.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Penyu 2.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Penyu.png', '/produk/kriya/Flat Lay Katalog Penyu.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Penyu.png', '/produk/kriya/Flat Lay Katalog Penyu.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Penyu.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Penyu.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Rangkong.png', '/produk/kriya/Flat Lay Katalog Rangkong.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Rangkong.png', '/produk/kriya/Flat Lay Katalog Rangkong.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Rangkong.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Rangkong.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Salib 2.png', '/produk/kriya/Flat Lay Katalog Salib 2.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Salib 2.png', '/produk/kriya/Flat Lay Katalog Salib 2.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Salib 2.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Salib 2.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Salib.png', '/produk/kriya/Flat Lay Katalog Salib.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Salib.png', '/produk/kriya/Flat Lay Katalog Salib.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Salib.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Salib.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Sofa.png', '/produk/kriya/Flat Lay Katalog Sofa.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Sofa.png', '/produk/kriya/Flat Lay Katalog Sofa.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Sofa.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Sofa.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Taring.png', '/produk/kriya/Flat Lay Katalog Taring.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Taring.png', '/produk/kriya/Flat Lay Katalog Taring.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Taring.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Taring.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Tatakan.png', '/produk/kriya/Flat Lay Katalog Tatakan.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Tatakan.png', '/produk/kriya/Flat Lay Katalog Tatakan.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Tatakan.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Tatakan.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Tulisan.png', '/produk/kriya/Flat Lay Katalog Tulisan.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Tulisan.png', '/produk/kriya/Flat Lay Katalog Tulisan.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Tulisan.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Tulisan.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Flat Lay Katalog Yaki.png', '/produk/kriya/Flat Lay Katalog Yaki.png'),
    gallery = replace(gallery::text, '/produk/Flat Lay Katalog Yaki.png', '/produk/kriya/Flat Lay Katalog Yaki.png')::jsonb
WHERE image_url LIKE '%/produk/Flat Lay Katalog Yaki.png%' OR gallery::text LIKE '%/produk/Flat Lay Katalog Yaki.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Anjing.png', '/produk/kriya/Lifestyle Anjing.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Anjing.png', '/produk/kriya/Lifestyle Anjing.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Anjing.png%' OR gallery::text LIKE '%/produk/Lifestyle Anjing.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Arrow Sign.png', '/produk/kriya/Lifestyle Arrow Sign.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Arrow Sign.png', '/produk/kriya/Lifestyle Arrow Sign.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Arrow Sign.png%' OR gallery::text LIKE '%/produk/Lifestyle Arrow Sign.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Beruang 2.png', '/produk/kriya/Lifestyle Beruang 2.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Beruang 2.png', '/produk/kriya/Lifestyle Beruang 2.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Beruang 2.png%' OR gallery::text LIKE '%/produk/Lifestyle Beruang 2.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Beruang 3.png', '/produk/kriya/Lifestyle Beruang 3.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Beruang 3.png', '/produk/kriya/Lifestyle Beruang 3.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Beruang 3.png%' OR gallery::text LIKE '%/produk/Lifestyle Beruang 3.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Beruang 4.png', '/produk/kriya/Lifestyle Beruang 4.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Beruang 4.png', '/produk/kriya/Lifestyle Beruang 4.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Beruang 4.png%' OR gallery::text LIKE '%/produk/Lifestyle Beruang 4.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Beruang 5.png', '/produk/kriya/Lifestyle Beruang 5.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Beruang 5.png', '/produk/kriya/Lifestyle Beruang 5.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Beruang 5.png%' OR gallery::text LIKE '%/produk/Lifestyle Beruang 5.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Beruang 6.png', '/produk/kriya/Lifestyle Beruang 6.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Beruang 6.png', '/produk/kriya/Lifestyle Beruang 6.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Beruang 6.png%' OR gallery::text LIKE '%/produk/Lifestyle Beruang 6.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Beruang.png', '/produk/kriya/Lifestyle Beruang.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Beruang.png', '/produk/kriya/Lifestyle Beruang.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Beruang.png%' OR gallery::text LIKE '%/produk/Lifestyle Beruang.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Biodigester.png', '/produk/kriya/Lifestyle Biodigester.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Biodigester.png', '/produk/kriya/Lifestyle Biodigester.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Biodigester.png%' OR gallery::text LIKE '%/produk/Lifestyle Biodigester.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Ikan.png', '/produk/kriya/Lifestyle Ikan.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Ikan.png', '/produk/kriya/Lifestyle Ikan.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Ikan.png%' OR gallery::text LIKE '%/produk/Lifestyle Ikan.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Infinite Book.png', '/produk/kriya/Lifestyle Infinite Book.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Infinite Book.png', '/produk/kriya/Lifestyle Infinite Book.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Infinite Book.png%' OR gallery::text LIKE '%/produk/Lifestyle Infinite Book.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Kipas.png', '/produk/kriya/Lifestyle Kipas.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Kipas.png', '/produk/kriya/Lifestyle Kipas.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Kipas.png%' OR gallery::text LIKE '%/produk/Lifestyle Kipas.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Kuda Laut.png', '/produk/kriya/Lifestyle Kuda Laut.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Kuda Laut.png', '/produk/kriya/Lifestyle Kuda Laut.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Kuda Laut.png%' OR gallery::text LIKE '%/produk/Lifestyle Kuda Laut.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Love.png', '/produk/kriya/Lifestyle Love.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Love.png', '/produk/kriya/Lifestyle Love.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Love.png%' OR gallery::text LIKE '%/produk/Lifestyle Love.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Medali.png', '/produk/kriya/Lifestyle Medali.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Medali.png', '/produk/kriya/Lifestyle Medali.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Medali.png%' OR gallery::text LIKE '%/produk/Lifestyle Medali.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Rangkong.png', '/produk/kriya/Lifestyle Rangkong.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Rangkong.png', '/produk/kriya/Lifestyle Rangkong.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Rangkong.png%' OR gallery::text LIKE '%/produk/Lifestyle Rangkong.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Sofa.png', '/produk/kriya/Lifestyle Sofa.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Sofa.png', '/produk/kriya/Lifestyle Sofa.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Sofa.png%' OR gallery::text LIKE '%/produk/Lifestyle Sofa.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Taring.png', '/produk/kriya/Lifestyle Taring.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Taring.png', '/produk/kriya/Lifestyle Taring.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Taring.png%' OR gallery::text LIKE '%/produk/Lifestyle Taring.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Tatakan.png', '/produk/kriya/Lifestyle Tatakan.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Tatakan.png', '/produk/kriya/Lifestyle Tatakan.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Tatakan.png%' OR gallery::text LIKE '%/produk/Lifestyle Tatakan.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Tulisan.png', '/produk/kriya/Lifestyle Tulisan.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Tulisan.png', '/produk/kriya/Lifestyle Tulisan.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Tulisan.png%' OR gallery::text LIKE '%/produk/Lifestyle Tulisan.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle Yaki.png', '/produk/kriya/Lifestyle Yaki.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle Yaki.png', '/produk/kriya/Lifestyle Yaki.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle Yaki.png%' OR gallery::text LIKE '%/produk/Lifestyle Yaki.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle di Tangan Burung Hantu .png', '/produk/kriya/Lifestyle di Tangan Burung Hantu .png'),
    gallery = replace(gallery::text, '/produk/Lifestyle di Tangan Burung Hantu .png', '/produk/kriya/Lifestyle di Tangan Burung Hantu .png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle di Tangan Burung Hantu .png%' OR gallery::text LIKE '%/produk/Lifestyle di Tangan Burung Hantu .png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle di Tangan Burung Hantu 2.png', '/produk/kriya/Lifestyle di Tangan Burung Hantu 2.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle di Tangan Burung Hantu 2.png', '/produk/kriya/Lifestyle di Tangan Burung Hantu 2.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle di Tangan Burung Hantu 2.png%' OR gallery::text LIKE '%/produk/Lifestyle di Tangan Burung Hantu 2.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle di Tangan Infinite Book.png', '/produk/kriya/Lifestyle di Tangan Infinite Book.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle di Tangan Infinite Book.png', '/produk/kriya/Lifestyle di Tangan Infinite Book.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle di Tangan Infinite Book.png%' OR gallery::text LIKE '%/produk/Lifestyle di Tangan Infinite Book.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle di Tangan Penyu 2.png', '/produk/kriya/Lifestyle di Tangan Penyu 2.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle di Tangan Penyu 2.png', '/produk/kriya/Lifestyle di Tangan Penyu 2.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle di Tangan Penyu 2.png%' OR gallery::text LIKE '%/produk/Lifestyle di Tangan Penyu 2.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle di Tangan Penyu.png', '/produk/kriya/Lifestyle di Tangan Penyu.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle di Tangan Penyu.png', '/produk/kriya/Lifestyle di Tangan Penyu.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle di Tangan Penyu.png%' OR gallery::text LIKE '%/produk/Lifestyle di Tangan Penyu.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle di Tangan Salib 2.png', '/produk/kriya/Lifestyle di Tangan Salib 2.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle di Tangan Salib 2.png', '/produk/kriya/Lifestyle di Tangan Salib 2.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle di Tangan Salib 2.png%' OR gallery::text LIKE '%/produk/Lifestyle di Tangan Salib 2.png%';

UPDATE products
SET image_url = replace(image_url, '/produk/Lifestyle di Tangan Salib.png', '/produk/kriya/Lifestyle di Tangan Salib.png'),
    gallery = replace(gallery::text, '/produk/Lifestyle di Tangan Salib.png', '/produk/kriya/Lifestyle di Tangan Salib.png')::jsonb
WHERE image_url LIKE '%/produk/Lifestyle di Tangan Salib.png%' OR gallery::text LIKE '%/produk/Lifestyle di Tangan Salib.png%';

COMMIT;
