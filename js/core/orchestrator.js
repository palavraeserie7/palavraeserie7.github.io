/**
 * PALAVRA & SÉRIE
 * CORE ORCHESTRATOR
 *
 * Coordena a pesquisa.
 *
 * Não cria a interface.
 * Não altera o CSS.
 * Não controla o dashboard.
 */

window.PSOrchestrator = {

    async executeResearch(params = {}) {

        const query = (params.query || "").trim();
        const modeId = params.mode || "rapida";

        if (!query) {

            return {
                sucesso: false,
                erro: "Digite algo para pesquisar."
            };

        }

        const mode =
            PSResearchRouter.getMode(modeId);

        const stages =
            PSResearchRouter.getStages(modeId);

        const isPro =
            PSResearchRouter.isPro(modeId);

        /*
         * Neste momento o motor apenas monta o plano.
         *
         * A consulta real às fontes será implementada
         * posteriormente.
         */

        return {

            sucesso: true,

            consulta: query,

            modo: {
                id: mode.id,
                nome: mode.nome,
                acesso: mode.acesso
            },

            pro: isPro,

            plano: stages.map(stage => ({

                numero: stage.numero,
                id: stage.id,
                nome: stage.nome,
                descricao: stage.descricao,
                status: "planejada"

            })),

            totalEtapas: stages.length

        };

    }

};
