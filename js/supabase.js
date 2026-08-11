var SUPABASE_URL = "https://qmhdbuxomozdczgvpvcc.supabase.co";
var SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaGRidXhvbW96ZGN6Z3ZwdmNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzNTQ2MjcsImV4cCI6MjA0MDIzMDYyN30.S6v3iX_XvdwMNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzNTQ2MjcsImV4cCI6MjA0MDIzMDYyN30"; 

if (!window.supabaseClientInstance ) {
    window.supabaseClientInstance = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}
var supabase = window.supabaseClientInstance;
