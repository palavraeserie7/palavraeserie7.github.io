(function () {

    const Engine = {

        normalize(value) {
            return (value || "").trim();
        },

        diagnose(tema, passagem) {

            const texto = this.normalize(passagem).toLowerCase();

            let testamento = "Não identificado";
            let idioma = "Indeterminado";

            if (
                texto.includes("mateus") ||
                texto.includes("marcos") ||
                texto.includes("lucas") ||
                texto.includes("joão") ||
                texto.includes("atos") ||
                texto.includes("romanos") ||
                texto.includes("coríntios") ||
                texto.includes("gálatas") ||
                texto.includes("efésios") ||
                texto.includes("filipenses") ||
                texto.includes("colossenses") ||
                texto.includes("hebreus") ||
                texto.includes("tiago") ||
                texto.includes("pedro") ||
                texto.includes("judas") ||
                texto.includes("apocalipse")
            ) {
                testamento = "Novo Testamento";
                idioma = "Grego";
            }

            if (
                texto.includes("gênesis") ||
                texto.includes("êxodo") ||
                texto.includes("levítico") ||
                texto.includes("números") ||
                texto.includes("deuteronômio") ||
                texto.includes("josué") ||
                texto.includes("juízes") ||
                texto.includes("rute") ||
                texto.includes("salmos") ||
                texto.includes("provérbios") ||
                texto.includes("isaías") ||
                texto.includes("jeremias") ||
                texto.includes("ezequiel") ||
                texto.includes("daniel")
            ) {
                testamento = "Antigo Testamento";
                idioma = "Hebraico";
            }

            return {
                tema: tema || "Não informado",
                passagem: passagem || "Não informada",
                testamento,
                idioma,
                textoGrego:
                    idioma === "Grego"
                        ? "PRINCIPAL"
                        : "CONDICIONAL",

                hebraico:
                    idioma === "Hebraico"
                        ? "PRINCIPAL"
                        : "CONDICIONAL",

                na28:
                    idioma === "Grego"
                        ? "PRINCIPAL"
                        : "NÃO APLICÁVEL",

                bhs:
                    idioma === "Hebraico"
                        ? "PRINCIPAL"
                        : "NÃO APLICÁVEL",

                septuaginta: "COMPLEMENTAR"
            };
        },

        investigate(stage, submodule, context) {

            return {
                stage: stage,
                submodule: submodule,

                objective:
                    `Investigar "${context.tema}" dentro de "${context.passagem}" pelo eixo ${stage.id} — ${stage.title}.`,

                method:
                    `O submódulo "${submodule}" deve ser analisado isoladamente, utilizando o contexto fornecido pelo diagnóstico e mantendo separação entre dados textuais, interpretação e conclusão.`,

                conclusion:
                    "A conclusão deste submódulo deverá ser construída a partir das evidências encontradas durante a investigação."
            };
        }

    };

    window.BiblicalResearchEngine = Engine;

})();
