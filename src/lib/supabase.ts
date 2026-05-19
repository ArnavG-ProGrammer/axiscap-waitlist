import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) console.error("[AXISCAP] Missing env var: NEXT_PUBLIC_SUPABASE_URL");
if (!supabaseKey) console.error("[AXISCAP] Missing env var: NEXT_PUBLIC_SUPABASE_ANON_KEY");

export const supabase = createClient(supabaseUrl ?? "", supabaseKey ?? "");
