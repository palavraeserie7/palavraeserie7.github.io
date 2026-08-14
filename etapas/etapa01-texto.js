/**
 * ============================================================
 * PALAVRA & SÉRIE
 * ETAPA 01 — TEXTO
 * ============================================================
 *
 * Responsabilidade:
 *   Investigar exclusivamente o texto bíblico e seus
 *   representantes textuais disponíveis.
 *
 * Fontes previstas:
 *   - NA28
 *   - BHS/BHQ
 *   - SBLGNT
 *   - Septuaginta
 *   - Textus Receptus / Scrivener
 *
 * IMPORTANTE:
 *   Este módulo é independente das demais etapas.
 *
 *   Não realiza:
 *   - crítica textual completa
 *   - gramática
 *   - semântica
 *   - teologia
 *   - exegese
 *   - contexto histórico
 *   - síntese
 *
 *   Também NÃO declara uma fonte como consultada apenas porque
 *   ela está cadastrada neste módulo.
 * ============================================================
 */

const ETAPA_01_CONFIG = Object.freeze({
    id: "ETAPA-01",
    codigo: "ANL-01",
    titulo: "TEXTO",

    fontes: Object.freeze([
        {
            id: "NA28",
            nome: "NA28",
            dominio: "Novo Testamento",
            idioma: "Grego"
        },
        {
            id: "BHS_BHQ",
            nome: "BHS / BHQ",
            dominio: "Antigo Testamento",
            idioma: "Hebraico"
        },
        {
            id: "SBLGNT",
            nome: "SBLGNT",
            dominio: "Novo Testamento",
            idioma: "Grego"
        },
        {
            id: "LXX",
            nome: "Septuaginta",
            dominio: "Antigo Testamento / Grego",
            idioma: "Grego"
        },
        {
            id: "TR_SCRIVENER",
            nome: "Textus Receptus / Scrivener",
            dominio: "Novo Testamento",
            idioma: "Grego"
        }
    ])
});


/**
 * ------------------------------------------------------------
 * ESTADOS PADRONIZADOS
 * ------------------------------------------------------------
 */

const STATUS_ETAPA_01 = Object.freeze({
    COMPLETED: "COMPLETED",
    PARTIAL: "PARTIAL",
    NO_DATA: "NO_DATA",
    ERROR: "ERROR"
});


/**
 * ------------------------------------------------------------
 * NORMALIZAÇÃO DA ENTRADA
 * ------------------------------------------------------------
 */

function normalizarEntradaEtapa01(entrada = {}) {

    return {
        tema: String(entrada.tema || "").trim(),

        passagem: String(entrada.passagem || "").trim(),

        contexto: String(entrada.contexto || "").trim()
    };
}


/**
 * ------------------------------------------------------------
 * CRIA REGISTRO DE FONTE
 *
 * Nenhuma fonte é considerada consultada automaticamente.
 * ------------------------------------------------------------
 */

function criarRegistroFonte(fonte) {

    return {
        id: fonte.id,

        nome: fonte.nome,

        dominio: fonte.dominio,

        idioma: fonte.idioma,

        status: STATUS_ETAPA_01.NO_DATA,

        consultada: false,

        evidencias: [],

        achados: [],

        observacao:
            "Fonte cadastrada, mas nenhuma consulta real foi realizada."
    };
}


/**
 * ------------------------------------------------------------
 * CRIA RESULTADO VAZIO
 * ------------------------------------------------------------
 */

function criarResultadoVazio(entrada) {

    return {

        id: ETAPA_01_CONFIG.id,

        codigo: ETAPA_01_CONFIG.codigo,

        titulo: ETAPA_01_CONFIG.titulo,

        status: STATUS_ETAPA_01.NO_DATA,

        entrada,

        fontes: ETAPA_01_CONFIG.fontes.map(criarRegistroFonte),

        evidencias: [],

        achados: [],

        pendencias: [
            "Nenhuma fonte textual foi conectada.",
            "Nenhum texto bíblico foi recuperado.",
            "Nenhuma evidência textual foi registrada."
        ],

        limitacoes: [
            "A etapa não inventa texto bíblico.",
            "A etapa não considera uma fonte consultada apenas por estar cadastrada.",
            "A etapa não substitui uma edição crítica."
        ]
    };
}


