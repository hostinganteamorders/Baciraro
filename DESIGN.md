---
name: Baciraro Sustainability Platform
description: Wajah digital ekosistem pengelolaan sampah terintegrasi berbasis circular economy dan teknologi.
colors:
  primary: "#f87171"
  neutral-bg: "#000000"
  neutral-muted-bg: "#0c0f0c"
  neutral-text: "#fafafa"
  neutral-muted-text: "#a1a1aa"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)"
    fontWeight: 300
    lineHeight: 1.15
  body:
    fontFamily: "Almarai, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
rounded:
  sm: "8px"
  md: "16px"
  lg: "32px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  button-primary:
    backgroundColor: "#ffffff"
    textColor: "#000000"
    rounded: "9999px"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "#f4f4f5"
  button-ghost:
    backgroundColor: "rgba(255,255,255,0.05)"
    textColor: "#ffffff"
    rounded: "9999px"
    padding: "14px 24px"
---

# Design System: Baciraro

## 1. Overview

**Creative North Star: "The Green Observatory"**

"The Green Observatory" adalah metafora ruang gelap premium masa depan yang dirancang untuk memvisualisasikan ekologi sirkular dan aksi lingkungan secara modern, presisi, dan meyakinkan. Mengabaikan pendekatan konvensional "hijau mentah", sistem ini membingkai kepedulian lingkungan dalam nuansa midnight gelap pekat dengan pendaran hijau emerald tipis dan aksen sunset coral (#f87171). Desain ini mencerminkan pertemuan yang indah antara kearifan lokal Minahasa dengan rekayasa digital presisi tinggi dari *ORDERS*.

Sistem ini secara tegas menolak template SaaS steril yang kosong makna, tata letak korporat kaku tanpa emosi, elemen futuristik berlebihan yang mengalienasi masyarakat, serta penggunaan ornamen daun atau ikon daur ulang generik yang klise.

**Key Characteristics:**
- **Midnight Ekologis**: Latar belakang hitam pekat pekat dengan gradasi hijau hutan mendalam yang menyimbolkan alam misterius yang berwibawa.
- **Grainy Tactility**: Tekstur kertas/pasir mikro (.bg-noise dan .noise-overlay) untuk memberikan kedalaman taktil fisik yang mewah.
- **Razor Sharp Data Lines**: Pembatas garis transparan super tipis (1px border-white/5) untuk memberikan kesan akurasi digital tinggi.
- **Grounded Editorial Pairing**: Perpaduan huruf serif miring yang anggun dengan huruf sans-serif geometris yang bersih dan kokoh.

---

## 2. Colors

Sistem warna merepresentasikan filosofi "The Green Observatory"—gelap pekat namun dihujani pendaran cahaya ekologis yang tepercaya.

### Primary
- **Sunset Coral** (#f87171 / oklch(69.85% 0.203 16.5)): Aksen api ksatria Kawasaran. Digunakan secara hemat (≤10%) hanya untuk label penting, indikator aktif, dan aksen navigasi mikro guna menarik fokus visual.

### Neutral
- **Midnight Black** (#000000 / oklch(0% 0 0)): Latar belakang dasar mutlak yang bersih, melambangkan malam pekat, kesunyian observatorium, dan kedalaman tanah.
- **Deep Forest Charcoal** (#0c0f0c / oklch(6.4% 0.006 142)): Warna blok kontainer, kartu informasi, dan header navigasi. Terbentuk dari warna hitam yang dinodai pigmen hijau pinus sangat tipis.
- **Warm Alabaster White** (#fafafa / oklch(98% 0.002 286)): Warna teks utama, judul besar, dan tombol primer guna memberikan kontras dan keterbacaan tingkat tinggi.
- **Zinc Silver Grey** (#a1a1aa / oklch(69.8% 0.003 286)): Warna teks sekunder, deskripsi paragraf, pembatas garis, dan ikon yang tidak aktif.

### Named Rules
**The 10% Accent Rule.** Penggunaan Sunset Coral (#f87171) sebagai aksen wajib dibatasi maksimal 10% dari luas visual layar mana pun. Rarity adalah kunci keanggunan.

**The Tinted Neutral Rule.** Tidak boleh ada warna abu-abu atau hitam netral murni di luar Midnight Black. Semua warna permukaan menengah (cards/borders) wajib dicampur dengan chroma tipis hijau hutan (oklch chroma 0.005–0.01) agar terkesan bernyawa.

---

## 3. Typography

Tipografi menyandingkan emosi warisan lokal dengan ketegasan sistem digital modular.

**Display Font:** Instrument Serif (dengan fallback Georgia, serif)
**Body Font:** Almarai (dengan fallback -apple-system, BlinkMacSystemFont, sans-serif)

**Character:**
Instrument Serif miring menghadirkan emosi hangat, sisi humanis, dan kedalaman budaya. Sementara Almarai yang geometris memancarkan presisi teknis, kejelasan informasi, dan kredibilitas data terstruktur.

### Hierarchy
- **Display** (font-serif, 300, clamp(2.5rem, 7vw, 4.5rem), line-height: 1.15): Digunakan untuk judul besar hero, kutipan editorial miring, atau penegas visual utama.
- **Headline** (font-sans, 400, 2rem/2.5rem, line-height: 1.25): Digunakan untuk judul section utama yang membutuhkan ketegasan.
- **Title** (font-sans, 500, 1.25rem, line-height: 1.35): Digunakan untuk sub-judul kartu, nama entitas ekosistem, atau sub-section.
- **Body** (font-sans, 400, 1rem, line-height: 1.625): Digunakan untuk semua teks paragraf deskripsi. Panjang baris wajib dibatasi maksimal (65–75ch) demi kenyamanan pemindaian mata.
- **Label** (font-sans, 600, 0.75rem, letter-spacing: 0.28em, uppercase): Digunakan untuk pill kategorial (*Section Labels*), indikator kecil, dan judul meta-data.

### Named Rules
**The Editorial Slope Rule.** Setiap judul halaman utama wajib memiliki setidaknya satu baris kata miring (*italicized serif*) dari Instrument Serif untuk melunakkan ketegasan sans-serif di sekelilingnya.

---

## 4. Elevation

Sistem visual ini menganut pendekatan **Flat & Tonal**. Tidak menggunakan bayangan jatuh (*drop shadow*) berat yang kaku, melainkan mengandalkan lapisan warna kaca gelap transparan, pembatas garis presisi tipis, dan efek pendaran cahaya (*tonal glow*) dari belakang permukaan.

### Named Rules
**The Glass Surface Rule.** Kedalaman dimensi dibentuk menggunakan kontainer semi-transparan `bg-zinc-900/20` dengan filter `backdrop-blur-sm` dan garis tepi tipis `border-white/5`.

**The Ambient Spot Rule.** Efek melayang direpresentasikan oleh gradien lingkaran radial lembut (`radial-gradient`) di latar belakang yang memberikan ilusi pendaran cahaya lembut di belakang komponen kaca.

---

## 5. Components

Setiap komponen interaktif dirancang dengan karakter **Refined & Restrained**—sangat bersih, rapi, fungsional, dan menghindari ornamen dekoratif berlebih.

### Buttons
- **Shape:** Bulat kapsul sempurna (`rounded-full`).
- **Primary:** Latar belakang solid Warm Alabaster (`bg-white text-black px-6 py-3.5 text-sm font-semibold hover:bg-zinc-100 transition-all`). Tombol dibekali mikro-interaksi perbesaran skala halus (`hover:scale-102`).
- **Secondary / Ghost:** Latar belakang kaca tipis (`border border-white/10 bg-white/5 text-white hover:bg-white/10 px-6 py-3.5 text-sm font-semibold transition-all`).

### Cards / Containers
- **Corner Style:** Sudut tumpul melengkung anggun (`rounded-[2rem]` hingga `rounded-[3rem]`).
- **Background:** Kombinasi kaca gelap (`bg-zinc-900/20 shadow-xl backdrop-blur-sm`).
- **Border:** Garis pembatas tipis (`border border-white/5`).
- **Internal Padding:** Spacing konsisten (`p-6` hingga `p-8` bergantung pada skala kontainer).

### Inputs / Fields
- **Style:** Garis pembatas tipis (`border border-white/10 bg-zinc-950/40 rounded-2xl px-5 py-4 text-white text-sm`).
- **Focus State:** Garis batas berubah menjadi putih transparan (`border-white/30`) dengan pendaran latar belakang halus, tanpa memunculkan outline tajam.

### Navigation
- **Style:** Navigasi atas yang melekat (*sticky header*) menggunakan latar belakang semi-transparan (`bg-black/40 border-b border-white/5 backdrop-blur-xl`). Tautan menu menggunakan warna `text-zinc-400` yang bertransisi halus ke `text-white` saat diarahkan kursor.

---

## 6. Do's and Don'ts

### Do:
- **Do** gunakan pembatas garis 1px semi-transparan (`border-white/5`) untuk menegaskan pemisahan data di atas latar belakang hitam.
- **Do** batasi panjang paragraf agar tidak melebihi 75 karakter per baris (`max-w-3xl` atau `max-w-2xl`).
- **Do** sisipkan partikel grain (.bg-noise) secara halus di area latar belakang besar agar tidak terlihat hampa secara visual.
- **Do** pastikan tombol interaktif memiliki kurva perlambatan natural eksponensial saat kursor diarahkan (*ease-out transition*).

### Don't:
- **Don't** gunakan gambar daun hijau mentah atau ikon daur ulang generik/klise yang terkesan murahan dan tidak profesional.
- **Don't** gunakan bayangan gelap hitam pekat (*heavy shadows*) yang kaku di atas komponen kartu; gunakan tonal layering dan border-white/5 sebagai gantinya.
- **Don't** gunakan gradasi warna teks multi-warna (*gradient text*) untuk judul utama; pertahankan solid Warm Alabaster White untuk keanggunan.
- **Don't** letakkan aksen border kiri/kanan berwarna tebal (side-stripe accents) pada kartu atau kontainer informasi.
- **Don't** biarkan Orders terlihat lebih mendominasi daripada Baciraro di halaman utama; Orders harus diposisikan secara konsisten sebagai infrastruktur penggerak di balik layar.
