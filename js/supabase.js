(function() {
    const SUPABASE_URL = "https://qmhdbuxomozdczgvpvcc.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaGRidXhvbW96ZGN6Z3ZwdmNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0NDg3NzEsImV4cCI6MjA5NDAyNDc3MX0.AElEyUr0J57k0gm6sjRPawq6Iipbuv-eVrRjUU8TlZQ";
    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY );
    window.__getInternalDatabaseConnector = function(caller) {
        if (caller === 'M00_ORCHESTRATOR') return client;
        return null;
    };
})();
