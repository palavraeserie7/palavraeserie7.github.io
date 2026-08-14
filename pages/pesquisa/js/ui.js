/**
 * ============================================================
 * PALAVRA & SÉRIE
 * MATRIZ DE ANÁLISE BÍBLICA
 *
 * UI ORCHESTRATOR
 * ============================================================
 *
 * Regra arquitetural:
 *
 * - ANL-01 até ANL-12 são permanentes.
 * - Cada ANL é independente.
 * - Falta de fonte NÃO bloqueia outro ANL.
 * - Falta de implementação NÃO derruba a pesquisa inteira.
 * - Erro de um ANL fica registrado somente naquele ANL.
 * - Resultado parcial é válido e deve ser informado como parcial.
 * - ANL-12 consolida o que realmente foi obtido.
 *
 * IMPORTANTE:
 * Este arquivo NÃO contém chave de API.
 * Este arquivo NÃO acessa Supabase diretamente.
 * Este arquivo NÃO contém lógica de negócio.
 * ============================================================
 */

import { STAGES } from "./stages.js";


// ============================================================
// CONFIGURAÇÃO DOS 12 ANLs
// ============================================================

const ANL_MODULES = [
    {
        id: "ANL-01",
        file: "../../../etapas/anl-01.js",
        possibleExports: ["runANL01", "run01", "ANL_01", "anl01"]
    },
    {
        id: "ANL-02",
        file: "../../../etapas/anl-02.js",
        possibleExports: ["runANL02", "run02", "run01", "ANL_02", "anl02"]
    },
    {
        id: "ANL-03",
        file: "../../../etapas/anl-03.js",
        possibleExports: ["runANL03", "run03", "ANL_03", "anl03"]
    },
    {
        id: "ANL-04",
        file: "../../../etapas/anl-04.js",
        possibleExports: ["runANL04", "run04", "ANL_04", "anl04"]
    },
    {
        id: "ANL-05",
        file: "../../../etapas/anl-05.js",
        possibleExports: ["runANL05", "run05", "ANL_05", "anl05"]
    },
    {
        id: "ANL-06",
        file: "../../../etapas/anl-06.js",
        possibleExports: ["runANL06", "run06", "ANL_06", "anl06"]
    },
    {
        id: "ANL-07",
        file: "../../../etapas/anl-07.js",
        possibleExports: ["runANL07", "run07", "ANL_07", "anl07"]
    },
    {
        id: "ANL-08",
        file: "../../../etapas/anl-08.js",
        possibleExports: ["runANL08", "run08", "ANL_08", "anl08"]
    },
    {
        id: "ANL-09",
        file: "../../../etapas/anl-09.js",
        possibleExports: ["runANL09", "run09", "ANL_09", "anl09"]
    },
    {
        id: "ANL-10",
        file: "../../../etapas/anl-10.js",
        possibleExports: ["runANL10", "run10", "ANL_10", "anl10"]
    },
    {
        id: "ANL-11",
        file: "../../../etapas/anl-11.js",
        possibleExports: ["runANL11", "run11", "ANL_11", "anl11"]
    },
    {
        id: "ANL-12",
        file: "../../../etapas/anl-12.js",
        possibleExports: ["runANL12", "run12", "ANL_12", "anl12"]
    }
];


// ============================================================
// ESTADO DA PESQUISA
// ============================================================

let pesquisaAtual = {
    tema: "",
    passagem: "",
    diagnostico: null,
    resultados: []
};


// ============================================================
// UTILIDADES
// ============================================================

