async function verificarAcesso() {

    const supabase = window.supabaseClient;

    const { data } = await supabase.auth.getUser();

    const user = data?.user;

    if (!user) {
        window.location.href = "/pages/login.html";
        return;
    }

    document.getElementById("welcome-msg").innerText =
        "Bem-vindo, " + user.email;

    document.getElementById("user-plan").innerText =
        "Plano: FREE";

    window.userPlan = "FREE";

    if (typeof carregarLivros === "function") {
        carregarLivros();
    }
}

verificarAcesso();
