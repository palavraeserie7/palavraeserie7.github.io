const SUPABASE_URL =
  "https://qmhdbuxomozdczgvpvcc.supabase.co";

const SUPABASE_KEY =
  "SUA_CHAVE_PUBLICA_AQUI";

const supabase =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

window.supabaseClient = supabase;

export default supabase;
