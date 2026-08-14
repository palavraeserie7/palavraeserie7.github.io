import { executarPesquisa } from "./pesquisa.js";


/**
 * ============================================================
 * INTERFACE DO USUÁRIO
 * ============================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    const botao =
        document.querySelector("[data-analisar]");

    if (!botao) {
        console.error(
            "Botão [data-analisar] não encontrado."
        );

        return;
    }


    botao.addEventListener("click", iniciarPesquisa);

});


/**
 * ------------------------------------------------------------
 * OBTÉM OS DADOS DA INTERFACE
 * ------------------------------------------------------------
 */

function obterEntrada() {

    /*
     * Estes seletores são tolerantes.
     *
     * Caso seu HTML utilize IDs diferentes, podemos adaptar
     * depois sem alterar o motor das etapas.
     */

    const campoTema =
        document.querySelector(
            "#tema, [name='tema'], [data-tema]"
        );

    const campoPassagem =
        document.querySelector(
            "#passagem, [name='passagem'], [data-passagem]"
        );

    const campoContexto =
        document.querySelector(
            "#contexto, [name='contexto'], [data-contexto]"
        );


    return {

        tema:
            campoTema?.value?.trim() || "",

        passagem:
            campoPassagem?.value?.trim() || "",

        contexto:
            campoContexto?.value?.trim() || ""

    };

}


/**
 * ------------------------------------------------------------
 * EXECUTA PESQUISA
 * ------------------------------------------------------------
 */

async function iniciarPesquisa() {

    const entrada = obterEntrada();


    /*
     * Evita pesquisa completamente vazia.
     */

    if (!entrada.tema && !entrada.passagem) {

        console.warn(
            "Informe um tema ou uma passagem."
        );

        return;

    }


    const botao =
        document.querySelector("[data-analisar]");


    if (botao) {

        botao.disabled = true;

        botao.textContent = "ANALISANDO...";

    }


    try {

        const resultados =
            await executarPesquisa(entrada);


        console.log(
            "RESULTADO DA PESQUISA:",
            resultados
        );


        /*
         * Renderização provisória.
         *
         * Depois substituiremos por uma interface mais
         * sofisticada sem alterar os módulos.
         */

        renderizarResultado(resultados);

    } catch (erro) {

        console.error(
            "Erro durante a pesquisa:",
            erro
        );

    } finally {

        if (botao) {

            botao.disabled = false;

            botao.textContent = "ANALISAR";

        }

    }

}


/**
 * ------------------------------------------------------------
 * RENDERIZA RESULTADO
 * ------------------------------------------------------------
 */

function renderizarResultado(resultados) {

    const etapa =
        resultados["ANL-01"];


    if (!etapa) {
        return;
    }


    /*
     * Procura uma área existente para o resultado.
     */

    const destino =
        document.querySelector(
            "[data-resultados], #resultados, #resultado"
        );


    if (!destino) {

        console.warn(
            "Área de resultados não encontrada."
        );

        return;

    }


    destino.innerHTML = "";


    const titulo =
        document.createElement("h3");

    titulo.textContent =
        "ANL-01 — TEXTO";


    const status =
        document.createElement("strong");

    status.textContent =
        etapa.status;


    const info =
        document.createElement("p");

    info.textContent =
        `Evidências: ${etapa.evidencias.length} · ` +
        `Achados: ${etapa.achados.length} · ` +
        `Pendências: ${etapa.pendencias.length}`;


    destino.appendChild(titulo);

    destino.appendChild(status);

    destino.appendChild(info);


    /*
     * Fontes
     */

    const fontes =
        document.createElement("div");


    etapa.fontes.forEach(fonte => {

        const item =
            document.createElement("div");

        item.innerHTML = `
            <strong>${fonte.nome}</strong>
            — ${fonte.status}
        `;

        fontes.appendChild(item);

    });


    destino.appendChild(fontes);

}


export {

    iniciarPesquisa,

    obterEntrada,

    renderizarResultado

};
