/*
 * ============================================================
 * MATRIZ DE ANÁLISE BÍBLICA
 * ENGINE — MOTOR INDEPENDENTE DOS 12 ANLs
 * ============================================================
 *
 * PRINCÍPIO ARQUITETURAL:
 *
 * 1. Cada ANL recebe diretamente o ALVO ORIGINAL.
 * 2. Um ANL NÃO depende do resultado de outro ANL.
 * 3. Falha de um ANL NÃO interrompe os demais.
 * 4. Resultado parcial é preservado.
 * 5. Ausência de fonte não é transformada em "COMPLETED".
 * 6. Nenhuma evidência é inventada.
 * 7. O motor registra exatamente o que foi obtido.
 * 8. ANL-12 pode trabalhar com os resultados disponíveis,
 *    mas não depende da conclusão dos outros.
 *
 * Estados permitidos:
 *
 * COMPLETED
 * PARTIAL
 * NO_DATA
 * ERROR
 *
 * ============================================================
 */


/* ============================================================
   CONFIGURAÇÃO
   ============================================================ */

const STATUS = Object.freeze({
    COMPLETED: "COMPLETED",
    PARTIAL: "PARTIAL",
    NO_DATA: "NO_DATA",
    ERROR: "ERROR"
});


const ENGINE_VERSION = "2.0.0-independent-anls";


/* ============================================================
   DESCRIÇÃO DOS 12 ANLs
   ============================================================ */

const ANL_DEFINITIONS = Object.freeze([

    {
        id: "ANL-01",
        titulo: "TEXTO E MANUSCRITOS",
        fontes: [
            "NA28",
            "BHS",
            "BHQ",
            "SBLGNT",
            "Septuaginta",
            "Testemunhos textuais"
        ]
    },

    {
        id: "ANL-02",
        titulo: "TRADUÇÃO E TEXTO ORIGINAL",
        fontes: [
            "Hebraico",
            "Aramaico",
            "Grego",
            "Septuaginta",
            "Traduções bíblicas"
        ]
    },

    {
        id: "ANL-03",
        titulo: "GRAMÁTICA E SINTAXE",
        fontes: [
            "Dados morfológicos",
            "Gramáticas hebraicas",
            "Gramáticas aramaicas",
            "Gramáticas gregas",
            "Dados sintáticos"
        ]
    },

    {
        id: "ANL-04",
        titulo: "PALAVRAS E SEMÂNTICA",
        fontes: [
            "BDAG",
            "HALOT",
            "BDB",
            "LSJ",
            "Strong",
            "Lemas",
            "Campos semânticos"
        ]
    },

    {
        id: "ANL-05",
        titulo: "SIGNIFICADO TEOLÓGICO",
        fontes: [
            "NIDNTTE",
            "NIDOTTE",
            "TDNT",
            "TDOT",
            "Teologia bíblica"
        ]
    },

    {
        id: "ANL-06",
        titulo: "EXEGESE E CONTEXTO LITERÁRIO",
        fontes: [
            "BECNT",
            "NIGTC",
            "NICNT",
            "Pillar",
            "WBC",
            "NICOT",
            "AOTC",
            "Baker OT"
        ]
    },

    {
        id: "ANL-07",
        titulo: "CONTEXTO HISTÓRICO, CULTURAL E RELIGIOSO",
        fontes: [
            "Zondervan Encyclopedia",
            "IVP Bible Background Commentary",
            "New Bible Dictionary",
            "ANET",
            "Context of Scripture",
            "Manners and Customs"
        ]
    },

    {
        id: "ANL-08",
        titulo: "CONTEXTO GEOGRÁFICO E POLÍTICO",
        fontes: [
            "Atlas bíblico",
            "Zondervan Atlas",
            "Arqueologia",
            "Fontes históricas",
            "Dados geográficos"
        ]
    },

    {
        id: "ANL-09",
        titulo: "RELAÇÃO COM O RESTANTE DA ESCRITURA",
        fontes: [
            "Beale",
            "Beale & Carson",
            "Vos",
            "Goldsworthy",
            "Schreiner"
        ]
    },

    {
        id: "ANL-10",
        titulo: "HERMENÊUTICA E CONTROLE",
        fontes: [
            "Grant Osborne",
            "D. A. Carson",
            "Carson & Moo",
            "Dillard & Longman",
            "Fee & Stuart"
        ]
    },

    {
        id: "ANL-11",
        titulo: "TEOLOGIA E COMPARAÇÃO",
        fontes: [
            "Grudem",
            "Berkhof",
            "Frame",
            "Evangelical Dictionary of Theology",
            "Comentários bíblicos"
        ]
    },

    {
        id: "ANL-12",
        titulo: "SÍNTESE",
        fontes: [
            "Base de evidências validada"
        ]
    }

]);


