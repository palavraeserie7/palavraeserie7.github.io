const authClient = window.supabaseClient;

// ==============================
// CADASTRO
// ==============================

async function fazerCadastro() {

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const msg = document.getElementById('msg');

    if (!email || !password) {
        msg.innerText = "Preencha todos os campos.";
        msg.style.color = "yellow";
        return;
    }

    msg.innerText = "Criando conta...";
    msg.style.color = "white";

    const { error } = await authClient.auth.signUp({
        email,
        password
    });

    if (error) {
        msg.innerText = error.message;
        msg.style.color = "red";
        return;
    }

    msg.innerText = "Conta criada com sucesso!";
    msg.style.color = "#00ff88";
}

// ==============================
// LOGIN
// ==============================

async function fazerLogin() {

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const msg = document.getElementById('msg');

    if (!email || !password) {
        msg.innerText = "Informe email e senha.";
        msg.style.color = "yellow";
        return;
    }

    msg.innerText = "Entrando...";
    msg.style.color = "white";

    const { error } = await authClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        msg.innerText = error.message;
        msg.style.color = "red";
        return;
    }

    msg.innerText = "Login realizado!";
    msg.style.color = "#00ff88";

    setTimeout(() => {
        window.location.href = "../pages/dashboard.html";
    }, 1000);
}
