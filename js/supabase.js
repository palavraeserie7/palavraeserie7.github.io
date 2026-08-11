// Configuração do Supabase
var SUPABASE_URL = "https://qmhdbuxomozdczgvpvcc.supabase.co";
var SUPABASE_KEY = "sb_publishable_5jVrL8dyVBg0YOfo_q4ppA_yLMOjTz8"; // <-- COLE SUA CHAVE 'anon public' AQUI

// Previne erro de redeclaração caso o script carregue duas vezes
if (!window.supabaseClientInstance ) {
    window.supabaseClientInstance = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}
var supabase = window.supabaseClientInstance;
