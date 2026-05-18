
const SUPABASE_URL =
  "https://qmhdbuxomozdczgvpvcc.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_5jVrL8dyVBg0YOfo_q4ppA_yLMOjTz8";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

window.supabaseClient = supabase;

export default supabase;
