const authClient = supabaseClient;

async function fazerCadastro() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('msg');

    if (!email || !password) {
        msg.innerText = "Preencha todos os campos!";
        msg.style.color = "yellow";
        return;
    }

    msg.innerText = "Criando sua conta grátis...";
    msg.style.color = "white";

    const { data, error } = await authClient.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        msg.style.color = "red";
        msg.innerText = "Erro ao cadastrar: " + error.message;
    } else {
        msg.style.color = "green";
        msg.innerText = "Conta criada! Verifique seu e-mail para confirmar.";
    }
}

async function fazerLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('msg');

    msg.innerText = "Entrando...";
    msg.style.color = "white";

    const { data, error } = await authClient.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        msg.style.color = "red";
        msg.innerText = "Erro: " + error.message;
    } else {
        msg.style.color = "green";
        msg.innerText = "Sucesso! Entrando...";
        
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
    }
}
