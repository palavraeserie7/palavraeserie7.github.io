/**
 * ROUTER.JS
 * ANL-00 — Diagnóstico e roteamento.
 *
 * Não executa os módulos.
 * Apenas determina o contexto inicial e quais etapas são pertinentes.
 */

import { STAGES } from "./stages.js";

export const Router = {

    classificar(tema = "", passagem = "") {

        const texto = `${tema} ${passagem}`.trim();

        const diagnostico = {
            entrada: {
                tema,
                passagem
            },

            testamento: "Não identificado",
            idiomaPrimario: "Indeterminado",
            generoLiterario: "Não identificado",

            statusRoteamento: "PENDENTE",
            confiancaDiagnostico: "BAIXA",

            etapas: [],

            avisos: []
        };

        if (!texto) {
            diagnostico.statusRoteamento = "SEM_ENTRADA";
            return diagnostico;
        }

        const referencia = passagem.toLowerCase();

        const referenciasAT = [
            "gênesis", "êxodo", "levítico", "números",
            "deuteronômio", "josué", "juízes", "rute",
            "samuel", "reis", "crônicas", "esdras",
            "neemias", "ester", "jó", "salmos",
            "provérbios", "eclesiastes", "cânticos",
            "isaías", "jeremias", "lamentações",
            "ezequiel", "daniel", "oseias", "joel",
            "amós", "obadias", "jonas", "miqueias",
            "naum", "habacuque", "sofonias",
            "ageu", "zacarias", "malaquias"
        ];

        const referenciasNT = [
            "mateus", "marcos", "lucas", "joão",
            "atos", "romanos", "coríntios", "gálatas",
            "efésios", "filipenses", "colossenses",
            "tessalonicenses", "timóteo", "tito",
            "filemom", "hebreus", "tiago",
            "pedro", "judas", "apocalipse"
        ];

        const encontradoAT = referenciasAT.some(nome =>
            referencia.includes(nome)
        );

        const encontradoNT = referenciasNT.some(nome =>
            referencia.includes(nome)
        );

        if (encontradoAT && !encontradoNT) {
            diagnostico.testamento = "Antigo Testamento";
            diagnostico.idiomaPrimario = "Hebraico / Aramaico";
            diagnostico.confiancaDiagnostico = "MÉDIA";
        } else if (encontradoNT && !encontradoAT) {
            diagnostico.testamento = "Novo Testamento";
            diagnostico.idiomaPrimario = "Grego Koiné";
            diagnostico.confiancaDiagnostico = "MÉDIA";
        } else {
            diagnostico.avisos.push(
                "O sistema não conseguiu identificar o testamento com segurança."
            );
        }

        diagnostico.generoLiterario =
            Router.detectarGenero(referencia);

        diagnostico.etapas = STAGES.map(stage => ({
            id: stage.id,
            nome: stage.nome,
            nivel: stage.nivel,
            acionada: Router.deveAcionar(stage, diagnostico)
        }));

        diagnostico.statusRoteamento =
            diagnostico.etapas.some(e => e.acionada)
                ? "ROTEADO"
                : "PENDENTE";

        return diagnostico;
    },

    detectarGenero(referencia) {

        if (referencia.includes("salmos")) return "Poesia";
        if (referencia.includes("provérbios")) return "Literatura sapiencial";
        if (referencia.includes("romanos")) return "Epístola";
        if (referencia.includes("joão")) return "Evangelho / Literatura joanina";
        if (referencia.includes("apocalipse")) return "Literatura apocalíptica";

        return "Não determinado";
    },

    deveAcionar(stage, diagnostico) {

        if (stage.id === "ANL-08") {
            return diagnostico.testamento !== "Não identificado";
        }

        return true;
    }
};
