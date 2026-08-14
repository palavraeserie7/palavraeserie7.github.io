/**
 * UI.JS
 *
 * Responsável por:
 * - entrada do usuário;
 * - apresentação;
 * - chamada do diagnóstico;
 * - execução dos módulos compatíveis;
 * - apresentação dos resultados.
 *
 * Não contém a lógica interna dos ANLs.
 */

import { Router } from "./router.js";
import { STAGES } from "./stages.js";

import * as ANL01 from "../../../etapas/anl-01.js";
import * as ANL02 from "../../../etapas/anl-02.js";
import * as ANL03 from "../../../etapas/anl-03.js";
import * as ANL04 from "../../../etapas/anl-04.js";
import * as ANL05 from "../../../etapas/anl-05.js";
import * as ANL06 from "../../../etapas/anl-06.js";
import * as ANL07 from "../../../etapas/anl-07.js";
import * as ANL08 from "../../../etapas/anl-08.js";
import * as ANL09 from "../../../etapas/anl-09.js";
import * as ANL10 from "../../../etapas/anl-10.js";
import * as ANL11 from "../../../etapas/anl-11.js";
import * as ANL12 from "../../../etapas/anl-12.js";


const MODULOS = {
    "ANL-01": ANL01,
    "ANL-02": ANL02,
    "ANL-03": ANL03,
    "ANL-04": ANL04,
    "ANL-05": ANL05,
    "ANL-06": ANL06,
    "ANL-07": ANL07,
    "ANL-08": ANL08,
    "ANL-09": ANL09,
    "ANL-10": ANL10,
    "ANL-11": ANL11,
    "ANL-12": ANL12
};


document.addEventListener(
    "DOMContentLoaded",
    prepararInterface
);


function prepararInterface() {

    const botao =
        document.getElementById("btn-analisar");

    if (botao) {
        botao.addEventListener(
            "click",
            iniciarMatriz
        );
    }
}


async function iniciarMatriz() {

    const tema =
        obterValor("tema-input");

    const passagem =
        obterValor("passagem-input");

    if (!tema && !passagem) {

        alert(
            "Informe um tema ou uma passagem bíblica."
        );

        return;
    }

    const diagnostico =
        Router.classificar(
            tema,
            passagem
        );

    renderizarDiagnostico(
        diagnostico
    );

    renderizarMatriz(
        diagnostico
    );

    await executarPesquisa(
        tema,
        passagem,
        diagnostico
    );
}


function obterValor(id) {

    const elemento =
        document.getElementById(id);

    return elemento
        ? elemento.value.trim()
        : "";
}


function renderizarDiagnostico(
    diagnostico
) {

    const area =
        document.getElementById(
            "diagnostico-area"
        );

    if (!area) return;

    area.innerHTML = `

        <div class="diag-item">
            <small>TESTAMENTO</small>
            <strong>
                ${escapeHTML(
                    diagnostico.testamento
                )}
            </strong>
        </div>

        <div class="diag-item">
            <small>IDIOMA</small>
            <strong>
                ${escapeHTML(
                    diagnostico.idiomaPrimario
                )}
            </strong>
        </div>

        <div class="diag-item">
            <small>GÊNERO</small>
            <strong>
                ${escapeHTML(
                    diagnostico.generoLiterario
                )}
            </strong>
        </div>

        <div class="diag-item">
            <small>STATUS</small>
            <strong>
                ${escapeHTML(
                    diagnostico.statusRoteamento
                )}
            </strong>
        </div>

        <div class="diag-item">
            <small>CONFIANÇA</small>
            <strong>
                ${escapeHTML(
                    diagnostico.confiancaDiagnostico
                )}
            </strong>
        </div>
    `;
}


