// ============================================================
// PALAVRA & SÉRIE
// UI — TESTE DO MOTOR DE PESQUISA
// ============================================================

document.addEventListener("DOMContentLoaded", iniciarInterface);


function iniciarInterface() {

    console.log("[PALAVRA & SÉRIE] UI carregada.");

    const botao = document.querySelector("[data-analisar]");

    if (!botao) {

        console.error(
            "[PALAVRA & SÉRIE] Botão [data-analisar] não encontrado."
        );

        return;
    }

    botao.addEventListener("click", analisar);

    console.log(
        "[PALAVRA & SÉRIE] Botão ANALISAR conectado."
    );
}


// ============================================================
// ANALISAR
// ============================================================

function analisar() {

    console.log(
        "[PALAVRA & SÉRIE] Iniciando pesquisa..."
    );

    const tema =
        document.querySelector("#tema")?.value.trim() || "";

    const passagem =
        document.querySelector("#passagem")?.value.trim() || "";

    const contexto =
        document.querySelector("#contexto")?.value.trim() || "";


    // --------------------------------------------------------
    // VALIDAÇÃO
    // --------------------------------------------------------

    if (!tema && !passagem) {

        mostrarResultado(

            "NO_DATA",

            "Informe um tema ou uma passagem bíblica."

        );

        atualizarDiagnostico(
            "—",
            "—",
            "NO_DATA"
        );

        return;
    }


    // --------------------------------------------------------
    // DIAGNÓSTICO
    // --------------------------------------------------------

    atualizarDiagnostico(
        tema || "—",
        passagem || "—",
        "DIAGNOSTICADO"
    );


    // --------------------------------------------------------
    // RESULTADO DA ETAPA 1
    // --------------------------------------------------------

    const resultado = {

        id: "ANL-01",

        titulo: "TEXTO E MANUSCRITOS",

        status: "NO_DATA",

        entrada: {

            tema: tema,

            passagem: passagem,

            contexto: contexto

        },

        fontes: [

            {
                id: "NA28",
                nome: "NA28",
                status: "NO_DATA",
                evidencias: []
            },

            {
                id: "BHS_BHQ",
                nome: "BHS / BHQ",
                status: "NO_DATA",
                evidencias: []
            },

            {
                id: "SBLGNT",
                nome: "SBLGNT",
                status: "NO_DATA",
                evidencias: []
            },

            {
                id: "LXX",
                nome: "Septuaginta",
                status: "NO_DATA",
                evidencias: []
            },

            {
                id: "TR_SCRIVENER",
                nome: "Textus Receptus / Scrivener",
                status: "NO_DATA",
                evidencias: []
            }

        ],

        evidencias: [],

        achados: [],

        pendencias: [

            "Conectar fontes textuais reais."

        ],

        limitacoes: [

            "Nenhuma fonte foi considerada consultada sem conexão real."

        ]

    };


    renderizarResultado(resultado);


    console.log(
        "[PALAVRA & SÉRIE] Resultado:",
        resultado
    );

}


// ============================================================
// DIAGNÓSTICO
// ============================================================

function atualizarDiagnostico(
    tema,
    passagem,
    status
) {

    const elementoTema =
        document.querySelector(
            "[data-diagnostico-tema]"
        );

    const elementoPassagem =
        document.querySelector(
            "[data-diagnostico-passagem]"
        );

    const elementoStatus =
        document.querySelector(
            "[data-diagnostico-status]"
        );


    if (elementoTema) {

        elementoTema.textContent = tema;

    }


    if (elementoPassagem) {

        elementoPassagem.textContent = passagem;

    }


    if (elementoStatus) {

        elementoStatus.textContent = status;

    }


    const dossieTema =
        document.querySelector(
            "[data-dossie-tema]"
        );

    const dossiePassagem =
        document.querySelector(
            "[data-dossie-passagem]"
        );


    if (dossieTema) {

        dossieTema.textContent = tema;

    }


    if (dossiePassagem) {

        dossiePassagem.textContent = passagem;

    }

}


