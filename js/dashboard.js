/**
 * PALAVRA & SÉRIE
 * DASHBOARD
 *
 * Interface da nova arquitetura de pesquisa.
 */

let currentUser = null;
let selectedMode = null;


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

async function init() {

    try {

        currentUser =
            await M00.execute("AUTH_GET_USER");

        if (!currentUser) {

            window.location.href = "./login.html";
            return;
        }


        const emailElement =
            document.getElementById("user-email");

        if (emailElement) {
            emailElement.innerText =
                currentUser.email || "";
        }


        const dashboard =
            await M00.execute(
                "LOAD_DASHBOARD",
                {
                    userId: currentUser.id
                }
            );


        renderBooks(
            dashboard.books || []
        );


        const modes =
            await M00.execute(
                "GET_RESEARCH_MODES"
            );


        renderResearchModes(modes);

        renderDefaultFlow(modes);

    }

    catch (error) {

        console.error(
            "Erro na inicialização:",
            error
        );
    }
}


/* =========================================================
   NÍVEIS DE PESQUISA
   ========================================================= */

function renderResearchModes(modes) {

    const container =
        document.getElementById(
            "research-modes-container"
        );

    if (!container) return;

    container.innerHTML = "";


    const isPro =
        M00.hasProAccess(currentUser);


    modes.forEach(mode => {

        const card =
            document.createElement("button");

        card.type = "button";

        card.className =
            "mode-card" +
            (mode.acesso === "pro"
                ? " mode-pro"
                : "");


        const locked =
            mode.acesso === "pro" &&
            !isPro;


        card.innerHTML = `

            <div class="mode-number">
                ${String(mode.numero).padStart(2, "0")}
            </div>

            <div class="mode-content">

                <h3>
                    ${mode.nome}
                    ${locked ? " 🔒" : ""}
                </h3>

                <p>
                    ${mode.descricao}
                </p>

                <span class="mode-detail">
                    ${mode.etapas.length}
                    ${mode.etapas.length === 1
                        ? " etapa"
                        : " etapas"}
                </span>

            </div>

        `;


        card.addEventListener(
            "click",
            () => {

                if (locked) {

                    showProMessage();
                    return;
                }

                selectedMode =
                    mode.id;

                renderFlow(
                    mode.id
                );

                executeSearch(
                    mode.id
                );
            }
        );


        container.appendChild(card);

    });
}


/* =========================================================
   PESQUISA
   ========================================================= */

async function executeSearch(mode) {

    const input =
        document.getElementById(
            "global-search"
        );

    const query =
        input?.value.trim() || "";


    if (!query) {

        alert(
            "Digite uma passagem, palavra, tema ou pergunta bíblica antes de iniciar a pesquisa."
        );

        return;
    }


    selectedMode = mode;


    switchTab(
        "consulta",
        false
    );


    const container =
        document.getElementById(
            "results-area"
        );


    if (!container) return;


    container.innerHTML = `

        <div class="research-loading">

            <div class="loading-symbol">
                ⟳
            </div>

            <h2>
                Estruturando sua pesquisa
            </h2>

            <p>
                Preparando as etapas de acordo com o nível
                selecionado.
            </p>

        </div>

    `;


    const result =
        await M00.execute(
            "EXECUTE_RESEARCH",
            {
                query,
                mode,
                user: currentUser
            }
        );


    if (result.bloqueado) {

        container.innerHTML = `

            <div class="pro-lock">

                <div class="pro-lock-icon">
                    🔒
                </div>

                <h2>
                    Pesquisa PRO
                </h2>

                <p>
                    Este nível utiliza as 13 etapas completas
                    da arquitetura de pesquisa bíblica.
                </p>

                <button
                    type="button"
                    class="pro-button"
                    onclick="showProMessage()"
                >
                    ACESSAR PESQUISA PRO
                </button>

            </div>

        `;

        return;
    }


    renderResearchResult(result);
}


/* =========================================================
   RESULTADO
   ========================================================= */

function renderResearchResult(data) {

    const container =
        document.getElementById(
            "results-area"
        );

    if (!container) return;


    const stageList =
        data.etapas
            .map(
                (stage, index) => `

                    <div class="result-stage">

                        <div class="stage-number">
                            ${String(index + 1).padStart(2, "0")}
                        </div>

                        <div>
                            <strong>
                                ${stage.nome}
                            </strong>

                            <p>
                                ${stage.descricao}
                            </p>
                        </div>

                    </div>

                `
            )
            .join("");


    container.innerHTML = `

        <div class="research-result">

            <div class="result-header">

                <span>
                    ${data.modo.nome}
                </span>

                <h1>
                    ${escapeHTML(data.tema)}
                </h1>

                <p>
                    ${data.modo.descricao}
                </p>

            </div>


            <section class="result-section">

                <h2>
                    M03 — Entendimento Bíblico
                </h2>

                <p>
                    ${data.m03.conteudo}
                </p>

            </section>


            <section class="result-section message-section">

                <h2>
                    M02 — Mensagem
                </h2>

                <p>
                    ${data.m02.conteudo}
                </p>

            </section>


            <section class="result-section">

                <h2>
                    Etapas ativadas
                </h2>

                <div class="stage-list">

                    ${stageList}

                </div>

            </section>


            <section class="architecture-notice">

                <strong>
                    Infraestrutura documental
                </strong>

                <p>
                    ${data.avisoFontes}
                </p>

            </section>

        </div>

    `;
}


/* =========================================================
   FLUXO DE ESTUDO
   ========================================================= */

