
import supabase
from "../core/supabase.js";

async function fazerLogin() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const msg =
        document.getElementById("msg");

    msg.style.color = "white";
    msg.innerText = "Entrando...";

    const { error } =
        await supabase.auth
        .signInWithPassword({
            email,
            password
        });

    if (error) {

        msg.style.color = "red";
        msg.innerText = error.message;

        return;
    }

    msg.style.color = "#00ff88";
    msg.innerText = "Acesso liberado";

    setTimeout(() => {

        window.location.replace(
            "/pages/dashboard.html"
        );

    }, 800);
}

async function fazerCadastro() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const msg =
        document.getElementById("msg");

    msg.innerText = "Criando conta...";

    const { error } =
        await supabase.auth.signUp({
            email,
            password
        });

    if (error) {

        msg.style.color = "red";
        msg.innerText = error.message;

        return;
    }

    msg.style.color = "#00ff88";

    msg.innerText =
      "Conta criada! Verifique o email.";
}

window.fazerLogin = fazerLogin;
window.fazerCadastro = fazerCadastro;
