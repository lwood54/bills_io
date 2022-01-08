import { createClient } from '@supabase/supabase-js';

const SB_URL = window.ENV.SB_URL as string;
const SB_PUBLIC_ANON_KEY = window.ENV.SB_ANON_KEY as string;

export const supabaseClient = createClient(SB_URL, SB_PUBLIC_ANON_KEY);
