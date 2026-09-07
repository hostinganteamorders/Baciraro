import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 8MB)" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;

  const supabase = createAdminClient();

  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketName = "referensi";
  const exists = buckets?.some((b) => b.name === bucketName);
  if (!exists) {
    await supabase.storage.createBucket(bucketName, { public: true });
  }

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(`uploads/referensi/${filename}`, buffer, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(data.path);

  return NextResponse.json({ url: urlData.publicUrl });
}