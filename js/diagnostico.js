export function diagnosticar(passagem = "") {

    const texto = passagem
        .toLowerCase()
        .trim();

    const novoTestamento = [
        "mateus", "marcos", "lucas", "joão", "joao",
        "atos", "romanos", "coríntios", "corintios",
        "gálatas", "galatas", "efésios", "efesios",
        "filipenses", "colossenses",
        "tessalonicenses", "timóteo", "timoteo",
        "tito", "filemom", "hebreus",
        "tiago", "pedro", "judas", "apocalipse"
    ];

    const antigoTestamento = [
        "gênesis", "genesis", "êxodo", "exodo",
        "levítico", "levitico", "números", "numeros",
        "deuteronômio", "deuteronomio",
        "josué", "josue", "juízes", "juizes",
        "rute", "samuel", "reis", "crônicas",
        "esdras", "neemias", "ester", "jó", "jo",
        "salmos", "provérbios", "proverbios",
        "eclesiastes", "cantares", "isaías", "isaias",
        "jeremias", "lamentações", "lamentacoes",
        "ezequiel", "daniel", "oséias", "oseias",
        "joel", "amós", "amos", "obadias",
        "jonas", "miquéias", "miqueias",
        "naum", "habacuque", "sofonias",
        "ageu", "zacarias", "malaquias"
    ];

    const livroNT = novoTestamento.find(livro =>
        texto.includes(livro)
    );

    const livroAT = antigoTestamento.find(livro =>
        texto.includes(livro)
    );

    const testamento = livroNT
        ? "Novo Testamento"
        : livroAT
            ? "Antigo Testamento"
            : "Não identificado";

    const idiomaPrincipal =
        testamento === "Novo Testamento"
            ? "Grego"
            : testamento === "Antigo Testamento"
                ? "Hebraico"
                : "Indeterminado";

    const eNT = testamento === "Novo Testamento";
    const eAT = testamento === "Antigo Testamento";

    return {
        passagem,
        testamento,
        idiomaPrincipal,

        recursos: {
            textoGrego: eNT,
            na28: eNT,
            sblgnt: eNT,
            manuscritos: true,
            criticaTextual: true,

            textoHebraico: eAT,
            bhs: eAT,
            bhq: eAT,

            septuaginta: true,

            textoAramaico: false
        },

        perfil: {
            linguistica: true,
            semantica: true,
            teologia: true,
            contextoLiterario: true,
            contextoHistorico: true,
            contextoGeografico: false,
            intertextualidade: true
        }
    };
}
