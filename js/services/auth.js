
async function fazerLogin() {

    const email =
        document.getElementById(
            "email"
        ).value;

    const password =
        document.getElementById(
            "password"
        ).value;

    const msg =
        document.getElementById(
            "msg"
        );

    msg.innerText = "Entrando...";

    const { error } =
        await window.supabaseClient
        .auth
        .signInWithPassword({
            email,
            password
        });

    if (error) {

        msg.style.color = "red";
        msg.innerText =
            "Login inválido";

        return;
    }

    msg.style.color = "#00ff88";

    msg.innerText =
        "Acesso liberado";

    setTimeout(() => {

        window.location.href =
            "/pages/dashboard.html";

    }, 1000);
}

window.fazerLogin = fazerLogin;
