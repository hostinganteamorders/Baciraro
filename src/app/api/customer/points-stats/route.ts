import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";

export async function GET() {
  const supabase = createAdminClient();

  const [leaderboardRes, aggregateRes] = await Promise.all([
    supabase
      .from("customers")
      .select("id, name, photo_url, total_points")
      .order("total_points", { ascending: false })
      .limit(10),
    supabase.from("points_transactions").select("points"),
  ]);

  const leaderboard = leaderboardRes.data || [];
  const totalPointsDistributed = (aggregateRes.data || []).reduce((sum, t) => sum + (t.points || 0), 0);

  return NextResponse.json({ leaderboard, totalPointsDistributed });
}