/**
 * ------------------------------------------------------------
 * VERIFICA SE EXISTE DADO TEXTUAL REAL
 *
 * Esta função ficará preparada para receber posteriormente
 * os conectores reais das bases.
 * ------------------------------------------------------------
 */

function possuiDadosTextuais(resultado) {

    return resultado.fontes.some(
        fonte =>
            fonte.consultada === true &&
            fonte.evidencias.length > 0
    );
}


/**
 * ------------------------------------------------------------
 * CALCULA STATUS
 * ------------------------------------------------------------
 */

function calcularStatusEtapa01(resultado) {

    const fontes = resultado.fontes;

    const consultadas = fontes.filter(
        fonte => fonte.consultada === true
    );

    const comDados = fontes.filter(
        fonte =>
            fonte.consultada === true &&
            fonte.evidencias.length > 0
    );

    if (resultado.status === STATUS_ETAPA_01.ERROR) {
        return STATUS_ETAPA_01.ERROR;
    }

    if (comDados.length === 0) {
        return STATUS_ETAPA_01.NO_DATA;
    }

    if (comDados.length === fontes.length) {
        return STATUS_ETAPA_01.COMPLETED;
    }

    if (consultadas.length > 0) {
        return STATUS_ETAPA_01.PARTIAL;
    }

    return STATUS_ETAPA_01.NO_DATA;
}


/**
 * ------------------------------------------------------------
 * EXECUTOR DA ETAPA
 *
 * Este é o ponto principal que futuramente receberá os
 * conectores das bases textuais.
 * ------------------------------------------------------------
 */

async function executarEtapa01(entrada = {}) {

    const alvo = normalizarEntradaEtapa01(entrada);

    const resultado = criarResultadoVazio(alvo);

    try {

        /*
         * ------------------------------------------------------
         * VALIDAÇÃO
         * ------------------------------------------------------
         */

        if (!alvo.passagem && !alvo.tema) {

            resultado.status = STATUS_ETAPA_01.NO_DATA;

            resultado.pendencias = [
                "Informe uma passagem bíblica ou um tema.",
                ...resultado.pendencias
            ];

            return resultado;
        }


        /*
         * ------------------------------------------------------
         * IMPORTANTE
         *
         * NÃO colocamos aqui dados inventados.
         *
         * Os conectores reais das fontes serão adicionados
         * posteriormente.
         * ------------------------------------------------------
         */

        resultado.status = calcularStatusEtapa01(resultado);

        return resultado;

    } catch (erro) {

        return {

            ...resultado,

            status: STATUS_ETAPA_01.ERROR,

            erro: {
                mensagem:
                    erro instanceof Error
                        ? erro.message
                        : String(erro)
            },

            pendencias: [
                "A execução da etapa encontrou um erro.",
                "Verificar o conector da fonte textual."
            ]
        };
    }
}


/**
 * ------------------------------------------------------------
 * API PÚBLICA DA ETAPA
 *
 * Somente estas funções ficam disponíveis para o restante
 * da aplicação.
 * ------------------------------------------------------------
 */

const ETAPA01 = Object.freeze({

    config: ETAPA_01_CONFIG,

    status: STATUS_ETAPA_01,

    executar: executarEtapa01,

    criarResultadoVazio,

    normalizarEntrada: normalizarEntradaEtapa01
});


/**
 * ------------------------------------------------------------
 * EXPORTAÇÃO
 * ------------------------------------------------------------
 */

export {

    ETAPA01,

    ETAPA_01_CONFIG,

    STATUS_ETAPA_01,

    executarEtapa01

};
