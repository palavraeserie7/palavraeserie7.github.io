async function verificarAcesso() {
    // 1. Pega o usuário logado
    const { data: { user } } = await supabaseClient.auth.getUser();

    if (!user) {
        // Se não tiver logado, volta para o login
        window.location.href = "login.html";
        return;
    }

    // 2. Busca o plano do usuário na tabela 'profiles' que criamos
    const { data: profile, error } = await supabaseClient
        .from('profiles')
        .select('plano')
        .eq('id', user.id)
        .single();

    if (error || !profile) {
        console.error("Erro ao carregar perfil:", error);
        return;
    }

    // 3. Atualiza a interface da Dashboard
    const planDisplay = document.getElementById('user-plan');
    const welcomeMsg = document.getElementById('welcome-msg');
    
    if (planDisplay) planDisplay.innerText = `Seu plano atual: ${profile.plano}`;
    if (welcomeMsg) welcomeMsg.innerText = `Bem-vindo, ${user.email.split('@')[0]}!`;

    // 4. Salva o plano globalmente para o Orchestrator usar
    window.userPlan = profile.plano;
    
    // 5. Manda o Orchestrator carregar os livros baseados no plano
    if (typeof carregarLivros === "function") {
        carregarLivros();
    }
}

// Executa a verificação assim que a página carrega
verificarAcesso();
