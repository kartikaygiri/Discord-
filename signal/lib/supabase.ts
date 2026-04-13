import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Client-side singleton (browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client (uses service role key for admin operations)
export function createServerClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? supabaseAnonKey;
  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });
}
