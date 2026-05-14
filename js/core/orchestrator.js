// ======================================
// ORCHESTRATOR
// Palavra em Série V9
// ======================================

const livros = [

    {
        titulo: "Evangelho de João",
        descricao: "Estudo profundo do Evangelho de João.",
        categoria: "FREE",
        conteudo: "#"
    },

    {
        titulo: "Escatologia Avançada",
        descricao: "Conteúdo exclusivo PRO.",
        categoria: "PRO",
        conteudo: "#"
    }

];

// ======================================
// RENDERIZAÇÃO
// ======================================

function carregarLivros() {

    const container = document.getElementById("books-container");

    if (!container) return;

    container.innerHTML = "";

    const planoUsuario = window.userPlan || "FREE";

    livros.forEach(livro => {

        const card = document.createElement("div");

        card.className = "book-card";

        card.innerHTML = `

            <div class="tag ${livro.categoria === 'PRO' ? 'pro-tag' : 'free-tag'}">
                ${livro.categoria}
            </div>

            <h3>${livro.titulo}</h3>

            <p>${livro.descricao}</p>

            <br>

            ${(livro.categoria === 'FREE' || planoUsuario === 'PRO')

                ? `<a href="${livro.conteudo}" target="_blank" class="btn-liberado">Abrir Estudo</a>`

                : `<button class="btn-bloqueado">Bloqueado 🔒</button>`
            }

        `;

        container.appendChild(card);

    });

}

window.carregarLivros = carregarLivros;
