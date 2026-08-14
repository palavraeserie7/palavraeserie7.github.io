/**
 * ROUTER.JS — Classificação da Passagem e Roteamento ANL-00
 */
export const Router = {
    classificar(tema, passagem) {
        const texto = (tema + " " + passagem).toLowerCase();
        const isAT = /provérbios|salmos|gênesis|isaías|êxodo|levítico|deuteronômio|jósia|daniel/.test(texto);
        
        return {
            testamento: isAT ? "Antigo Testamento (AT)" : "Novo Testamento (NT)",
            idiomaPrimario: isAT ? "Hebraico / Aramaico" : "Grego Koiné",
            generoLiterario: texto.includes("provérbios") ? "Literatura Sapiencial" : texto.includes("salmos") ? "Poesia" : "Narrativa / Epístola",
            statusRoteamento: "APROVADO",
            confiancaDiagnostico: "ALTA"
        };
    }
};
