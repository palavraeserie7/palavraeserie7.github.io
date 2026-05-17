const SUPABASE_URL =
"https://SEU-PROJETO.supabase.co";

const SUPABASE_KEY =
"SUA_CHAVE";

const supabaseClient =
window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

window.supabaseClient = supabaseClient;

console.log("Supabase iniciado");
