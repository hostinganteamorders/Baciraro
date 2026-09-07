import { redirect } from "next/navigation";
import { requireAdmin } from "@/utils/admin";
import { createAdminClient } from "@/utils/supabase/admin";
import InvoicePrint from "@/app/admin/(panel)/payouts/InvoicePrint";

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");

  const { id } = await params;
  const supabase = createAdminClient();

  const { data: payout } = await supabase
    .from("payouts")
    .select("*")
    .eq("id", id)
    .single();

  if (!payout) redirect("/admin/payouts");

  const { data: members } = await supabase
    .from("payout_members")
    .select("name, contribution_percent, amount, tugas")
    .eq("payout_id", id)
    .order("contribution_percent", { ascending: false });

  return (
    <>
      <div className="no-print flex items-center justify-between mb-6 max-w-2xl mx-auto">
        <button onClick={() => window.print()}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#C44A3A] to-[#D97A2B] text-white font-semibold text-sm hover:opacity-90 transition flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Cetak / Simpan PDF
        </button>
        <a href="/admin/payouts" className="text-sm text-white/50 hover:text-white transition">
          Kembali
        </a>
      </div>
      <InvoicePrint payout={{ ...payout, members: members ?? [] }} />
    </>
  );
}
