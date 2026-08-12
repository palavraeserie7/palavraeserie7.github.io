
async function handleLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("message");
    if (!email || !password) { msg.innerText = "Preencha todos os campos."; return; }
    try {
        const _db = window.__getInternalDatabaseConnector('M00_ORCHESTRATOR');
        const { error } = await _db.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = "./dashboard.html";
    } catch (e) { msg.innerText = "Erro: " + e.message; }
}
