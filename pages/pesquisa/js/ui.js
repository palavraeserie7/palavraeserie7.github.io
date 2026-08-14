/*
 * MATRIZ DE ANÁLISE BÍBLICA
 * UI — CONTROLADOR DA INTERFACE
 *
 * REGRA:
 * Cada ANL é independente.
 *
 * O alvo original é enviado diretamente para cada módulo.
 * Um erro em um ANL não interrompe os demais.
 */

import {
    executarInvestigacao
} from './engine.js';


/* =========================================================
   ELEMENTOS
   ========================================================= */

function elemento(id) {
    return document.getElementById(id);
}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escaparHTML(valor) {

    return String(valor ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

}


/* =========================================================
   STATUS
   ========================================================= */

function classeStatus(status) {

    const valor =
        String(status || 'NO_DATA').toUpperCase();

    return valor.toLowerCase();

}


/* =========================================================
   RENDERIZAÇÃO DO DIAGNÓSTICO
   ========================================================= */

function renderizarDiagnostico(investigacao) {

    const area =
        elemento('diagnostico-area');

    if (!area) return;


    const alvo =
        investigacao.alvo || {};


    const resumo =
        investigacao.resumo || {};


    area.innerHTML = `

        <div class="diag-item">
            <small>TEMA</small>
            <strong>
                ${escaparHTML(alvo.tema || '—')}
            </strong>
        </div>

        <div class="diag-item">
            <small>PASSAGEM</small>
            <strong>
                ${escaparHTML(alvo.passagem || '—')}
            </strong>
        </div>

        <div class="diag-item">
            <small>COMPLETED</small>
            <strong>
                ${resumo.COMPLETED || 0}
            </strong>
        </div>

        <div class="diag-item">
            <small>PARTIAL</small>
            <strong>
                ${resumo.PARTIAL || 0}
            </strong>
        </div>

        <div class="diag-item">
            <small>NO_DATA</small>
            <strong>
                ${resumo.NO_DATA || 0}
            </strong>
        </div>

        <div class="diag-item">
            <small>ERROR</small>
            <strong>
                ${resumo.ERROR || 0}
            </strong>
        </div>

    `;
}


/* =========================================================
   RENDERIZAÇÃO DOS 12 ANLs
   ========================================================= */

function renderizarMatriz(investigacao) {

    const area =
        elemento('matriz-area');

    if (!area) return;


    const resultados =
        Array.isArray(investigacao.resultados)
            ? investigacao.resultados
            : [];


    area.innerHTML =
        resultados.map(resultado => {

            const status =
                String(
                    resultado.status || 'NO_DATA'
                ).toUpperCase();


            const evidencias =
                Array.isArray(resultado.evidencias)
                    ? resultado.evidencias
                    : [];


            const achados =
                Array.isArray(resultado.achados)
                    ? resultado.achados
                    : [];


            const pendencias =
                Array.isArray(resultado.pendencias)
                    ? resultado.pendencias
                    : [];


            return `

                <div class="matriz-item">

                    <div>
                        <b style="color:#20d66b;">
                            ${escaparHTML(resultado.id)}
                        </b>

                        —

                        ${escaparHTML(resultado.titulo)}
                    </div>

                    <div style="
                        margin-top:8px;
                        font-weight:bold;
                        color:#18bfff;
                    ">
                        ${escaparHTML(status)}
                    </div>

                    <div style="
                        margin-top:8px;
                        color:#9db0c9;
                    ">

                        Evidências:
                        ${evidencias.length}

                        ·

                        Achados:
                        ${achados.length}

                        ·

                        Pendências:
                        ${pendencias.length}

                    </div>

                </div>

            `;

        }).join('');


    /*
     * Caso nenhum resultado tenha sido produzido.
     */

    if (!area.innerHTML.trim()) {

        area.innerHTML = `
            <div style="color:#71849c;padding:10px;">
                Nenhum resultado disponível.
            </div>
        `;

    }

}


/* =========================================================
   RENDERIZAÇÃO DO DOSSIÊ
   ========================================================= */

function renderizarDossie(investigacao) {

    const area =
        elemento('resultado-area');

    if (!area) return;


    const alvo =
        investigacao.alvo || {};


    const resumo =
        investigacao.resumo || {};


    area.style.display = 'block';


    area.innerHTML = `

        <h2>Dossiê de Pesquisa</h2>

        <p>
            <strong>Tema:</strong>
            ${escaparHTML(alvo.tema || '—')}
        </p>

        <p>
            <strong>Passagem:</strong>
            ${escaparHTML(alvo.passagem || '—')}
        </p>

        <hr>

        <h3>Estado da investigação</h3>

        <p>
            COMPLETED:
            <strong>${resumo.COMPLETED || 0}</strong>
        </p>

        <p>
            PARTIAL:
            <strong>${resumo.PARTIAL || 0}</strong>
        </p>

        <p>
            NO_DATA:
            <strong>${resumo.NO_DATA || 0}</strong>
        </p>

        <p>
            ERROR:
            <strong>${resumo.ERROR || 0}</strong>
        </p>

        <p>
            <strong>Estado final:</strong>
            ${escaparHTML(investigacao.status)}
        </p>

    `;

}


/* =========================================================
   EXECUÇÃO
   ========================================================= */

async function iniciarMatriz() {

    const temaInput =
        elemento('tema-input');

    const passagemInput =
        elemento('passagem-input');


    const tema =
        temaInput
            ? temaInput.value.trim()
            : '';


    const passagem =
        passagemInput
            ? passagemInput.value.trim()
            : '';


    if (!tema && !passagem) {

        alert(
            'Informe um tema ou uma passagem bíblica.'
        );

        return;
    }


    const diagnostico =
        elemento('diagnostico-area');

    const matriz =
        elemento('matriz-area');

    const resultado =
        elemento('resultado-area');


    if (diagnostico) {

        diagnostico.innerHTML = `
            <div class="loading">
                Iniciando investigação...
            </div>
        `;

    }


    if (matriz) {

        matriz.innerHTML = `
            <div class="loading">
                Os ANLs estão sendo executados
                independentemente...
            </div>
        `;

    }


    if (resultado) {

        resultado.style.display = 'none';

        resultado.innerHTML = '';

    }


    try {

        const investigacao =
            await executarInvestigacao(
                tema,
                passagem
            );


        renderizarDiagnostico(
            investigacao
        );


        renderizarMatriz(
            investigacao
        );


        renderizarDossie(
            investigacao
        );


        console.log(
            'Investigação concluída:',
            investigacao
        );


    } catch (erro) {

        console.error(
            'Erro geral da investigação:',
            erro
        );


        if (diagnostico) {

            diagnostico.innerHTML = `

                <div style="
                    color:#ff6b6b;
                    padding:10px;
                ">

                    Erro de execução:

                    ${escaparHTML(
                        erro?.message ||
                        'Erro desconhecido.'
                    )}

                </div>

            `;

        }

    }

}


/* =========================================================
   BOTÃO
   ========================================================= */

const botao =
    document.querySelector(
        '[data-analisar]'
    );


if (botao) {

    botao.addEventListener(
        'click',
        iniciarMatriz
    );

}


/* =========================================================
   EXPORTAÇÃO
   ========================================================= */

export {
    iniciarMatriz
};
