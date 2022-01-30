import type { SupabaseScript } from './lib/supabase';

declare global {
  interface Window {
    ENV: {
      SOME_SECRET: string;
      SB_URL: string;
      SB_ANON_KEY: string;
    };
    supabase?: SupabaseScript;
  }
}

export {};
