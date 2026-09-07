import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createAdminClient } from "@/utils/supabase/admin";

const SECRET = process.env.JWT_SECRET || "baciraro-secret-dev";

function getUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, SECRET) as { id: number; username: string; name: string };
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createAdminClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const user = getUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const { title, description, category, story, materials, total_plastic_kg, image_url, gallery, artists, is_active, weight_g, print_time_min, variants } = await req.json();
  const supabase = createAdminClient();

  let parsedVariants = variants;
  if (typeof variants === "string") {
    try {
      parsedVariants = JSON.parse(variants || "[]");
    } catch {
      parsedVariants = [];
    }
  }

  const { error } = await supabase
    .from("products")
    .update({
      title, description, category,
      story: story || "",
      materials: materials || [],
      total_plastic_kg: total_plastic_kg || 0,
      image_url: image_url || "",
      gallery: gallery || [],
      artists: artists || [],
      is_active: is_active ?? true,
      weight_g: weight_g ?? null,
      print_time_min: print_time_min ?? null,
      variants: parsedVariants || [],
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const user = getUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const supabase = createAdminClient();
  await supabase.from("products").delete().eq("slug", slug);
  return NextResponse.json({ ok: true });
}