/* ============================================================
   UTILITÁRIOS
   ============================================================ */


/**
 * Converte qualquer valor para texto seguro.
 */
function normalizarTexto(valor) {

    if (valor === null || valor === undefined) {
        return "";
    }

    return String(valor).trim();
}


/**
 * Garante que um valor seja um array.
 */
function arraySeguro(valor) {

    return Array.isArray(valor)
        ? valor
        : [];
}


/**
 * Converte erro para uma estrutura serializável.
 */
function normalizarErro(erro) {

    if (!erro) {
        return null;
    }

    if (erro instanceof Error) {

        return {
            nome: erro.name || "Error",
            mensagem: erro.message || "Erro desconhecido."
        };

    }

    return {
        nome: "Error",
        mensagem: String(erro)
    };
}


/* ============================================================
   CRIAÇÃO DO ALVO ORIGINAL
   ============================================================ */


/**
 * Cria o alvo que será entregue diretamente a cada ANL.
 *
 * IMPORTANTE:
 * nenhum resultado de ANL anterior entra aqui.
 */
export function criarAlvo(tema = "", passagem = "", contexto = "") {

    const alvoTema = normalizarTexto(tema);
    const alvoPassagem = normalizarTexto(passagem);
    const alvoContexto = normalizarTexto(contexto);

    return Object.freeze({

        tema: alvoTema,

        passagem: alvoPassagem,

        alvo:
            alvoPassagem ||
            alvoTema,

        contexto: alvoContexto

    });
}


/* ============================================================
   NORMALIZAÇÃO DE RESULTADO
   ============================================================ */


/**
 * Normaliza qualquer resultado produzido por um ANL.
 *
 * Se o módulo devolver algo incompleto, o engine transforma
 * para o contrato padrão.
 */
export function normalizarResultadoANL(
    id,
    resultado,
    duracaoMs = 0
) {

    const definicao =
        ANL_DEFINITIONS.find(
            modulo => modulo.id === id
        );


    const titulo =
        resultado?.titulo ||
        definicao?.titulo ||
        id;


    let status =
        resultado?.status;


    const evidencias =
        arraySeguro(
            resultado?.evidencias
        );


    const achados =
        arraySeguro(
            resultado?.achados
        );


    const pendencias =
        arraySeguro(
            resultado?.pendencias
        );


    /*
     * Se o módulo não declarou status,
     * o engine determina um estado conservador.
     */

    if (!status) {

        if (
            evidencias.length > 0 ||
            achados.length > 0
        ) {

            status = STATUS.COMPLETED;

        } else {

            status = STATUS.NO_DATA;

        }

    }


    status =
        String(status).toUpperCase();


    /*
     * Nunca aceitar estado inexistente.
     */

    if (
        !Object.values(STATUS)
            .includes(status)
    ) {

        status = STATUS.ERROR;

    }


    /*
     * Se declarou COMPLETED mas não possui
     * nenhuma evidência nem achado, não vamos
     * permitir uma conclusão falsa.
     */

    if (
        status === STATUS.COMPLETED &&
        evidencias.length === 0 &&
        achados.length === 0
    ) {

        status = STATUS.NO_DATA;

    }


    return {

        id,

        titulo,

        status,

        entrada:
            resultado?.entrada || null,

        fontes:
            arraySeguro(
                resultado?.fontes
            ),

        evidencias,

        achados,

        pendencias,

        observacao:
            resultado?.observacao ||
            "",

        limitacoes:
            arraySeguro(
                resultado?.limitacoes
            ),

        erro:
            resultado?.erro || null,

        duracaoMs,

        engineVersion:
            ENGINE_VERSION

    };
}


