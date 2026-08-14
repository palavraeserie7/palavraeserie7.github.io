/*
 * UI — MATRIZ DE ANÁLISE BÍBLICA
 *
 * Responsabilidade:
 * - receber entrada do usuário
 * - chamar ANL-00
 * - executar ANL-01 → ANL-12
 * - apresentar resultados
 *
 * Não contém lógica interna dos ANLs.
 */

import { Router } from "./router.js";
import { MATRIZ_ETAPAS } from "../../../etapas/index.js";

function escapeHTML(valor = "") {
    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function obterElemento(id) {
    return document.getElementById(id);
}

function mostrarDiagnostico(diagnostico) {

    const area = obterElemento("diagnostico-area");

    if (!area) return;

    area.innerHTML = `
        <div class="diag-item">
            <small>TESTAMENTO</small>
            <strong>${escapeHTML(diagnostico.testamento)}</strong>
        </div>

        <div class="diag-item">
            <small>IDIOMA ORIGINAL</small>
            <strong>${escapeHTML(diagnostico.idiomaOriginalProvavel)}</strong>
        </div>

        <div class="diag-item">
            <small>ROTEAMENTO</small>
            <strong>12 ANLs</strong>
        </div>

        <div class="diag-item">
            <small>STATUS</small>
            <strong>DIAGNOSTICADO</strong>
        </div>
    `;
}

function criarCardANL(id, titulo) {

    const div = document.createElement("div");

    div.className = "matriz-item";
    div.dataset.anl = id;

    div.innerHTML = `
        <div>
            <b>${escapeHTML(id)}</b>
            — ${escapeHTML(titulo)}
        </div>

        <div class="anl-status">
            AGUARDANDO
        </div>

        <div class="anl-result">
        </div>
    `;

    return div;
}

function apresentarResultado(card, resultado) {

    const status = card.querySelector(".anl-status");
    const result = card.querySelector(".anl-result");

    if (status) {
        status.textContent = resultado.status || "SEM STATUS";
    }

    if (result) {

        result.textContent = JSON.stringify(
            resultado,
            null,
            2
        );
    }
}

async function executarMatriz(tema, passagem) {

    const diagnosticoArea = obterElemento("diagnostico-area");
    const matrizArea = obterElemento("matriz-area");
    const resultadoArea = obterElemento("resultado-area");

    if (!diagnosticoArea || !matrizArea) {
        throw new Error(
            "Elementos da interface da Matriz não foram encontrados."
        );
    }

    diagnosticoArea.innerHTML =
        `<div class="loading">Executando ANL-00...</div>`;

    matrizArea.innerHTML = "";

    if (resultadoArea) {
        resultadoArea.style.display = "none";
        resultadoArea.innerHTML = "";
    }

    /*
     * ANL-00
     */
    const diagnostico = Router.classificar(
        tema,
        passagem
    );

    mostrarDiagnostico(
        diagnostico.diagnostico
    );

    /*
     * Contexto compartilhado.
     *
     * Os ANLs continuam independentes.
     * O contexto é o contrato de comunicação.
     */
    const contexto = {
        tema,
        passagem,
        diagnostico: diagnostico.diagnostico
    };

    /*
     * Fluxo fixo ANL-01 → ANL-12
     */
    for (const modulo of MATRIZ_ETAPAS) {

        const card = criarCardANL(
            modulo.id,
            modulo.titulo
        );

        matrizArea.appendChild(card);

        const status = card.querySelector(".anl-status");

        if (status) {
            status.textContent = "EXECUTANDO";
        }

        try {

            const resultado = await modulo.executar(
                `${tema || ""} ${passagem || ""}`.trim(),
                contexto
            );

            /*
             * Armazena o resultado sem modificar
             * a implementação interna do ANL.
             */
            contexto[
                modulo.id.toLowerCase()
            ] = resultado;

            apresentarResultado(
                card,
                resultado
            );

        } catch (erro) {

            const falha = {
                id: modulo.id,
                status: "ERROR",
                erro: erro.message
            };

            contexto[
                modulo.id.toLowerCase()
            ] = falha;

            apresentarResultado(
                card,
                falha
            );
        }
    }

    /*
     * Resultado final
     */
    if (resultadoArea) {

        resultadoArea.innerHTML = `
            <h2>Dossiê de Pesquisa</h2>

            <p>
                <strong>Tema:</strong>
                ${escapeHTML(tema || "—")}
            </p>

            <p>
                <strong>Passagem:</strong>
                ${escapeHTML(passagem || "—")}
            </p>

            <p>
                <strong>Fluxo executado:</strong>
                ANL-00 → ANL-01 → ANL-02 → ANL-03 →
                ANL-04 → ANL-05 → ANL-06 → ANL-07 →
                ANL-08 → ANL-09 → ANL-10 → ANL-11 → ANL-12
            </p>

            <p>
                <strong>Estado atual:</strong>
                estrutura funcional com fontes externas
                ainda pendentes de integração.
            </p>
        `;

        resultadoArea.style.display = "block";
    }

    return contexto;
}

function iniciar() {

    const temaInput = obterElemento("tema-input");
    const passagemInput = obterElemento("passagem-input");
    const botao = document.querySelector(
        "[data-analisar]"
    );

    if (!temaInput || !passagemInput || !botao) {
        console.error(
            "Interface da pesquisa não encontrada."
        );

        return;
    }

    botao.addEventListener(
        "click",
        async () => {

            const tema =
                temaInput.value.trim();

            const passagem =
                passagemInput.value.trim();

            if (!tema && !passagem) {

                alert(
                    "Informe um tema ou uma passagem."
                );

                return;
            }

            botao.disabled = true;
            botao.textContent = "EXECUTANDO...";

            try {

                await executarMatriz(
                    tema,
                    passagem
                );

            } catch (erro) {

                console.error(
                    "Erro na Matriz:",
                    erro
                );

                const area =
                    obterElemento(
                        "resultado-area"
                    );

                if (area) {

                    area.style.display = "block";

                    area.innerHTML = `
                        <h2>Erro de execução</h2>
                        <p>
                            ${escapeHTML(
                                erro.message
                            )}
                        </p>
                    `;
                }

            } finally {

                botao.disabled = false;
                botao.textContent = "ANALISAR";
            }
        }
    );
}

document.addEventListener(
    "DOMContentLoaded",
    iniciar
);
