import { createClient } from '@supabase/supabase-js';

const SB_URL = process.env.SB_URL as string;
const SB_ANON_KEY = process.env.SB_ANON_KEY as string;

export const supabase = createClient(SB_URL, SB_ANON_KEY);