/* ============================================================
   RESULTADO PADRÃO — SEM MOTOR/FONTE
   ============================================================ */


/**
 * Resultado utilizado quando o arquivo do ANL existe,
 * mas ainda não possui uma implementação real.
 */
export function criarResultadoSemDados(
    id,
    alvo
) {

    const definicao =
        ANL_DEFINITIONS.find(
            modulo => modulo.id === id
        );


    return {

        id,

        titulo:
            definicao?.titulo ||
            id,

        status:
            STATUS.NO_DATA,

        entrada: {
            alvo
        },

        fontes:
            definicao?.fontes || [],

        evidencias: [],

        achados: [],

        pendencias: [
            "Nenhuma fonte real foi conectada a este módulo.",
            "Nenhum resultado externo foi declarado como consultado."
        ],

        observacao:
            "O módulo recebeu o alvo original, mas não possui dados verificáveis disponíveis nesta execução.",

        limitacoes: [],

        erro: null

    };
}


/* ============================================================
   EXECUÇÃO DE UM ÚNICO ANL
   ============================================================ */


/**
 * Executa apenas UM ANL.
 *
 * Esta função é completamente independente dos demais.
 */
export async function executarANL(
    anl,
    alvo
) {

    const inicio =
        performance.now();


    const id =
        anl?.id ||
        "ANL-DESCONHECIDO";


    try {

        /*
         * O ANL precisa possuir uma função executável.
         */

        if (
            !anl ||
            typeof anl.executar !== "function"
        ) {

            const resultado =
                criarResultadoSemDados(
                    id,
                    alvo
                );


            return {

                ...resultado,

                duracaoMs:
                    Math.round(
                        performance.now() -
                        inicio
                    ),

                engineVersion:
                    ENGINE_VERSION

            };

        }


        /*
         * REGRA FUNDAMENTAL:
         *
         * somente o alvo original é enviado.
         *
         * Nenhum resultado anterior é enviado.
         */

        const resultado =
            await anl.executar(
                alvo
            );


        return normalizarResultadoANL(

            id,

            {
                ...resultado,

                entrada:
                    resultado?.entrada || {
                        alvo
                    }
            },

            Math.round(
                performance.now() -
                inicio
            )

        );

    }

    catch (erro) {

        /*
         * ERRO LOCAL.
         *
         * O erro fica registrado neste ANL.
         * Ele NÃO é lançado novamente.
         *
         * Isso impede que um ANL derrube os outros.
         */

        return {

            id,

            titulo:
                ANL_DEFINITIONS
                    .find(
                        modulo =>
                            modulo.id === id
                    )
                    ?.titulo ||
                id,

            status:
                STATUS.ERROR,

            entrada: {
                alvo
            },

            fontes: [],

            evidencias: [],

            achados: [],

            pendencias: [],

            observacao:
                "O módulo encontrou um erro durante sua execução.",

            limitacoes: [],

            erro:
                normalizarErro(
                    erro
                ),

            duracaoMs:
                Math.round(
                    performance.now() -
                    inicio
                ),

            engineVersion:
                ENGINE_VERSION

        };

    }

}


/* ============================================================
   EXECUÇÃO INDEPENDENTE DOS 12 ANLs
   ============================================================ */


/**
 * Executa todos os ANLs.
 *
 * IMPORTANTE:
 *
 * Cada ANL recebe o mesmo alvo original.
 *
 * Não existe:
 *
 * ANL-01 → ANL-02 → ANL-03
 *
 * Existe:
 *
 *                 ┌→ ANL-01
 *                 ├→ ANL-02
 *                 ├→ ANL-03
 * ALVO ORIGINAL ──┼→ ...
 *                 ├→ ANL-11
 *                 └→ ANL-12
 */
