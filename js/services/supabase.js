// Configuração real do seu projeto Supabase
const SUPABASE_URL = "https://qmhdbuxomozdczgvpvcc.supabase.co";

// ⚠️ IMPORTANTE: Substitua o texto abaixo pela chave "anon" "public" real que você copiou do seu painel em Project Settings > API
const SUPABASE_KEY = "COLE_AQUI_A_SUA_CHAVE_ANON_REAL";

// Inicializa o cliente usando o objeto do script do CDN
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Expõe para o escopo global e exporta como módulo para o arquivo de manutenção
window.supabaseClient = supabaseClient;
export const supabase = supabaseClient;

console.log("Supabase iniciado com sucesso!");
