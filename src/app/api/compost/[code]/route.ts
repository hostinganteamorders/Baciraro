import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("compost_buckets")
    .select("*")
    .eq("code", code)
    .single();
  if (error || !data) {
    return NextResponse.json({ error: "Bucket not found" }, { status: 404 });
  }
  return NextResponse.json({ bucket: data });
}
