// ================================
// SUPABASE CLIENT GLOBAL
// Palavra em Série V9
// ================================

const SUPABASE_URL = 'SUA_URL_AQUI';
const SUPABASE_ANON_KEY = 'SUA_CHAVE_ANONIMA_AQUI';

// Cria cliente Supabase corretamente
const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

// Disponibiliza globalmente
window.supabaseClient = supabaseClient;

console.log("✅ Supabase conectado.");
