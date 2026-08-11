// Configuração do Supabase
var SUPABASE_URL = "https://qmhdbuxomozdczgvpvcc.supabase.co";
var SUPABASE_KEY = "SUA_ANON_KEY_AQUI"; // <-- COLE SUA CHAVE 'anon public' AQUI

// Previne erro de redeclaração caso o script carregue duas vezes
if (!window.supabaseClientInstance ) {
    window.supabaseClientInstance = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}
var supabase = window.supabaseClientInstance;
