/**
 * SUPABASE CONNECTOR V8.2 - ARQUITETURA MASTER
 */
var SUPABASE_URL = "https://qmhdbuxomozdczgvpvcc.supabase.co";
var SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaGRidXhvbW96ZGN6Z3ZwdmNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0NDg3NzEsImV4cCI6MjA5NDAyNDc3MX0.AElEyUr0J57k0gm6sjRPawq6Iipbuv-eVrRjUU8TlZQ";

if (!window.supabaseClientInstance ) {
    window.supabaseClientInstance = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}
// O objeto 'supabase' fica disponível para o M00 usar internamente
var supabase = window.supabaseClientInstance;
