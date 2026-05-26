import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase credentials missing! Check your .env file.");
}

export const supabase = createClient(
  supabaseUrl || "https://hkxlvknfrbpzddnluywu.supabase.co", 
  supabaseKey || "sb_publishable_zBd-ou5O0x4YsuxZGSzFtg_A_Eh4ato"
);