async function renderFlow(mode) {

    const container =
        document.getElementById(
            "fluxo-container"
        );

    if (!container) return;


    const modes =
        await M00.execute(
            "GET_RESEARCH_MODES"
        );


    const selected =
        modes.find(
            item => item.id === mode
        );


    if (!selected) return;


    const stages =
        await M00.execute(
            "GET_MODE_FLOW",
            {
                mode
            }
        );


    container.innerHTML = `

        <div class="flow-header">

            <span>
                NÍVEL ${selected.numero}
            </span>

            <h2>
                ${selected.nome}
            </h2>

            <p>
                ${selected.descricao}
            </p>

        </div>


        <div class="flow-timeline">

            ${stages.map(
                (stage, index) => `

                    <div class="flow-step">

                        <div class="flow-index">
                            ${String(index + 1).padStart(2, "0")}
                        </div>

                        <div class="flow-line-content">

                            <h3>
                                ${stage.nome}
                            </h3>

                            <p>
                                ${stage.descricao}
                            </p>

                        </div>

                    </div>

                `
            ).join("")}

        </div>

    `;
}


function renderDefaultFlow(modes) {

    if (!modes || !modes.length)
        return;

    renderFlow(
        modes[0].id
    );
}


/* =========================================================
   BUSCA SUPERIOR
   ========================================================= */

function handleGlobalSearch(event) {

    if (event.key !== "Enter")
        return;


    const input =
        document.getElementById(
            "global-search"
        );


    const query =
        input?.value.trim();


    if (!query) return;


    switchTab(
        "pesquisa",
        false
    );


    showSearchInstruction();
}


function showSearchInstruction() {

    const existing =
        document.getElementById(
            "search-instruction"
        );

    if (existing) return;


    const container =
        document.getElementById(
            "research-modes-container"
        );

    if (!container) return;


    const message =
        document.createElement("div");


    message.id =
        "search-instruction";


    message.className =
        "search-instruction";


    message.innerHTML = `

        <strong>
            Pergunta recebida.
        </strong>

        <span>
            Agora escolha o nível de profundidade
            que deseja utilizar.
        </span>

    `;


    container.parentNode.insertBefore(
        message,
        container
    );
}


/* =========================================================
   NAVEGAÇÃO
   ========================================================= */

function switchTab(
    view,
    clearSearch = true
) {

    const views = [
        "home-view",
        "pesquisa-view",
        "fluxo-view",
        "estante-view",
        "consulta-view"
    ];


    views.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.style.display =
                "none";
        }

    });


    const targetMap = {

        home: "home-view",
        pesquisa: "pesquisa-view",
        fluxo: "fluxo-view",
        estante: "estante-view",
        consulta: "consulta-view"

    };


    const target =
        document.getElementById(
            targetMap[view] ||
            "home-view"
        );


    if (target) {
        target.style.display =
            "block";
    }


    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove(
                "active"
            );

        });


    const nav =
        document.querySelector(
            `.nav-item[data-view="${view}"]`
        );


    if (nav) {
        nav.classList.add("active");
    }


    if (clearSearch) {

        const input =
            document.getElementById(
                "global-search"
            );

        if (input) {
            input.value = "";
        }
    }
}


/* =========================================================
   PRO
   ========================================================= */

function showProMessage() {

    switchTab(
        "consulta",
        false
    );


    const container =
        document.getElementById(
            "results-area"
        );


    if (!container) return;


    container.innerHTML = `

        <div class="pro-lock">

            <div class="pro-lock-icon">
                🔐
            </div>

            <h2>
                Pesquisa PRO
            </h2>

            <p>
                A Pesquisa PRO reúne as 13 etapas
                completas da investigação bíblica.
            </p>

            <div class="pro-features">

                <div>✓ Texto Bíblico</div>
                <div>✓ Crítica Textual</div>
                <div>✓ Gramática e Sintaxe</div>
                <div>✓ Léxico e Semântica</div>
                <div>✓ Contexto Literário</div>
                <div>✓ Contexto Histórico-Cultural</div>
                <div>✓ Intertextualidade</div>
                <div>✓ Exegese</div>
                <div>✓ Teologia Bíblica</div>
                <div>✓ Hermenêutica</div>
                <div>✓ Teologia Sistemática</div>
                <div>✓ Comparação e Validação</div>
                <div>✓ Síntese Final</div>

            </div>

            <button
                class="pro-button"
                type="button"
            >
                CONHECER O PLANO PRO
            </button>

        </div>

    `;
}


/* =========================================================
   ESTANTE
   ========================================================= */

function renderBooks(books) {

    const freeContainer =
        document.getElementById(
            "books-free"
        );

    const proContainer =
        document.getElementById(
            "books-pro"
        );


    if (!freeContainer ||
        !proContainer)
        return;


    freeContainer.innerHTML = "";
    proContainer.innerHTML = "";


    if (!books.length) {

        freeContainer.innerHTML = `

            <div class="empty-library">

                <h3>
                    Estante em preparação
                </h3>

                <p>
                    As obras serão organizadas
                    conforme a arquitetura documental.
                </p>

            </div>

        `;

        return;
    }


    books.forEach(book => {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "book-card";


        const title =
            book.title ||
            book.titulo ||
            "Obra sem título";


        const cover =
            book.content_path ||
            book.capa ||
            "";


        card.innerHTML = `

            ${
                cover
                ? `<img src="${escapeHTML(cover)}" alt="${escapeHTML(title)}">`
                : `<div class="book-placeholder">📖</div>`
            }

            <h4>
                ${escapeHTML(title)}
            </h4>

        `;


        const level =
            Number(
                book.level ||
                book.nivel ||
                1
            );


        if (level > 1)
            proContainer.appendChild(card);
        else
            freeContainer.appendChild(card);

    });
}


/* =========================================================
   SEGURANÇA BÁSICA DE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   INÍCIO
   ========================================================= */

window.addEventListener(
    "DOMContentLoaded",
    () => {
        setTimeout(
            init,
            300
        );
    }
);
