/**
 * ROUTER.JS
 * Palavra & Série — Matriz de Análise Bíblica
 *
 * ANL-00 — Diagnóstico e Roteamento
 *
 * Responsabilidades:
 * - identificar livro bíblico
 * - identificar testamento
 * - identificar idioma original predominante
 * - interpretar referências bíblicas
 * - preparar o contexto para ANL-01 → ANL-12
 *
 * IMPORTANTE:
 * Este módulo NÃO interpreta o texto.
 * Ele apenas identifica e roteia a pesquisa.
 */

const LIVROS_AT = {
    genesis: "Gênesis",
    gen: "Gênesis",

    exodo: "Êxodo",
    ex: "Êxodo",

    levitico: "Levítico",
    lv: "Levítico",

    numeros: "Números",
    nm: "Números",

    deuteronomio: "Deuteronômio",
    dt: "Deuteronômio",

    josue: "Josué",
    js: "Josué",

    juizes: "Juízes",
    jz: "Juízes",

    rute: "Rute",
    rt: "Rute",

    "1samuel": "1 Samuel",
    "1sm": "1 Samuel",

    "2samuel": "2 Samuel",
    "2sm": "2 Samuel",

    "1reis": "1 Reis",
    "1rs": "1 Reis",

    "2reis": "2 Reis",
    "2rs": "2 Reis",

    "1cronicas": "1 Crônicas",
    "1cr": "1 Crônicas",

    "2cronicas": "2 Crônicas",
    "2cr": "2 Crônicas",

    esdras: "Esdras",
    ed: "Esdras",

    neemias: "Neemias",
    ne: "Neemias",

    ester: "Ester",
    et: "Ester",

    jo: "Jó",
    job: "Jó",

    salmos: "Salmos",
    sl: "Salmos",
    salmo: "Salmos",

    proverbios: "Provérbios",
    pv: "Provérbios",

    eclesiastes: "Eclesiastes",
    ec: "Eclesiastes",

    cantares: "Cantares",
    ct: "Cantares",
    "canticos": "Cantares",

    isaias: "Isaías",
    is: "Isaías",

    jeremias: "Jeremias",
    jr: "Jeremias",

    lamentacoes: "Lamentações",
    lm: "Lamentações",

    ezequiel: "Ezequiel",
    ez: "Ezequiel",

    daniel: "Daniel",
    dn: "Daniel",

    oseias: "Oséias",
    os: "Oséias",

    joel: "Joel",
    jl: "Joel",

    amos: "Amós",
    am: "Amós",

    obadias: "Obadias",
    ob: "Obadias",

    jonas: "Jonas",
    jn: "Jonas",

    miqueias: "Miqueias",
    mq: "Miqueias",

    naum: "Naum",
    na: "Naum",

    habacuque: "Habacuque",
    hc: "Habacuque",

    sofonias: "Sofonias",
    sf: "Sofonias",

    ageu: "Ageu",
    ag: "Ageu",

    zacarias: "Zacarias",
    zc: "Zacarias",

    malaquias: "Malaquias",
    ml: "Malaquias"
};

const LIVROS_NT = {
    mateus: "Mateus",
    mt: "Mateus",

    marcos: "Marcos",
    mc: "Marcos",

    lucas: "Lucas",
    lc: "Lucas",

    joao: "João",
    jo: "João",

    atos: "Atos",
    at: "Atos",

    romanos: "Romanos",
    rm: "Romanos",

    "1corintios": "1 Coríntios",
    "1co": "1 Coríntios",

    "2corintios": "2 Coríntios",
    "2co": "2 Coríntios",

    galatas: "Gálatas",
    gl: "Gálatas",

    efesios: "Efésios",
    ef: "Efésios",

    filipenses: "Filipenses",
    fp: "Filipenses",

    colossenses: "Colossenses",
    cl: "Colossenses",

    "1tessalonicenses": "1 Tessalonicenses",
    "1ts": "1 Tessalonicenses",

    "2tessalonicenses": "2 Tessalonicenses",
    "2ts": "2 Tessalonicenses",

    "1timoteo": "1 Timóteo",
    "1tm": "1 Timóteo",

    "2timoteo": "2 Timóteo",
    "2tm": "2 Timóteo",

    tito: "Tito",
    tt: "Tito",

    filemom: "Filemom",
    fm: "Filemom",

    hebreus: "Hebreus",
    hb: "Hebreus",

    tiago: "Tiago",
    tg: "Tiago",

    "1pedro": "1 Pedro",
    "1pe": "1 Pedro",

    "2pedro": "2 Pedro",
    "2pe": "2 Pedro",

    "1joao": "1 João",
    "1jo": "1 João",

    "2joao": "2 João",
    "2jo": "2 João",

    "3joao": "3 João",
    "3jo": "3 João",

    judas: "Judas",
    jd: "Judas",

    apocalipse: "Apocalipse",
    ap: "Apocalipse"
};

const TODOS_OS_LIVROS = {
    ...LIVROS_AT,
    ...LIVROS_NT
};

const NUMERO_ETAPAS = 12;

function normalizarTexto(valor = "") {
    return String(valor)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s:.-]/gu, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function normalizarChaveLivro(valor = "") {
    return normalizarTexto(valor)
        .replace(/\s+/g, "")
        .replace(/[.-]/g, "");
}

function encontrarLivro(texto) {
    const normalizado = normalizarTexto(texto);

    const chaves = Object.keys(TODOS_OS_LIVROS)
        .sort((a, b) => b.length - a.length);

    for (const chave of chaves) {
        const nome = normalizarTexto(TODOS_OS_LIVROS[chave]);

        if (
            normalizado.includes(nome) ||
            normalizado.includes(chave)
        ) {
            return TODOS_OS_LIVROS[chave];
        }
    }

    return null;
}