function renderizarMatriz(
    diagnostico
) {

    const area =
        document.getElementById(
            "matriz-area"
        );

    if (!area) return;

    area.innerHTML = "";

    diagnostico.etapas.forEach(
        etapa => {

            const definicao =
                STAGES.find(
                    s => s.id === etapa.id
                );

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "matriz-item";

            div.innerHTML = `

                <b>
                    ${escapeHTML(etapa.id)}
                </b>

                <span>
                    ${escapeHTML(
                        definicao
                            ? definicao.nome
                            : etapa.id
                    )}
                </span>

                <small>
                    ${
                        etapa.acionada
                            ? "ACIONADA"
                            : "CONDICIONAL"
                    }
                </small>
            `;

            area.appendChild(div);
        }
    );
}


async function executarPesquisa(
    tema,
    passagem,
    diagnostico
) {

    const area =
        document.getElementById(
            "resultado-area"
        );

    if (!area) return;

    area.style.display = "block";

    area.innerHTML = `
        <h2>
            Pesquisa em preparação
        </h2>

        <p>
            O diagnóstico foi concluído.
            Os módulos serão executados somente
            quando seus contratos estiverem disponíveis.
        </p>
    `;

    const resultados = [];

    for (
        const etapa of diagnostico.etapas
    ) {

        if (!etapa.acionada) continue;

        const modulo =
            MODULOS[etapa.id];

        if (!modulo) {

            resultados.push({
                modulo: etapa.id,
                status: "MODULO_NAO_ENCONTRADO"
            });

            continue;
        }

        const funcao =
            encontrarExecutor(modulo);

        if (!funcao) {

            resultados.push({
                modulo: etapa.id,
                status: "CONTRATO_NAO_IMPLEMENTADO",
                observacao:
                    "O arquivo existe, mas não expõe uma função runANLxx."
            });

            continue;
        }

        try {

            const resultado =
                await funcao(
                    `${tema}${passagem ? ` (${passagem})` : ""}`
                );

            resultados.push({
                modulo: etapa.id,
                resultado
            });

        } catch (erro) {

            resultados.push({
                modulo: etapa.id,
                status: "ERROR",
                erro: erro.message
            });
        }
    }

    renderizarResultados(
        resultados
    );
}


function encontrarExecutor(
    modulo
) {

    const funcao =
        Object.entries(modulo)
            .find(
                ([nome, valor]) =>
                    /^runANL\d+$/.test(nome) &&
                    typeof valor === "function"
            );

    return funcao
        ? funcao[1]
        : null;
}


function renderizarResultados(
    resultados
) {

    const area =
        document.getElementById(
            "resultado-area"
        );

    if (!area) return;

    let html = `
        <h2>
            Resultado da investigação
        </h2>
    `;

    resultados.forEach(
        item => {

            html += `
                <section
                    style="
                        border:1px solid #263754;
                        border-radius:8px;
                        padding:15px;
                        margin:12px 0;
                    "
                >

                    <h3>
                        ${escapeHTML(
                            item.modulo
                        )}
                    </h3>
            `;

            if (item.resultado) {

                const resultado =
                    item.resultado;

                html += `

                    <p>
                        <strong>Status:</strong>
                        ${escapeHTML(
                            resultado.status ||
                            "INDETERMINADO"
                        )}
                    </p>

                    <p>
                        <strong>Fontes declaradas:</strong>
                        ${escapeHTML(
                            (
                                resultado.fontesDeclaradas ||
                                resultado.fontesUtilizadas ||
                                []
                            ).join(", ")
                        )}
                    </p>

                    <div
                        style="white-space:pre-wrap;"
                    >
                        ${escapeHTML(
                            resultado.resultado ||
                            "Sem resultado."
                        )}
                    </div>
                `;

            } else {

                html += `
                    <p>
                        ${escapeHTML(
                            item.status ||
                            item.observacao ||
                            item.erro ||
                            "Sem resultado."
                        )}
                    </p>
                `;
            }

            html += `
                </section>
            `;
        }
    );

    area.innerHTML = html;
}


function escapeHTML(
    valor
) {

    return String(valor ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
