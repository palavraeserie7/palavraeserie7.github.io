import { ETAPA01 } from "./etapa01-texto.js";


/**
 * ============================================================
 * MOTOR DE PESQUISA
 * ============================================================
 *
 * Este arquivo NÃO contém a lógica interna das etapas.
 *
 * Ele apenas coordena a pesquisa.
 *
 * Isso permite que cada etapa seja modificada posteriormente
 * sem alterar as demais.
 * ============================================================
 */


const MODULOS = Object.freeze({

    "ANL-01": ETAPA01

});


/**
 * ------------------------------------------------------------
 * EXECUTA UMA ETAPA ESPECÍFICA
 * ------------------------------------------------------------
 */

async function executarModulo(codigo, entrada) {

    const modulo = MODULOS[codigo];

    if (!modulo) {

        return {

            codigo,

            status: "NO_DATA",

            evidencias: [],

            achados: [],

            pendencias: [
                "Módulo ainda não implementado."
            ],

            limitacoes: [
                "Este módulo ainda não possui executor conectado."
            ]

        };

    }

    return await modulo.executar(entrada);
}


/**
 * ------------------------------------------------------------
 * EXECUTA PESQUISA
 *
 * No futuro:
 *
 * ANL-01
 * ANL-02
 * ANL-03
 * ...
 * ANL-12
 *
 * Cada uma será chamada independentemente.
 * ------------------------------------------------------------
 */

async function executarPesquisa(entrada) {

    const resultado = {};

    /*
     * Por enquanto somente ANL-01 está implementada.
     *
     * As outras etapas não interferem nela.
     */

    resultado["ANL-01"] =
        await executarModulo("ANL-01", entrada);


    /*
     * Estrutura preparada para as próximas etapas.
     *
     * Elas serão adicionadas uma por vez.
     */

    return resultado;
}


/**
 * ------------------------------------------------------------
 * API PÚBLICA
 * ------------------------------------------------------------
 */

export {

    executarPesquisa,

    executarModulo,

    MODULOS

};
