/**
 * DASHBOARD VIEW CONTROLLER V10 (NEXUS DEFINITIVO)
 * Garante navegação instantânea e renderização de dossiês teológicos ricos.
 */

// INICIALIZAÇÃO
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(inicializarSistema, 300);
});

async function inicializarSistema() {
    try {
        const user = await M00.execute('AUTH_GET_USER');
        if (user && user.email) {
            document.getElementById("user-email").innerText = user.email;
        } else {
            document.getElementById("user-email").innerText = "Modo Convidado / Visitante";
        }

        const data = await M00.execute('LOAD_DASHBOARD');
        if (data && data.books) {
            renderizarEstante(data.books);
        }
    } catch (e) {
        console.log("Modo de execução autônoma ativo.");
        document.getElementById("user-email").innerText = "Pesquisador Teológico";
    }
}

// NAVEGAÇÃO DE ABAS (BLINDADA)
function mudarAba(nomeAba) {
    // 1. Esconde todas as seções
    const secoes = ['view-home', 'view-fluxo', 'view-estante', 'view-consulta'];
    secoes.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // 2. Remove classe active de todos os itens do menu
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // 3. Mostra a aba alvo
    const alvo = document.getElementById('view-' + nomeAba);
    if (alvo) {
        alvo.style.display = 'block';
    }

    // 4. Ativa o botão correspondente no menu
    const btn = document.getElementById('btn-' + nomeAba);
    if (btn) {
        btn.classList.add('active');
    }
}

// EXECUÇÃO DE PESQUISA
async function executarPesquisa(modo) {
    const inputBusca = document.getElementById("global-search");
    const tema = inputBusca ? inputBusca.value.trim() : "";

    if (!tema || tema.length < 2) {
        alert("Por favor, digite um tema ou pergunta bíblica na barra de pesquisa no topo da página.");
        if (inputBusca) inputBusca.focus();
        return;
    }

    // Muda para a tela de consulta imediatamente
    mudarAba('consulta');

    const areaResultados = document.getElementById("results-area");
    areaResultados.innerHTML = `
        <div style="text-align:center; padding:80px; font-family:serif;">
            <i class="fas fa-spinner fa-spin fa-3x" style="color:#00cc66; margin-bottom:20px;"></i>
            <h2 style="color:#f8f4ec;">Orquestrador M00 acionando motores...</h2>
            <p style="color:#94a3b8;">Cruzando originais, léxicos e validando com o Sentinela Editorial.</p>
        </div>
    `;

    try {
        // Executa a pesquisa através do Orquestrador M00
        const dossie = await M00.execute('EXECUTE_RESEARCH', { query: tema, mode: modo });
        
        if (dossie) {
            renderizarDossie(dossie);
            atualizarFluxoEstudo(dossie.matrizFluxo, dossie.modo);
        }
    } catch (err) {
        console.error(err);
        areaResultados.innerHTML = `<div style="padding:40px; text-align:center; color:#ff4d4d;">Erro ao processar a investigação teológica. Tente novamente.</div>`;
    }
}

// RENDERIZAÇÃO DO DOSSIÊ TÉCNICO
function renderizarDossie(d) {
    const area = document.getElementById("results-area");
    if (!area) return;

    area.innerHTML = `
        <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:50px; border:3px solid #1a202c; font-family:serif; box-shadow: 0 40px 80px rgba(0,0,0,0.5); max-width: 950px; margin: auto;">
            
            <!-- CABEÇALHO DO DOSSIÊ -->
            <div style="border-bottom: 5px double #1a202c; padding-bottom:20px; text-align:center; margin-bottom:40px;">
                <h2 style="margin:0; font-size:0.75rem; letter-spacing:6px; color:#4a5568; font-weight: 800; text-transform:uppercase;">DOSSIÊ TEOLÓGICO — ARQUITETURA V10</h2>
                <h1 style="margin:20px 0; font-size:3.2rem; text-transform:uppercase; letter-spacing: -1px;">${d.tema}</h1>
                <div style="background:#065f46; color:white; padding:8px 25px; border-radius:50px; font-size:0.8rem; font-weight:bold; display:inline-block; border: 2px solid #1a202c;">
                    NÍVEL: ${d.modo} | SENTINELA EDITORIAL: ${d.score}/100 [${d.status}]
                </div>
            </div>

            <!-- BLOCO M03: ENTENDIMENTO BÍBLICO -->
            <div style="background:white; padding:35px; border-radius:10px; border:1px solid #e2e8f0; border-left:12px solid #00cc66; margin-bottom:30px;">
                <h3 style="color:#00cc66; margin-top:0; font-size:1.3rem; border-bottom:1px solid #f0f0f0; padding-bottom:10px;">${d.m03.titulo}</h3>
                <div style="font-size:1.1rem; line-height:1.8; color: #2d3748;">
                    ${d.m03.conteudo.replace(/\n/g, '<br>')}
                </div>
            </div>

            <!-- BLOCO M02: MENSAGEM & TRANSFORMAÇÃO -->
            <div style="background:#fffbeb; padding:35px; border-radius:10px; border:1px solid #fef3c7; border-left:12px solid #C9A84C;">
                <h3 style="color:#92400e; margin-top:0; font-size:1.3rem; border-bottom:1px solid #fef3c7; padding-bottom:10px;">${d.m02.titulo}</h3>
                <p style="font-size:1.15rem; line-height:1.8; color:#451a03; font-style: italic;">
                    "${d.m02.conteudo}"
                </p>
            </div>

            <!-- RODAPÉ DE NAVEGAÇÃO -->
            <div style="text-align:center; margin-top:50px; padding-top:30px; border-top: 1px dashed #cbd5e0;">
                <p style="font-size: 0.85rem; color: #718096; margin-bottom: 20px;">Análise sintetizada através da matriz de cruzamento exegético e validação estrutural E11.</p>
                <button class="btn-liberado" style="background:#00cc66; color:white; width:auto; padding:18px 50px; font-size: 0.95rem; cursor:pointer; border:none; border-radius:8px; font-weight:bold;" onclick="mudarAba('fluxo')">
                    VER MATRIZ DE EVIDÊNCIAS (ETAPA / FONTE / FUNÇÃO)
                </button>
            </div>
        </div>
    `;
}

