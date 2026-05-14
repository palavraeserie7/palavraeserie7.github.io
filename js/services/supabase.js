// ======================================
// SUPABASE GLOBAL CLIENT
// Palavra em Série V9
// ======================================

const SUPABASE_URL = 'https://qmhdbuxomozdczgvpvcc.supabase.co';

// SUBSTITUA PELA NOVA CHAVE PUBLICÁVEL
const SUPABASE_ANON_KEY = 'COLE_SUA_NOVA_CHAVE_AQUI';

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

// Disponibiliza globalmente
window.supabaseClient = supabaseClient;

console.log("✅ Supabase conectado.");
