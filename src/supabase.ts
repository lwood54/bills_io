import { createClient } from "@supabase/supabase-js";
import.meta.env.VITE_SB_URL;
import.meta.env.VITE_SB_PUBLIC_ANON_KEY;

const SB_URL = import.meta.env.VITE_SB_URL as string;
const SB_PUBLIC_ANON_KEY = import.meta.env.VITE_SB_PUBLIC_ANON_KEY as string;

export const supabase = createClient(SB_URL, SB_PUBLIC_ANON_KEY);
