// ======================================
// AUTH SYSTEM
// Palavra em Série
// ======================================

const authClient = window.supabaseClient;

// ======================================
// CADASTRO
// ======================================

async function fazerCadastro() {

    const email = document.getElementById('email').value.trim();

    const password = document.getElementById('password').value.trim();

    const msg = document.getElementById('msg');

    if (!email || !password) {

        msg.style.color = "orange";

        msg.innerText = "Preencha email e senha.";

        return;
    }

    msg.style.color = "white";

    msg.innerText = "Criando conta...";

    const { data, error } = await authClient.auth.signUp({

        email,
        password

    });

    if (error) {

        if (error.message.includes("already registered")) {

            msg.style.color = "yellow";

            msg.innerText = "Usuário já cadastrado. Faça login.";

            return;
        }

        msg.style.color = "red";

        msg.innerText = error.message;

        return;
    }

    msg.style.color = "#00ff88";

    msg.innerText = "Conta criada com sucesso!";
}

// ======================================
// LOGIN
// ======================================

async function fazerLogin() {

    const email = document.getElementById('email').value.trim();

    const password = document.getElementById('password').value.trim();

    const msg = document.getElementById('msg');

    if (!email || !password) {

        msg.style.color = "orange";

        msg.innerText = "Preencha email e senha.";

        return;
    }

    msg.style.color = "white";

    msg.innerText = "Entrando...";

    const { data, error } = await authClient.auth.signInWithPassword({

        email,
        password

    });

    if (error) {

        msg.style.color = "red";

        msg.innerText = "Email ou senha inválidos.";

        console.error(error);

        return;
    }

    msg.style.color = "#00ff88";

    msg.innerText = "Login realizado!";

    // REDIRECIONA
    setTimeout(() => {

        window.location.href = "../pages/dashboard.html";

    }, 1000);
}

// GLOBAL
window.fazerCadastro = fazerCadastro;
window.fazerLogin = fazerLogin;
