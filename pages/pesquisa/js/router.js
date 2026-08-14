/**
 * ROUTER.JS - Decide quais etapas acionar baseado na pergunta
 */
const Router = {
    analisarPergunta(tema) {
        const isAT = /provérbios|salmos|gênesis|isaías|êxodo|levítico|deuteronômio/.test(tema.toLowerCase());
        return {
            testamento: isAT ? "AT" : "NT",
            etapasAtivas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] // Executa a matriz completa
        };
    }
};
