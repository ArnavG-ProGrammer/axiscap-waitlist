import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("[AXISCAP] Missing env var: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
    return NextResponse.json({ count: 0 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { count, error } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    return NextResponse.json({ count: count ?? 0 });
  } catch (err) {
    console.error("[AXISCAP] Stats error:", err);
    return NextResponse.json({ count: 0 });
  }
}
