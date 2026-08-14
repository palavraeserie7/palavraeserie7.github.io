/*
 * ANL-00 — DIAGNÓSTICO E ROTEAMENTO
 *
 * O ANL-00 não é uma das 12 etapas.
 * Ele prepara a pesquisa para o fluxo ANL-01 → ANL-12.
 */

const LIVROS_AT = [
    "gênesis", "genesis",
    "êxodo", "exodo",
    "levítico", "levitico",
    "números", "numeros",
    "deuteronômio", "deuteronomio",
    "josué", "josue",
    "juízes", "juizes",
    "rute",
    "1 samuel", "2 samuel",
    "1 reis", "2 reis",
    "1 crônicas", "2 crônicas",
    "esdras",
    "neemias",
    "ester",
    "jó", "jo",
    "salmos",
    "provérbios", "proverbios",
    "eclesiastes",
    "cantares",
    "isaías", "isaias",
    "jeremias",
    "lamentações", "lamentacoes",
    "ezequiel",
    "daniel",
    "oseias",
    "joel",
    "amós", "amos",
    "obadias",
    "jonas",
    "miqueias",
    "naum",
    "habacuque",
    "sofonias",
    "ageu",
    "zacarias",
    "malaquias"
];

const LIVROS_NT = [
    "mateus",
    "marcos",
    "lucas",
    "joão", "joao",
    "atos",
    "romanos",
    "1 coríntios", "2 coríntios",
    "gálatas", "galatas",
    "efésios", "efesios",
    "filipenses",
    "colossenses",
    "1 tessalonicenses", "2 tessalonicenses",
    "1 timóteo", "2 timóteo",
    "tito",
    "filemom",
    "hebreus",
    "tiago",
    "1 pedro", "2 pedro",
    "1 joão", "2 joão", "3 joão",
    "judas",
    "apocalipse"
];

function normalizar(texto = "") {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function detectarTestamento(passagem = "") {
    const texto = normalizar(passagem);

    const encontrouAT = LIVROS_AT.some(livro =>
        texto.includes(normalizar(livro))
    );

    const encontrouNT = LIVROS_NT.some(livro =>
        texto.includes(normalizar(livro))
    );

    if (encontrouAT && !encontrouNT) {
        return "Antigo Testamento";
    }

    if (encontrouNT && !encontrouAT) {
        return "Novo Testamento";
    }

    return "NÃO DETERMINADO";
}

function detectarIdioma(testamento) {
    if (testamento === "Antigo Testamento") {
        return "Hebraico / Aramaico";
    }

    if (testamento === "Novo Testamento") {
        return "Grego Koiné";
    }

    return "NÃO DETERMINADO";
}

export const Router = {

    classificar(tema = "", passagem = "") {

        const testamento = detectarTestamento(passagem);

        return {
            id: "ANL-00",
            status: "DIAGNOSTICADO",

            entrada: {
                tema,
                passagem
            },

            diagnostico: {
                testamento,
                idiomaOriginalProvavel: detectarIdioma(testamento)
            },

            fluxo: [
                "ANL-01",
                "ANL-02",
                "ANL-03",
                "ANL-04",
                "ANL-05",
                "ANL-06",
                "ANL-07",
                "ANL-08",
                "ANL-09",
                "ANL-10",
                "ANL-11",
                "ANL-12"
            ],

            observacoes: [
                "ANL-00 apenas diagnostica e roteia.",
                "ANL-00 não produz exegese.",
                "ANL-00 não inventa fontes.",
                "O idioma é uma classificação inicial e deve ser confirmado pelas fontes textuais."
            ]
        };
    }
};
