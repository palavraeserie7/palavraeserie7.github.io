/**
 * ROUTER.JS V12.2 — ANL-00 DIAGNÓSTICO
 */
export const Router = {
    classificar(tema, passagem) {
        const input = (tema + " " + passagem).toLowerCase();
        const isAT = /gênesis|êxodo|levítico|números|deuteronômio|salmos|provérbios|isaías|jeremias|ezequiel|daniel/.test(input);
        
        return {
            testamento: isAT ? "Antigo Testamento" : "Novo Testamento",
            idioma: isAT ? "Hebraico/Aramaico" : "Grego Koiné",
            etapas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] // Roteiro completo
        };
    }
};
