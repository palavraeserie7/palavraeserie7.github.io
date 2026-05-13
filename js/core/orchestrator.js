console.log("M00 ORCHESTRATOR ONLINE");

async function iniciarSistema() {
    console.log("Inicializando Palavra em Série V9...");
    await carregarLivros();
}

async function carregarLivros() {
    // Certifique-se que o nome da tabela no .from é exatamente 'livros'
    const { data, error } = await supabaseClient
        .from('livros') 
        .select('*');

    if (error) {
        console.error("Erro ao carregar:", error);
        return;
    }

    const container = document.getElementById('books-container');
    
    if (container) {
        if (data && data.length > 0) {
            container.innerHTML = data.map(livro => `
                <div class="book-card">
                    <div class="tag ${livro.nivel === 'PRO' ? 'pro' : 'free'}">
                        ${livro.nivel ? livro.nivel.toUpperCase() : 'FREE'}
                    </div>
                    <img src="${livro.capa}" alt="${livro.titulo}" style="width:100%; border-radius:15px; margin-bottom:15px; display:block;">
                    <h4>${livro.titulo}</h4>
                    <p>${livro.descricao}</p>
                </div>
            `).join('');
        } else {
            container.innerHTML = `<p style='padding:20px; opacity:0.7;'>Conexão Estabelecida. Aguardando novos estudos no Supabase.</p>`;
        }
    }
}

iniciarSistema();
