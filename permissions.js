// ======================================
// CONTROLE DE ACESSO (CORRIGIDO)
// ======================================

async function verificarAcesso() {

    try {

        const { data: { user }, error } =
            await window.supabaseClient.auth.getUser();

        if (error) {
            console.error(error);
        }

        // Se não estiver logado
        if (!user) {
            window.location.href = "/pages/login.html";
            return;
        }

        // Atualiza UI com segurança
        const welcomeMsg = document.getElementById("welcome-msg");
        const userPlan = document.getElementById("user-plan");

        if (welcomeMsg) {
            welcomeMsg.innerText = `Bem-vindo, ${user.email}`;
        }

        if (userPlan) {
            userPlan.innerText = "Plano: PRO";
        }

        // Define plano global
        window.userPlan = "PRO";

        // Carrega livros
        if (typeof carregarLivros === "function") {
            carregarLivros();
        }

    } catch (err) {
        console.error("Erro no acesso:", err);

        document.body.innerHTML = `
            <h2 style="color:red; text-align:center;">
                Erro ao carregar sistema
            </h2>
        `;
    }
}

verificarAcesso();
