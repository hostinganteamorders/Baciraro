import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createAdminClient } from "@/utils/supabase/admin";

export async function POST() {
  const supabase = createAdminClient();
  const results: string[] = [];

  const { data: oldQrs } = await supabase.from("qr_codes").select("id").like("code", "seed-%");
  if (oldQrs && oldQrs.length > 0) {
    const ids = oldQrs.map((q) => q.id);
    await supabase.from("points_transactions").delete().in("qr_code_id", ids);
    await supabase.from("qr_codes").delete().in("id", ids);
    results.push(`Cleaned ${ids.length} old seed claims`);
  }

  const { data: members } = await supabase
    .from("team_members")
    .select("name, photo_url, division")
    .neq("name", "Marlon")
    .limit(10);

  if (!members || members.length === 0) {
    return NextResponse.json({ error: "No team members found" }, { status: 404 });
  }

  const { data: products } = await supabase
    .from("products")
    .select("slug, title, points_per_scan")
    .eq("is_active", true);

  if (!products || products.length === 0) {
    return NextResponse.json({ error: "No products found" }, { status: 404 });
  }

  const hashedPassword = bcrypt.hashSync("seed123", 10);

  interface SeedCustomer {
    id: number;
    name: string;
    photo_url: string;
  }
  const customers: SeedCustomer[] = [];

  for (const m of members) {
    const email = `${m.name.toLowerCase().replace(/\s+/g, ".")}@baciraro.id`;

    const { data: existing } = await supabase
      .from("customers")
      .select("id, name, photo_url, total_points")
      .eq("email", email)
      .single();

    if (existing) {
      await supabase.from("customers").update({ total_points: 0 }).eq("id", existing.id);
      customers.push({ id: existing.id, name: existing.name, photo_url: existing.photo_url || "" });
      results.push(`Reset: ${m.name}`);
      continue;
    }

    const { data: newCust, error } = await supabase
      .from("customers")
      .insert({ email, password: hashedPassword, name: m.name, phone: "08123456789", photo_url: m.photo_url || "", total_points: 0 })
      .select("id, name, photo_url")
      .single();

    if (error || !newCust) {
      results.push(`Failed: ${m.name} — ${error?.message}`);
      continue;
    }

    customers.push({ id: newCust.id, name: newCust.name, photo_url: newCust.photo_url || "" });
    results.push(`Created: ${m.name}`);
  }

  const shuffledProducts = [...products].sort(() => Math.random() - 0.5);

  const assignments: { customerIdx: number; product: typeof products[0] }[] = [];

  for (let pi = 0; pi < shuffledProducts.length; pi++) {
    assignments.push({ customerIdx: pi % customers.length, product: shuffledProducts[pi] });
  }

  assignments.sort(() => Math.random() - 0.5);

  const reviewTexts = [
    "Produknya keren banget, cocok buat hadiah!",
    "Kualitasnya bagus, ramah lingkungan.",
    "Desainnya unik dan menarik, suka banget!",
    "Mantap! Bahannya kuat dan nyaman dipakai.",
    "Sangat puas dengan produk ini, recomended!",
    "Lumayan untuk oleh-oleh, unik dan beda.",
    "Berkualitas tinggi, puas sekali dengan pembelian ini.",
    "Produk daur ulang yang estetik, keren!",
    "Sudah beli beberapa kali, selalu满意.",
    "Pengiriman cepat, produk sesuai foto, terima kasih Baciraro!",
    "Bahan tebal dan kokoh, tidak mudah rusak.",
    "Worth it banget, dapat produk ramah lingkungan dengan harga terjangkau.",
  ];

  const pointsByCustomer = new Map<number, number>();

  for (const a of assignments) {
    const c = customers[a.customerIdx];
    const p = a.product;
    const qrCode = `seed-${c.id}-${p.slug}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const points = (p as any).points_per_scan || 10;

    const claimedAt = new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000);
    const reviewedAt = new Date(claimedAt.getTime() + Math.random() * 3 * 24 * 60 * 60 * 1000);
    const reviewText = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
    const reviewRating = 5;

    const { data: qr, error: qrErr } = await supabase
      .from("qr_codes")
      .insert({
        code: qrCode,
        product_slug: p.slug,
        buyer_name: c.name,
        buyer_phone: "08123456789",
        customer_id: c.id,
        claimed_at: claimedAt.toISOString(),
        review_text: reviewText,
        review_rating: reviewRating,
        reviewed_at: reviewedAt.toISOString(),
      })
      .select("id")
      .single();

    if (qrErr || !qr) {
      results.push(`QR fail: ${c.name}/${p.slug} — ${qrErr?.message}`);
      continue;
    }

    const { error: txErr } = await supabase
      .from("points_transactions")
      .insert({ customer_id: c.id, qr_code_id: qr.id, points, description: `Pembelian ${p.title}` });

    if (txErr) {
      results.push(`Points fail: ${c.name}/${p.title} — ${txErr.message}`);
      continue;
    }

    pointsByCustomer.set(c.id, (pointsByCustomer.get(c.id) || 0) + points);
    results.push(`${c.name} → ${p.title} (+${points})`);
  }

  for (const [id, pts] of pointsByCustomer) {
    await supabase.from("customers").update({ total_points: pts }).eq("id", id);
  }

  return NextResponse.json({ ok: true, results });
}
