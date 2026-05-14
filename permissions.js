// ================================
// ACCESS FIX TOTAL (ESTÁVEL)
// ================================

window.addEventListener("DOMContentLoaded", async () => {

    try {

        const supabase = window.supabaseClient;

        if (!supabase) {
            console.error("Supabase não carregou");
            return;
        }

        const { data, error } = await supabase.auth.getUser();

        const user = data?.user;

        if (error) console.error(error);

        // NÃO LOGADO
        if (!user) {
            window.location.href = "/pages/login.html";
            return;
        }

        // ELEMENTOS
        const welcome = document.getElementById("welcome-msg");
        const plan = document.getElementById("user-plan");

        if (welcome) {
            welcome.innerText = "Bem-vindo, " + user.email;
        }

        if (plan) {
            plan.innerText = "Plano: PRO";
        }

        window.userPlan = "PRO";

        if (typeof carregarLivros === "function") {
            carregarLivros();
        }

    } catch (e) {
        console.error("FALHA GERAL:", e);

        document.body.innerHTML = `
            <div style="color:white; text-align:center; padding:40px;">
                <h2>Erro ao carregar sistema</h2>
                <p>Verifique console</p>
            </div>
        `;
    }
});
