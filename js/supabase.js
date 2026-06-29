
const SUPABASE_URL = "https://qmhdbuxomozdczgvpvcc.supabase.co";
const SUPABASE_KEY = "SUA_ANON_KEY_AQUI";

export const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
