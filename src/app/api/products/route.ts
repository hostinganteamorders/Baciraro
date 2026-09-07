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

export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("id", { ascending: false });
  if (error) {
    return NextResponse.json({ products: [], error: error.message });
  }
  return NextResponse.json({ products: data || [] });
}

export async function POST(req: NextRequest) {
  const user = getUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug, title, description, category, story, materials, total_plastic_kg, image_url, gallery, artists, weight_g, print_time_min, variants } = await req.json();
  const supabase = createAdminClient();

  let parsedVariants = variants;
  if (typeof variants === "string") {
    try {
      parsedVariants = JSON.parse(variants || "[]");
    } catch {
      parsedVariants = [];
    }
  }

  // Compute next ID to work around sequence issue
  const { data: maxData } = await supabase
    .from("products")
    .select("id")
    .order("id", { ascending: false })
    .limit(1);

  const nextId = (maxData?.[0]?.id ?? 0) + 1;

  const { data, error } = await supabase
    .from("products")
    .insert({
      id: nextId,
      slug, title, description, category,
      story: story || "",
      materials: materials || [],
      total_plastic_kg: total_plastic_kg || 0,
      image_url: image_url || "",
      gallery: gallery || [],
      artists: artists || [],
      weight_g: weight_g ?? null,
      print_time_min: print_time_min ?? null,
      variants: parsedVariants || [],
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ id: data.id }, { status: 201 });
}