export async function executarTodosANLs(
    alvo,
    modulos
) {

    const lista =
        Array.isArray(modulos)
            ? modulos
            : [];


    const resultados = [];


    /*
     * Execução sequencial por enquanto.
     *
     * Isso permite acompanhar o progresso na interface.
     *
     * Mas a independência é preservada:
     * um erro nunca interrompe o próximo.
     */

    for (
        const anl
        of lista
    ) {

        const resultado =
            await executarANL(
                anl,
                alvo
            );


        resultados.push(
            resultado
        );

    }


    return resultados;

}


/* ============================================================
   EXECUÇÃO PARALELA OPCIONAL
   ============================================================ */


/**
 * Versão paralela.
 *
 * Cada ANL continua independente.
 *
 * Útil futuramente quando as fontes externas
 * estiverem conectadas e o desempenho for importante.
 */
export async function executarTodosANLsParalelo(
    alvo,
    modulos
) {

    const lista =
        Array.isArray(modulos)
            ? modulos
            : [];


    const promessas =
        lista.map(
            anl =>
                executarANL(
                    anl,
                    alvo
                )
        );


    /*
     * Promise.all aqui é seguro porque
     * executarANL captura seu próprio erro.
     */

    return Promise.all(
        promessas
    );

}


/* ============================================================
   CONTAGEM DOS ESTADOS
   ============================================================ */


/**
 * Conta os estados dos ANLs.
 */
export function contarEstados(
    resultados
) {

    const lista =
        arraySeguro(
            resultados
        );


    return {

        COMPLETED:
            lista.filter(
                resultado =>
                    resultado.status ===
                    STATUS.COMPLETED
            ).length,

        PARTIAL:
            lista.filter(
                resultado =>
                    resultado.status ===
                    STATUS.PARTIAL
            ).length,

        NO_DATA:
            lista.filter(
                resultado =>
                    resultado.status ===
                    STATUS.NO_DATA
            ).length,

        ERROR:
            lista.filter(
                resultado =>
                    resultado.status ===
                    STATUS.ERROR
            ).length

    };

}


/* ============================================================
   ESTADO GLOBAL DA INVESTIGAÇÃO
   ============================================================ */


/**
 * Determina o estado geral da pesquisa.
 *
 * IMPORTANTE:
 *
 * ERROR em um ANL não transforma tudo em ERROR.
 */
export function calcularEstadoGeral(
    resultados
) {

    const estados =
        contarEstados(
            resultados
        );


    const total =
        estados.COMPLETED +
        estados.PARTIAL +
        estados.NO_DATA +
        estados.ERROR;


    if (total === 0) {

        return STATUS.NO_DATA;

    }


    /*
     * Se pelo menos um resultado útil existe,
     * a investigação continua disponível.
     */

    if (
        estados.COMPLETED > 0 ||
        estados.PARTIAL > 0
    ) {

        if (
            estados.PARTIAL > 0 ||
            estados.ERROR > 0 ||
            estados.NO_DATA > 0
        ) {

            return STATUS.PARTIAL;

        }

        return STATUS.COMPLETED;

    }


    /*
     * Se todos falharam tecnicamente.
     */

    if (
        estados.ERROR === total
    ) {

        return STATUS.ERROR;

    }


    /*
     * Nenhum dado disponível, mas também
     * não houve erro técnico.
     */

    return STATUS.NO_DATA;

}


/* ============================================================
   CONSTRUÇÃO DO DOSSIÊ
   ============================================================ */


/**
 * Monta o objeto final da investigação.
 *
 * Não cria conclusões bíblicas.
 * Apenas consolida os resultados efetivamente obtidos.
 */
