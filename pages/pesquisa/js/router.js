(function () {

    const Router = {

        context: {
            tema: "",
            passagem: "",
            diagnostico: null
        },

        analyze(tema, passagem) {

            this.context.tema = tema;
            this.context.passagem = passagem;

            this.context.diagnostico =
                BiblicalResearchEngine.diagnose(
                    tema,
                    passagem
                );

            return this.context.diagnostico;
        },

        investigate(stage, submodule) {

            return BiblicalResearchEngine.investigate(
                stage,
                submodule,
                this.context
            );
        }

    };

    window.BiblicalResearchRouter = Router;

})();
