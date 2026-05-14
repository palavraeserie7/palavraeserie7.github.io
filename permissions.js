// ======================================
// CONTROLE DE ACESSO
// Palavra em Série V9
// ======================================

// SEU EMAIL ADMIN
const ADMIN_EMAIL = "palavraeserie@gmail.com";

async function verificarAcesso() {

    const {
        data: { user }
    } = await window.supabaseClient.auth.getUser();

    // ======================================
    // SEM LOGIN
    // ======================================

    if (!user) {

        // Se estiver na dashboard sem login
        if (window.location.pathname.includes("dashboard")) {
            window.location.href = "login.html";
        }

        return;
    }

    // ======================================
    // SOMENTE ADMIN TEM ACESSO
    // ======================================

    if (user.email.toLowerCase() !== ADMIN_EMAIL) {

        alert("Sistema em manutenção. Acesso restrito.");

        await window.supabaseClient.auth.signOut();

        window.location.href = "login.html";

        return;
    }

    // ======================================
    // DEFINE PLANO ADMIN
    // ======================================

    window.userPlan = "PRO";

    // ======================================
    // ATUALIZA DASHBOARD
    // ======================================

    const welcomeMsg = document.getElementById("welcome-msg");
    const userPlan = document.getElementById("user-plan");

    if (welcomeMsg) {
        welcomeMsg.innerText = `Bem-vindo, Administrador`;
    }

    if (userPlan) {
        userPlan.innerText = `Plano Atual: PRO`;
    }

    // ======================================
    // CARREGA LIVROS
    // ======================================

    if (typeof carregarLivros === "function") {
        carregarLivros();
    }
}

// Executa automaticamente
verificarAcesso();