export function construirDossie(
    alvo,
    resultados
) {

    const estados =
        contarEstados(
            resultados
        );


    const estadoGeral =
        calcularEstadoGeral(
            resultados
        );


    return {

        engineVersion:
            ENGINE_VERSION,

        alvo,

        estado:
            estadoGeral,

        resumo: {

            total:
                resultados.length,

            completed:
                estados.COMPLETED,

            partial:
                estados.PARTIAL,

            noData:
                estados.NO_DATA,

            error:
                estados.ERROR

        },

        resultados:
            resultados.slice(),

        evidenciaTotal:
            resultados.reduce(
                (
                    total,
                    resultado
                ) =>
                    total +
                    arraySeguro(
                        resultado.evidencias
                    ).length,
                0
            ),

        achadosTotal:
            resultados.reduce(
                (
                    total,
                    resultado
                ) =>
                    total +
                    arraySeguro(
                        resultado.achados
                    ).length,
                0
            ),

        erros:
            resultados.filter(
                resultado =>
                    resultado.status ===
                    STATUS.ERROR
            ),

        limitacoes:
            resultados.flatMap(
                resultado =>
                    arraySeguro(
                        resultado.limitacoes
                    )
            )

    };

}


/* ============================================================
   SÍNTESE INDEPENDENTE
   ============================================================ */


/**
 * Prepara os dados que o ANL-12 poderá utilizar.
 *
 * ATENÇÃO:
 *
 * Isso NÃO transforma ANL-12 em dependente dos demais.
 *
 * O ANL-12 recebe o alvo original normalmente.
 *
 * Estes resultados são apenas uma base opcional
 * para síntese quando existirem.
 */
export function prepararBaseParaSintese(
    resultados
) {

    const lista =
        arraySeguro(
            resultados
        );


    return {

        resultadosDisponiveis:
            lista.map(
                resultado => ({

                    id:
                        resultado.id,

                    status:
                        resultado.status,

                    evidencias:
                        arraySeguro(
                            resultado.evidencias
                        ),

                    achados:
                        arraySeguro(
                            resultado.achados
                        ),

                    limitacoes:
                        arraySeguro(
                            resultado.limitacoes
                        )

                })
            ),

        evidenciasDisponiveis:
            lista.flatMap(
                resultado =>
                    arraySeguro(
                        resultado.evidencias
                    )
            ),

        achadosDisponiveis:
            lista.flatMap(
                resultado =>
                    arraySeguro(
                        resultado.achados
                    )

            )

    };

}


/* ============================================================
   EXECUÇÃO COMPLETA
   ============================================================ */


/**
 * Função principal do engine.
 *
 * Uso:
 *
 * const dossie = await executarPesquisa({
 *
 *     tema: "verbo",
 *     passagem: "João 1:1"
 *
 * });
 */
export async function executarPesquisa(
    {
        tema = "",
        passagem = "",
        contexto = ""
    } = {},
    modulos = []
) {

    const alvo =
        criarAlvo(
            tema,
            passagem,
            contexto
        );


    /*
     * Validação mínima.
     */

    if (
        !alvo.tema &&
        !alvo.passagem
    ) {

        return construirDossie(

            alvo,

            [

                {

                    id: "ENGINE",

                    titulo:
                        "MOTOR DE PESQUISA",

                    status:
                        STATUS.NO_DATA,

                    entrada:
                        { alvo },

                    fontes: [],

                    evidencias: [],

                    achados: [],

                    pendencias: [
                        "Informe um tema ou uma passagem."
                    ],

                    observacao:
                        "Nenhum alvo foi fornecido.",

                    limitacoes: [],

                    erro: null

                }

            ]

        );

    }


    /*
     * Executa os ANLs.
     */

    const resultados =
        await executarTodosANLs(
            alvo,
            modulos
        );


    /*
     * O ANL-12 poderá utilizar esta base
     * em uma implementação futura.
     *
     * Não alteramos o resultado dele aqui.
     */

    return construirDossie(
        alvo,
        resultados
    );

}


/* ============================================================
   API DE COMPATIBILIDADE
   ============================================================ */


/**
 * Alias para código existente.
 */
export const executarFluxo =
    executarPesquisa;


/**
 * Alias para código existente.
 */
export const executarInvestigacao =
    executarPesquisa;


/* ============================================================
   EXPORTAÇÕES
   ============================================================ */

export {

    STATUS,

    ENGINE_VERSION,

    ANL_DEFINITIONS

};
