/**
 * ROUTER.JS - Roteamento
 */
export const Router = {
    analisarPergunta(tema) {
        const isAT = /provérbios|salmos|gênesis|isaías|êxodo|levítico/.test(tema.toLowerCase());
        return {
            testamento: isAT ? "Antigo Testamento (BHS/HALOT)" : "Novo Testamento (NA28/BDAG)"
        };
    }
};