function escapeHTML(valor) {
    return String(valor ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function obterStage(id) {
    return STAGES.find(stage => stage.id === id) || null;
}


function obterElemento(id) {
    return document.getElementById(id);
}


function obterEntrada() {

    const tema =
        obterElemento("tema-input")?.value?.trim() || "";

    const passagem =
        obterElemento("passagem-input")?.value?.trim() || "";

    return {
        tema,
        passagem
    };
}


// ============================================================
// DIAGNÓSTICO
// ============================================================

function diagnosticar(tema, passagem) {

    const texto = `${tema} ${passagem}`.trim();

    let testamento = "NÃO DETERMINADO";
    let idiomaOriginal = "NÃO DETERMINADO";

    /*
     * Esta classificação é apenas diagnóstico inicial.
     * NÃO é evidência exegética.
     */

    const nt = [
        "mateus",
        "marcos",
        "lucas",
        "joão",
        "joao",
        "atos",
        "romanos",
        "coríntios",
        "corintios",
        "gálatas",
        "galatas",
        "efésios",
        "efesios",
        "filipenses",
        "colossenses",
        "tessalonicenses",
        "timóteo",
        "timoteo",
        "tito",
        "filemom",
        "hebreus",
        "tiago",
        "pedro",
        "judas",
        "apocalipse"
    ];

    const at = [
        "gênesis",
        "genesis",
        "êxodo",
        "exodo",
        "levítico",
        "levitico",
        "números",
        "numeros",
        "deuteronômio",
        "deuteronomio",
        "josué",
        "josue",
        "juízes",
        "juizes",
        "rute",
        "samuel",
        "reis",
        "crônicas",
        "cronicas",
        "esdras",
        "neemias",
        "ester",
        "jó",
        "jo",
        "salmos",
        "salmo",
        "provérbios",
        "proverbios",
        "eclesiastes",
        "cantares",
        "isaías",
        "isaias",
        "jeremias",
        "lamentações",
        "lamentacoes",
        "ezequiel",
        "daniel",
        "oseias",
        "joel",
        "amós",
        "amos",
        "obadias",
        "jonas",
        "miquéias",
        "miqueias",
        "naum",
        "habacuque",
        "sofonias",
        "ageu",
        "zacarias",
        "malaquias"
    ];

    const textoLower = texto.toLowerCase();

    if (nt.some(nome => textoLower.includes(nome))) {
        testamento = "NOVO";
        idiomaOriginal = "GREGO";
    }

    if (at.some(nome => textoLower.includes(nome))) {
        testamento = "ANTIGO";
        idiomaOriginal = "HEBRAICO";
    }

    return {
        testamento,
        idiomaOriginal,
        roteamento: "12 ANLs",
        status: "DIAGNOSTICADO"
    };
}


// ============================================================
// RENDERIZA DIAGNÓSTICO
// ============================================================

function renderizarDiagnostico(diagnostico) {

    const area = obterElemento("diagnostico-area");

    if (!area) return;

    area.innerHTML = `
        <div class="diag-item">
            <small>TESTAMENTO</small>
            <strong>${escapeHTML(diagnostico.testamento)}</strong>
        </div>

        <div class="diag-item">
            <small>IDIOMA ORIGINAL</small>
            <strong>${escapeHTML(diagnostico.idiomaOriginal)}</strong>
        </div>

        <div class="diag-item">
            <small>ROTEAMENTO</small>
            <strong>12 ANLs</strong>
        </div>

        <div class="diag-item">
            <small>STATUS</small>
            <strong>${escapeHTML(diagnostico.status)}</strong>
        </div>
    `;
}


// ============================================================
// MATRIZ VISUAL
// ============================================================

function renderizarMatrizInicial() {

    const area = obterElemento("matriz-area");

    if (!area) return;

    area.innerHTML = STAGES.map(stage => {

        const fontes = obterFontes(stage.id);

        return `
            <div
                class="matriz-item"
                id="matriz-${stage.id}"
                data-anl="${stage.id}"
            >

                <div style="margin-bottom:8px;">
                    <b style="color:#20d66b;">
                        ${escapeHTML(stage.id)}
                    </b>

                    <span
                        style="
                            float:right;
                            font-size:.65rem;
                            color:#778ba5;
                        "
                        data-status="${stage.id}"
                    >
                        PENDING
                    </span>
                </div>

                <div style="
                    color:#dbe7f5;
                    font-weight:bold;
                    margin-bottom:7px;
                ">
                    ${escapeHTML(stage.nome)}
                </div>

                <div style="
                    color:#9eb1c9;
                    line-height:1.5;
                ">
                    ${fontes}
                </div>

            </div>
        `;

    }).join("");
}


// ============================================================
// FONTES CONHECIDAS DA MATRIZ
// ============================================================

function obterFontes(id) {

    const fontes = {

        "ANL-01":
            "NA28 · BHS · BHQ · SBLGNT · Septuaginta · Metzger",

        "ANL-02":
            "Hebraico · Aramaico · Grego · Septuaginta · Traduções",

        "ANL-03":
            "Morfologia · Sintaxe · Verbos · Tempos · Voz · Modo",

        "ANL-04":
            "BDAG · HALOT · BDB · LSJ · Lemas · Campo semântico",

        "ANL-05":
            "NIDNTTE · NIDOTTE · TDNT · TDOT",

        "ANL-06":
            "BECNT · NIGTC · NICNT · Pillar · WBC · NICOT",

        "ANL-07":
            "Zondervan · IVP · New Bible Dictionary · ANET · COS",

        "ANL-08":
            "Atlas Bíblico · Arqueologia · Geografia · Política",

        "ANL-09":
            "Beale · Carson · Vos · Goldsworthy · Schreiner",

        "ANL-10":
            "Osborne · Carson · Fee & Stuart · Dillard & Longman",

        "ANL-11":
            "Grudem · Berkhof · Frame · EDT · Comparação",

        "ANL-12":
            "Evidências · Conclusões · Incertezas · Síntese"
    };

    return fontes[id] || "Fontes previstas na matriz.";
}


// ============================================================
// STATUS VISUAL
// ============================================================

function atualizarStatus(id, status) {

    const elemento =
        document.querySelector(`[data-status="${id}"]`);

    if (!elemento) return;

    elemento.textContent = status;

    if (status === "RUNNING") {
        elemento.style.color = "#20d66b";
    }

    if (status === "COMPLETED") {
        elemento.style.color = "#20d66b";
    }

    if (status === "PARTIAL") {
        elemento.style.color = "#ffd166";
    }

    if (status === "NO_DATA") {
        elemento.style.color = "#9eb1c9";
    }

    if (status === "ERROR") {
        elemento.style.color = "#ff6b6b";
    }
}


// ============================================================
// CARREGAMENTO SEGURO DE UM ANL
// ============================================================

async function carregarModulo(modulo) {

    try {

        const module = await import(modulo.file);

        for (const nome of modulo.possibleExports) {

            if (typeof module[nome] === "function") {

                return {
                    tipo: "FUNCTION",
                    executar: module[nome]
                };
            }
        }

        /*
         * Alguns ANLs atualmente existem apenas como
         * objetos de definição.
         *
         * Isso NÃO é erro.
         *
         * Significa que o módulo está arquiteturalmente
         * definido, mas ainda não possui executor.
         */

        for (const nome of modulo.possibleExports) {

            if (module[nome] && typeof module[nome] === "object") {

                return {
                    tipo: "DEFINITION",
                    definicao: module[nome]
                };
            }
        }

        return {
            tipo: "NO_EXECUTOR"
        };

    } catch (erro) {

        return {
            tipo: "LOAD_ERROR",
            erro: erro.message
        };
    }
}


// ============================================================
// EXECUÇÃO INDEPENDENTE DE UM ANL
// ============================================================

async function executarModulo(modulo, entrada, contexto = "") {

    atualizarStatus(modulo.id, "RUNNING");

    const carregado = await carregarModulo(modulo);

    /*
     * Módulo definido, mas ainda sem função executora.
     */

    if (carregado.tipo === "DEFINITION") {

        atualizarStatus(modulo.id, "NO_DATA");

        return {
            id: modulo.id,
            status: "NO_DATA",
            resultado: null,
            fontes: [],
            limitacoes: [
                "O módulo está definido na arquitetura,",
                "mas ainda não possui executor de pesquisa."
            ]
        };
    }


    /*
     * Arquivo carregou, mas não existe executor.
     */

    if (carregado.tipo === "NO_EXECUTOR") {

        atualizarStatus(modulo.id, "NO_DATA");

        return {
            id: modulo.id,
            status: "NO_DATA",
            resultado: null,
            fontes: [],
            limitacoes: [
                "Nenhum executor disponível neste momento."
            ]
        };
    }


    /*
     * Erro ao carregar o arquivo.
     */

    if (carregado.tipo === "LOAD_ERROR") {

        atualizarStatus(modulo.id, "ERROR");

        return {
            id: modulo.id,
            status: "ERROR",
            resultado: null,
            fontes: [],
            limitacoes: [
                `Falha ao carregar o módulo: ${carregado.erro}`
            ]
        };
    }


    /*
     * Executor encontrado.
     *
     * Cada módulo recebe sua própria entrada.
     * Nenhum módulo depende do sucesso de outro.
     */

    try {

        const alvo = {

            tema: entrada.tema,
            passagem: entrada.passagem,

            /*
             * compatibilidade com módulos antigos
             */
            alvo:
                entrada.passagem ||
                entrada.tema,

            contexto
        };


        let resposta;

        /*
         * Primeira tentativa:
         * novo contrato baseado em objeto.
         */

        try {

            resposta = await carregado.executar(alvo);

        } catch (primeiroErro) {

            /*
             * Compatibilidade com módulos antigos:
             * função(tema/passagem, contexto)
             */

            resposta = await carregado.executar(
                entrada.passagem || entrada.tema,
                contexto
            );
        }


        /*
         * Normalização da resposta.
         */

        if (!resposta) {

            atualizarStatus(modulo.id, "NO_DATA");

            return {
                id: modulo.id,
                status: "NO_DATA",
                resultado: null,
                fontes: [],
                limitacoes: [
                    "O módulo executou, mas não retornou evidência."
                ]
            };
        }


        const status =
            resposta.status ||
            "COMPLETED";


        const resultado =
            resposta.resultado ??
            resposta.result ??
            resposta.data ??
            resposta;


        atualizarStatus(
            modulo.id,
            status
        );


        return {
            id: modulo.id,
            status,
            resultado,
            fontes:
                resposta.fontes ||
                resposta.sources ||
                [],
            limitacoes:
                resposta.limitacoes ||
                resposta.limitations ||
                []
        };


    } catch (erro) {

        /*
         * Um ANL quebrado NÃO derruba a pesquisa.
         */

        atualizarStatus(
            modulo.id,
            "ERROR"
        );

        return {
            id: modulo.id,
            status: "ERROR",
            resultado: null,
            fontes: [],
            limitacoes: [
                erro.message
            ]
        };
    }
}


// ============================================================
// EXECUÇÃO DOS ANLs
// ============================================================

async function executarMatriz(entrada) {

    /*
     * ANL-01 até ANL-11 são independentes.
     *
     * Eles podem pesquisar simultaneamente.
     *
     * Um não espera o outro para funcionar.
     */

    const modulosBase =
        ANL_MODULES.slice(0, 11);


    const resultados =
        await Promise.all(
            modulosBase.map(
                modulo =>
                    executarModulo(
                        modulo,
                        entrada
                    )
            )
        );


    /*
     * ANL-12 é a síntese.
     *
     * Ele recebe os resultados obtidos,
     * inclusive resultados parciais,
     * erros e ausência de dados.
     */

    const contextoFinal =
        JSON.stringify(
            resultados,
            null,
            2
        );


    const resultado12 =
        await executarModulo(
            ANL_MODULES[11],
            entrada,
            contextoFinal
        );


    return [
        ...resultados,
        resultado12
    ];
}


// ============================================================
// DOSSIÊ FINAL
// ============================================================

function renderizarDossie(
    entrada,
    resultados
) {

    const area =
        obterElemento("resultado-area");

    if (!area) return;


    const completos =
        resultados.filter(
            r =>
                r.status === "COMPLETED"
        ).length;


    const parciais =
        resultados.filter(
            r =>
                r.status === "PARTIAL"
        ).length;


    const semDados =
        resultados.filter(
            r =>
                r.status === "NO_DATA"
        ).length;


    const erros =
        resultados.filter(
            r =>
                r.status === "ERROR"
        ).length;


    area.style.display = "block";


    area.innerHTML = `

        <h2>Dossiê de Pesquisa</h2>

        <p>
            <strong>Tema:</strong>
            ${escapeHTML(entrada.tema || "—")}
        </p>

        <p>
            <strong>Passagem:</strong>
            ${escapeHTML(entrada.passagem || "—")}
        </p>


        <hr style="
            border:0;
            border-top:1px solid #263754;
            margin:20px 0;
        ">


        <h3 style="color:#18bfff;">
            Estado da investigação
        </h3>


        <p>
            COMPLETED:
            <strong>${completos}</strong>
        </p>

        <p>
            PARTIAL:
            <strong>${parciais}</strong>
        </p>

        <p>
            NO_DATA:
            <strong>${semDados}</strong>
        </p>

        <p>
            ERROR:
            <strong>${erros}</strong>
        </p>


        <hr style="
            border:0;
            border-top:1px solid #263754;
            margin:20px 0;
        ">


        <h3 style="color:#20d66b;">
            Resultados disponíveis
        </h3>


        ${resultados.map(renderizarResultado).join("")}


    `;
}


// ============================================================
// RESULTADO INDIVIDUAL
// ============================================================

function renderizarResultado(resultado) {

    const stage =
        obterStage(resultado.id);


    let conteudo = "";


    if (resultado.resultado) {

        conteudo =
            typeof resultado.resultado === "string"
                ? escapeHTML(resultado.resultado)
                : escapeHTML(
                    JSON.stringify(
                        resultado.resultado,
                        null,
                        2
                    )
                );

    } else {

        conteudo = `
            <span style="color:#778ba5;">
                Nenhuma evidência retornada por este módulo.
            </span>
        `;
    }


    const limitacoes =
        resultado.limitacoes?.length
            ? `
                <div style="
                    margin-top:10px;
                    color:#ffd166;
                ">
                    <strong>Limitações:</strong>
                    <ul>
                        ${resultado.limitacoes
                            .map(
                                item =>
                                    `<li>${escapeHTML(item)}</li>`
                            )
                            .join("")
                        }
                    </ul>
                </div>
            `
            : "";


    return `

        <div style="
            margin:18px 0;
            padding:16px;
            background:#0d172b;
            border:1px solid #263754;
            border-left:3px solid #18bfff;
            border-radius:6px;
        ">

            <div style="
                display:flex;
                justify-content:space-between;
                gap:10px;
                margin-bottom:10px;
            ">

                <strong style="color:#18bfff;">
                    ${escapeHTML(resultado.id)}
                    ${stage
                        ? " — " + escapeHTML(stage.nome)
                        : ""
                    }
                </strong>

                <span style="
                    font-size:.7rem;
                    color:#9eb1c9;
                ">
                    ${escapeHTML(resultado.status)}
                </span>

            </div>


            <div style="
                white-space:pre-wrap;
                line-height:1.7;
                color:#dbe7f5;
            ">
                ${conteudo}
            </div>


            ${limitacoes}

        </div>

    `;
}


// ============================================================
// INTERFACE DE EXECUÇÃO
// ============================================================

async function iniciarMatriz() {

    const entrada =
        obterEntrada();


    if (!entrada.tema && !entrada.passagem) {

        alert(
            "Informe um tema ou uma passagem bíblica."
        );

        return;
    }


    const botao =
        document.querySelector(
            "[data-analisar]"
        ) ||
        document.getElementById(
            "analisar-btn"
        );


    if (botao) {

        botao.disabled = true;
        botao.textContent = "ANALISANDO...";
    }


    const diagnostico =
        diagnosticar(
            entrada.tema,
            entrada.passagem
        );


    pesquisaAtual = {
        tema: entrada.tema,
        passagem: entrada.passagem,
        diagnostico,
        resultados: []
    };


    renderizarDiagnostico(
        diagnostico
    );


    renderizarMatrizInicial();


    const area =
        obterElemento(
            "resultado-area"
        );


    if (area) {

        area.style.display = "block";

        area.innerHTML = `
            <h2>Investigação em andamento</h2>

            <p>
                Os módulos estão sendo avaliados
                independentemente.
            </p>

            <p style="color:#9eb1c9;">
                A ausência de uma fonte ou de um módulo
                não interrompe os demais.
            </p>
        `;
    }


    try {

        const resultados =
            await executarMatriz(
                entrada
            );


        pesquisaAtual.resultados =
            resultados;


        renderizarDossie(
            entrada,
            resultados
        );


    } catch (erro) {

        /*
         * Este erro é somente do orquestrador.
         *
         * Não usamos este bloco para transformar
         * uma ausência de dados em uma falsa resposta.
         */

        const areaErro =
            obterElemento(
                "resultado-area"
            );


        if (areaErro) {

            areaErro.style.display =
                "block";

            areaErro.innerHTML = `

                <h2 style="color:#ff6b6b;">
                    Erro no orquestrador
                </h2>

                <p>
                    ${escapeHTML(
                        erro.message
                    )}
                </p>

            `;
        }
    }


    if (botao) {

        botao.disabled = false;
        botao.textContent = "ANALISAR";
    }
}


// ============================================================
// INICIALIZAÇÃO
// ============================================================

function inicializarInterface() {

    const botao =
        document.querySelector(
            "[data-analisar]"
        ) ||
        document.getElementById(
            "analisar-btn"
        );


    if (!botao) {

        console.error(
            "Botão de análise não encontrado."
        );

        return;
    }


    /*
     * Evita múltiplos listeners.
     */

    if (
        botao.dataset
            .matrizInicializada === "true"
    ) {

        return;
    }


    botao.dataset
        .matrizInicializada = "true";


    botao.addEventListener(
        "click",
        iniciarMatriz
    );
}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        inicializarInterface
    );

} else {

    inicializarInterface();
}


// ============================================================
// API INTERNA
// ============================================================

export {
    iniciarMatriz,
    executarMatriz,
    diagnosticar
};
