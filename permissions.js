async function verificarAcesso() {

    try {

        const supabase = window.supabaseClient;

        if (!supabase) return;

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            window.location.href = "login.html";
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

    } catch (e) {
        console.error("Erro:", e);

        document.body.innerHTML = `
            <h2 style="color:red;text-align:center;">
                Erro no dashboard
            </h2>
        `;
    }
}

verificarAcesso();
