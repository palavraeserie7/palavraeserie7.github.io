
import { diagnosticar } from "./diagnostico.js";
import { roteiar } from "./router.js";

const termInput = document.getElementById("termInput");
const passageInput = document.getElementById("passageInput");
const analyzeButton = document.getElementById("analyzeButton");

const diagnosticElement = document.getElementById("diagnostic");
const modulesElement = document.getElementById("modules");
const synthesisElement = document.getElementById("synthesis");

function escaparHTML(texto) {

    return String(texto)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function renderizarDiagnostico(diagnostico) {

    diagnosticElement.innerHTML = `
        <div class="diagnostic">

            <div class="diagnostic-card">
                <small>Passagem</small>
                <strong>${escaparHTML(diagnostico.passagem)}</strong>
            </div>

            <div class="diagnostic-card">
                <small>Testamento</small>
                <strong>${diagnostico.testamento}</strong>
            </div>

            <div class="diagnostic-card">
                <small>Idioma principal</small>
                <strong>${diagnostico.idiomaPrincipal}</strong>
            </div>

            <div class="diagnostic-card">
                <small>Texto grego</small>
                <strong>${diagnostico.recursos.textoGrego ? "SIM" : "NÃO"}</strong>
            </div>

            <div class="diagnostic-card">
                <small>Texto hebraico</small>
                <strong>${diagnostico.recursos.textoHebraico ? "SIM" : "NÃO"}</strong>
            </div>

            <div class="diagnostic-card">
                <small>Septuaginta</small>
                <strong>${diagnostico.recursos.septuaginta ? "CONDICIONAL" : "NÃO"}</strong>
            </div>

        </div>
    `;
}

function renderizarModulos(modulos, diagnostico) {

    modulesElement.innerHTML = "";

    modulos.forEach(modulo => {

        const div = document.createElement("div");

        div.className = "module";

        const criterios = typeof modulo.criterios === "function"
            ? modulo.criterios(diagnostico)
            : [];

        const criteriosHTML = criterios
            .map(item => `<span>${escaparHTML(item)}</span>`)
            .join("");

        div.innerHTML = `
            <div class="module-header">

                <div class="module-name">
                    ${modulo.id} — ${modulo.nome}
                </div>

                <div class="module-status ${modulo.status}">
                    ${modulo.status.toUpperCase()}
                    ${Math.round(modulo.pontuacao * 100)}%
                </div>

            </div>

            <div class="module-body">

                ${
                    modulo.status === "nao-aplicavel"
                        ? "Nenhuma evidência suficiente para acionar este módulo neste contexto."
                        : "Módulo selecionado pelo motor de pertinência."
                }

                ${
                    criteriosHTML
                        ? `<div class="criteria">${criteriosHTML}</div>`
                        : ""
                }

            </div>
        `;

        modulesElement.appendChild(div);
    });
}

function gerarSintese(modulos, diagnostico, termo) {

    const principais = modulos.filter(
        modulo => modulo.status === "principal"
    );

    const relevantes = modulos.filter(
        modulo => modulo.status === "relevante"
    );

    synthesisElement.innerHTML = `
        <div class="result">

            <strong>Pesquisa:</strong>
            ${escaparHTML(termo)}

            <br>

            <strong>Passagem:</strong>
            ${escaparHTML(diagnostico.passagem)}

            <br><br>

            <strong>Diagnóstico:</strong><br>

            A passagem foi classificada como
            <strong>${diagnostico.testamento}</strong>,
            tendo como idioma principal
            <strong>${diagnostico.idiomaPrincipal}</strong>.

            <br><br>

            <strong>Módulos principais:</strong>
            ${principais.length}

            <br>

            <strong>Módulos relevantes:</strong>
            ${relevantes.length}

            <br><br>

            O sistema não força a execução de critérios classificados
            como não aplicáveis. Recursos como hebraico, aramaico,
            grego, BHS/BHQ, NA28, SBLGNT e Septuaginta são selecionados
            conforme o diagnóstico da passagem.

        </div>
    `;
}

function analisar() {

    const termo = termInput.value.trim();
    const passagem = passageInput.value.trim();

    if (!passagem) {

        diagnosticElement.innerHTML = `
            <div class="empty">
                Informe uma passagem bíblica.
            </div>
        `;

        return;
    }

    const diagnostico = diagnosticar(passagem);

    const modulos = roteiar(diagnostico);

    renderizarDiagnostico(diagnostico);

    renderizarModulos(modulos, diagnostico);

    gerarSintese(
        modulos,
        diagnostico,
        termo || "Termo não informado"
    );
}

analyzeButton.addEventListener("click", analisar);

passageInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        analisar();
    }

});

document.querySelectorAll(".section-title").forEach(title => {

    title.addEventListener("click", () => {

        title.parentElement.classList.toggle("open");

        const icon = title.querySelector("span:last-child");

        icon.textContent =
            title.parentElement.classList.contains("open")
                ? "▲"
                : "▼";
    });

});
