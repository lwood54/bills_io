import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  "https://urzvikuoeetdfchstylv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTk2MjMwOSwiZXhwIjoxOTU1NTM4MzA5fQ.FhEk5TGQT-h3f5IwQigWlTN5S95DODNizF7zNZ5Fk4E",
  {
    fetch: fetch.bind(globalThis),
  }
);