// ATUALIZAÇÃO DA TABELA DE FLUXO DE ESTUDO
function atualizarFluxoEstudo(matriz, modo) {
    const container = document.getElementById("fluxo-container");
    const subtitle = document.getElementById("fluxo-subtitle");
    if (!container) return;

    subtitle.innerText = `Matriz Acadêmica Ativada para o Nível: ${modo}`;

    let tabela = `
        <table style="width:100%; border-collapse: collapse; margin-top:20px; background: #111827; border-radius: 10px; overflow: hidden; border: 1px solid #1f2937;">
            <thead>
                <tr style="background: #1f2937; color: #00cc66; text-align: left;">
                    <th style="padding: 15px; border-bottom: 2px solid #00cc66;">ETAPA</th>
                    <th style="padding: 15px; border-bottom: 2px solid #00cc66;">FONTE</th>
                    <th style="padding: 15px; border-bottom: 2px solid #00cc66;">FUNÇÃO</th>
                </tr>
            </thead>
            <tbody>
    `;

    matriz.forEach(item => {
        tabela += `
            <tr style="border-bottom: 1px solid #1f2937;">
                <td style="padding: 15px; font-weight: bold; font-size: 0.9rem; color: #f8f4ec;">${item.etapa}</td>
                <td style="padding: 15px; color: #C9A84C; font-family: monospace; font-size: 0.95rem;">${item.fonte}</td>
                <td style="padding: 15px; font-size: 0.85rem; color: #94a3b8;">${item.funcao}</td>
            </tr>
        `;
    });

    tabela += `</tbody></table>`;
    container.innerHTML = tabela;
}

// RENDERIZAÇÃO DA ESTANTE
function renderizarEstante(books) {
    const grid = document.getElementById("books-grid");
    if (!grid) return;
    grid.innerHTML = "";

    books.forEach(b => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
            <img src="${b.content_path || b.capa || 'https://via.placeholder.com/150'}" alt="Capa">
            <h4 style="color:#f8f4ec; margin:10px 0 5px 0;">${b.title || b.titulo}</h4>
            <span style="font-size:0.75rem; color:#00cc66; font-weight:bold;">RECURSO DISPONÍVEL</span>
        `;
        grid.appendChild(card);
    });
}

// LOGOUT
async function fazerLogout() {
    try {
        await M00.execute('AUTH_LOGOUT');
    } catch(e) {}
    window.location.href = "./login.html";
}
/**
 * MENU DE PESQUISA
 */

function abrirPesquisa() {

    const container =
        document.getElementById("research-modes-container");

    if (!container) return;

    container.innerHTML = "";

    PS_RESEARCH_MODES.forEach(mode => {

        const card = document.createElement("button");

        card.type = "button";

        card.className = "research-mode-card";

        card.innerHTML = `
            <div class="research-mode-title">
                ${mode.nome}
                ${mode.acesso === "pro" ? " 🔒" : ""}
            </div>

            <div class="research-mode-description">
                ${mode.descricao}
            </div>
        `;

        card.addEventListener("click", () => {

            iniciarPesquisa(mode.id);

        });

        container.appendChild(card);

    });

}


async function iniciarPesquisa(modeId) {

    const input =
        document.getElementById("global-search");

    const query =
        input ? input.value.trim() : "";

    if (!query) {

        alert("Digite uma pergunta ou passagem para pesquisar.");

        return;

    }

    /*
     * Aqui futuramente verificaremos
     * a assinatura do usuário.
     */

    const resultado =
        await PSOrchestrator.executeResearch({

            query: query,

            mode: modeId

        });

    mostrarPlanoPesquisa(resultado);

}


function mostrarPlanoPesquisa(resultado) {

    const area =
        document.getElementById("results-area");

    if (!area) return;

    if (!resultado.sucesso) {

        area.innerHTML = `
            <div class="research-error">
                ${resultado.erro}
            </div>
        `;

        return;

    }

    let etapasHTML = "";

    resultado.plano.forEach(etapa => {

        etapasHTML += `
            <div class="research-stage">

                <div class="research-stage-number">
                    ${String(etapa.numero).padStart(2, "0")}
                </div>

                <div class="research-stage-content">

                    <strong>
                        ${etapa.nome}
                    </strong>

                    <p>
                        ${etapa.descricao}
                    </p>

                </div>

            </div>
        `;

    });

    area.innerHTML = `

        <section class="research-result">

            <div class="research-result-header">

                <span>
                    ${resultado.modo.nome}
                </span>

                ${resultado.pro
                    ? "<span>PRO</span>"
                    : ""}

            </div>

            <h2>
                ${resultado.consulta}
            </h2>

            <p>
                O sistema preparou uma pesquisa com
                <strong>${resultado.totalEtapas}</strong>
                etapas de análise.
            </p>

            <div class="research-stages">

                ${etapasHTML}

            </div>

        </section>

    `;

}
