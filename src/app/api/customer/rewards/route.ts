import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";

export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("rewards")
    .select("*")
    .order("cost_points", { ascending: true });
  if (error) {
    return NextResponse.json({ rewards: [], error: error.message });
  }
  return NextResponse.json({ rewards: data || [] });
}
