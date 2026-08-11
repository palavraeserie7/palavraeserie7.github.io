async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    if (!email || !password) {
        msg.innerText = "Por favor, preencha todos os campos.";
        return;
    }

    msg.innerText = "Validando acesso...";
    msg.style.color = "white";

    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        msg.innerText = "Erro: " + error.message;
        msg.style.color = "#ff4444";
        return;
    }

    window.location.href = "./dashboard.html";
}
