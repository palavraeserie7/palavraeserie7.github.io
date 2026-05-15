async function verificarAcesso() {

    const { data: { user } } =
        await window.supabaseClient.auth.getUser();

    if (!user) {
        window.location.href = "/pages/login.html";
        return;
    }

    document.body.innerHTML = `
        <h2 style="color:white;text-align:center;">
            OK LOGADO: ${user.email}
        </h2>
    `;
}

verificarAcesso();
