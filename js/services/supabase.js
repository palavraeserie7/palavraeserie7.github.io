// js/services/supabase.js
const supabaseUrl = 'SUA_URL_AQUI';
const supabaseKey = 'SUA_CHAVE_ANONIMA_AQUI';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Torna o supabase disponível para outros scripts
window.supabaseClient = supabase; 