function extrairCapituloVersiculo(texto) {
    const normalizado = normalizarTexto(texto);

    /*
     * Aceita:
     *
     * João 3
     * João 3:16
     * João 3.16
     * João 3:16-18
     *
     * Também funciona quando o usuário coloca
     * "joao3" ou "joao 3".
     */

    const referencia = normalizado.match(
        /(?:^|\s)(?:[1-3]\s*)?[a-z]+\s*(\d+)(?:\s*[:.]\s*(\d+))?(?:\s*-\s*(\d+))?/i
    );

    if (!referencia) {
        return {
            capitulo: null,
            versiculoInicial: null,
            versiculoFinal: null
        };
    }

    return {
        capitulo: Number(referencia[1]),
        versiculoInicial: referencia[2]
            ? Number(referencia[2])
            : null,
        versiculoFinal: referencia[3]
            ? Number(referencia[3])
            : null
    };
}

function determinarTestamento(livro) {
    if (!livro) return null;

    if (Object.values(LIVROS_AT).includes(livro)) {
        return "Antigo Testamento";
    }

    if (Object.values(LIVROS_NT).includes(livro)) {
        return "Novo Testamento";
    }

    return null;
}

function determinarIdioma(livro, capitulo = null, versiculo = null) {
    if (!livro) {
        return {
            principal: null,
            observacao: "Livro bíblico não identificado."
        };
    }

    /*
     * Daniel possui grandes blocos em aramaico.
     *
     * Daniel 2:4b–7:28
     */

    if (
        livro === "Daniel" &&
        capitulo !== null &&
        capitulo >= 2 &&
        capitulo <= 7
    ) {
        return {
            principal: "Aramaico",
            observacao: "Esta faixa de Daniel contém material aramaico."
        };
    }

    /*
     * Esdras contém blocos aramaicos,
     * especialmente 4:8–6:18 e 7:12–26.
     */

    if (
        livro === "Esdras" &&
        capitulo !== null &&
        (
            (capitulo >= 4 && capitulo <= 6) ||
            capitulo === 7
        )
    ) {
        return {
            principal: "Aramaico",
            observacao: "Esta região de Esdras contém material aramaico."
        };
    }

    const testamento = determinarTestamento(livro);

    if (testamento === "Antigo Testamento") {
        return {
            principal: "Hebraico",
            observacao: "Texto hebraico do Antigo Testamento."
        };
    }

    if (testamento === "Novo Testamento") {
        return {
            principal: "Grego Koiné",
            observacao: "Texto grego do Novo Testamento."
        };
    }

    return {
        principal: null,
        observacao: "Idioma original ainda não determinado."
    };
}

function construirReferencia(livro, dadosReferencia) {
    if (!livro) return null;

    if (!dadosReferencia.capitulo) {
        return livro;
    }

    let referencia = `${livro} ${dadosReferencia.capitulo}`;

    if (dadosReferencia.versiculoInicial !== null) {
        referencia += `:${dadosReferencia.versiculoInicial}`;

        if (
            dadosReferencia.versiculoFinal !== null &&
            dadosReferencia.versiculoFinal !==
                dadosReferencia.versiculoInicial
        ) {
            referencia += `-${dadosReferencia.versiculoFinal}`;
        }
    }

    return referencia;
}

function detectarTipoPesquisa(tema, passagem) {
    if (passagem && passagem.trim()) {
        return "PASSAGEM";
    }

    if (tema && tema.trim()) {
        return "TEMA";
    }

    return "INDEFINIDA";
}

function construirEtapas() {
    return Array.from(
        { length: NUMERO_ETAPAS },
        (_, indice) => `ANL-${String(indice + 1).padStart(2, "0")}`
    );
}

export const Router = {

    classificar(tema = "", passagem = "") {

        const textoEntrada = `${tema} ${passagem}`.trim();

        const livro = encontrarLivro(passagem || tema);

        const referenciaNumerica =
            extrairCapituloVersiculo(passagem || "");

        const testamento =
            determinarTestamento(livro);

        const idioma =
            determinarIdioma(
                livro,
                referenciaNumerica.capitulo,
                referenciaNumerica.versiculoInicial
            );

        const referencia =
            construirReferencia(
                livro,
                referenciaNumerica
            );

        const tipoPesquisa =
            detectarTipoPesquisa(
                tema,
                passagem
            );

        const confiabilidadeDiagnostico =
            livro
                ? "ALTA"
                : "PENDENTE";

        return {

            status: "DIAGNOSTICADO",

            entrada: {
                tema: tema.trim(),
                passagem: passagem.trim(),
                tipo: tipoPesquisa
            },

            referencia: {
                livro,
                capitulo: referenciaNumerica.capitulo,
                versiculoInicial:
                    referenciaNumerica.versiculoInicial,
                versiculoFinal:
                    referenciaNumerica.versiculoFinal,
                formatada: referencia
            },

            testamento,

            idioma: {
                principal: idioma.principal,
                observacao: idioma.observacao
            },

            confiabilidadeDiagnostico,

            etapas: construirEtapas(),

            contexto: {
                tema: tema.trim(),
                passagem: passagem.trim(),
                referencia,
                livro,
                capitulo:
                    referenciaNumerica.capitulo,
                versiculoInicial:
                    referenciaNumerica.versiculoInicial,
                versiculoFinal:
                    referenciaNumerica.versiculoFinal,
                testamento,
                idiomaOriginal:
                    idioma.principal
            }
        };
    }
};

export {
    normalizarTexto,
    encontrarLivro,
    determinarTestamento,
    determinarIdioma,
    extrairCapituloVersiculo
};
