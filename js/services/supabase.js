// ======================================
// SUPABASE GLOBAL CLIENT
// Palavra em Série V9
// ======================================

const SUPABASE_URL = 'https://qmhdbuxomozdczgvpvcc.supabase.co';

const SUPABASE_ANON_KEY = 'sb_publishable_5jVrL8dyVBg0YOfo_q4ppA_yLMOjTz8';

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

// Disponibiliza globalmente
window.supabaseClient = supabaseClient;

console.log("✅ Supabase conectado.");