// ============================================================
// RESULTADO
// ============================================================

function renderizarResultado(resultado) {

    const destino =
        document.querySelector(
            "[data-resultados]"
        );


    if (!destino) {

        console.error(
            "[PALAVRA & SÉRIE] Área [data-resultados] não encontrada."
        );

        return;
    }


    destino.innerHTML = "";


    const titulo =
        document.createElement("h2");

    titulo.textContent =
        `${resultado.id} — ${resultado.titulo}`;


    destino.appendChild(titulo);


    const status =
        document.createElement("p");

    status.innerHTML =
        `<strong>STATUS:</strong> ${resultado.status}`;


    destino.appendChild(status);


    const entrada =
        document.createElement("p");

    entrada.innerHTML =
        `<strong>Tema:</strong> ${escaparHTML(resultado.entrada.tema || "—")}
        <br>
        <strong>Passagem:</strong> ${escaparHTML(resultado.entrada.passagem || "—")}`;


    destino.appendChild(entrada);


    const fontesTitulo =
        document.createElement("h3");

    fontesTitulo.textContent =
        "Fontes da ETAPA 1";


    destino.appendChild(fontesTitulo);


    resultado.fontes.forEach(fonte => {

        const bloco =
            document.createElement("div");

        bloco.style.padding = "10px 0";

        bloco.style.borderTop =
            "1px solid #263754";


        bloco.innerHTML = `

            <strong>${escaparHTML(fonte.nome)}</strong>

            <br>

            <span>
                STATUS: ${escaparHTML(fonte.status)}
            </span>

            <br>

            <span>
                Evidências: ${fonte.evidencias.length}
            </span>

        `;


        destino.appendChild(bloco);

    });


    const pendencias =
        document.createElement("div");


    pendencias.innerHTML = `

        <h3>Pendências</h3>

        <ul>

            ${resultado.pendencias
                .map(item => `<li>${escaparHTML(item)}</li>`)
                .join("")}

        </ul>

    `;


    destino.appendChild(pendencias);


    atualizarContadores(resultado);

}


// ============================================================
// CONTADORES
// ============================================================

function atualizarContadores(resultado) {

    const completed =
        document.querySelector(
            "[data-count-completed]"
        );

    const partial =
        document.querySelector(
            "[data-count-partial]"
        );

    const noData =
        document.querySelector(
            "[data-count-no-data]"
        );

    const error =
        document.querySelector(
            "[data-count-error]"
        );

    const estado =
        document.querySelector(
            "[data-estado-final]"
        );


    if (completed) {

        completed.textContent =
            resultado.status === "COMPLETED"
                ? "1"
                : "0";

    }


    if (partial) {

        partial.textContent =
            resultado.status === "PARTIAL"
                ? "1"
                : "0";

    }


    if (noData) {

        noData.textContent =
            resultado.status === "NO_DATA"
                ? "1"
                : "0";

    }


    if (error) {

        error.textContent =
            resultado.status === "ERROR"
                ? "1"
                : "0";

    }


    if (estado) {

        estado.textContent =
            resultado.status;

    }

}


// ============================================================
// RESULTADO DE ERRO / VALIDAÇÃO
// ============================================================

function mostrarResultado(
    status,
    mensagem
) {

    const destino =
        document.querySelector(
            "[data-resultados]"
        );


    if (!destino) {

        return;

    }


    destino.innerHTML = `

        <h2>ANL-01 — TEXTO E MANUSCRITOS</h2>

        <p>
            <strong>STATUS:</strong>
            ${status}
        </p>

        <p>
            ${escaparHTML(mensagem)}
        </p>

    `;

}


// ============================================================
// SEGURANÇA DE HTML
// ============================================================

function escaparHTML(valor) {

    return String(valor)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}
