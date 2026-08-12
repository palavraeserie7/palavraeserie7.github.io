async function handleLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("message");
    const btn = document.getElementById("login-btn");
    if (!email || !password) { msg.innerText = "Preencha todos os campos."; return; }
    btn.innerText = "Validando..."; btn.disabled = true;
    try {
        const _db = window.__getInternalDatabaseConnector('M00_ORCHESTRATOR');
        const { error } = await _db.auth.signInWithPassword({ email, password });
        if (error) throw error;
        msg.innerText = "Acesso autorizado!";
        setTimeout(() => { window.location.href = "./dashboard.html"; }, 1000);
    } catch (e) {
        msg.innerText = "Erro: " + e.message;
        btn.innerText = "Entrar"; btn.disabled = false;
    }
}
