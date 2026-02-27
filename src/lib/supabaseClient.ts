import { createClient } from "@jsr/supabase__supabase-js";
import { projectId, publicAnonKey } from "../utils/supabase/info";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? `https://${projectId}.supabase.co`;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
