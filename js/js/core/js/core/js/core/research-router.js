/**
 * PALAVRA & SÉRIE
 * RESEARCH ROUTER
 */

window.PSResearchRouter = {

    getMode(modeId) {

        return window.PS_RESEARCH_MODES.find(
            mode => mode.id === modeId
        ) || window.PS_RESEARCH_MODES[0];

    },

    getStages(modeId) {

        const mode = this.getMode(modeId);

        return mode.etapas.map(stageId => {

            return window.PS_RESEARCH_STAGES.find(
                stage => stage.id === stageId
            );

        }).filter(Boolean);

    },

    isPro(modeId) {

        const mode = this.getMode(modeId);

        return mode.acesso === "pro";

    },

    getProgress(modeId) {

        const stages = this.getStages(modeId);

        return {
            total: stages.length,
            executadas: 0,
            percentual: 0
        };

    }

};
