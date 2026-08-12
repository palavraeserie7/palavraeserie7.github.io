async function handleLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("message");
    const btn = document.getElementById("login-btn");

    if (!email || !password) {
        msg.innerText = "Preencha todos os campos.";
        msg.style.color = "#ff4d4d";
        return;
    }

    btn.innerText = "Validando...";
    btn.disabled = true;

    try {
        const _db = window.__getInternalDatabaseConnector('M00_ORCHESTRATOR');
        if (!_db) {
            // Modo offline/fallback
            window.location.href = "./dashboard.html";
            return;
        }

        const { error } = await _db.auth.signInWithPassword({ email, password });
        if (error) throw error;

        msg.innerText = "Acesso autorizado! Redirecionando...";
        msg.style.color = "#00cc66";
        setTimeout(() => { window.location.href = "./dashboard.html"; }, 800);
    } catch (e) {
        msg.innerText = "Erro: " + e.message;
        msg.style.color = "#ff4d4d";
        btn.innerText = "Entrar";
        btn.disabled = false;
    }
}
