import { MODULOS } from "../etapas/index.js";

const LIMIAR_PRINCIPAL = 0.80;
const LIMIAR_RELEVANTE = 0.55;
const LIMIAR_CONDICIONAL = 0.30;

function classificar(pontuacao) {

    if (pontuacao >= LIMIAR_PRINCIPAL) {
        return "principal";
    }

    if (pontuacao >= LIMIAR_RELEVANTE) {
        return "relevante";
    }

    if (pontuacao >= LIMIAR_CONDICIONAL) {
        return "condicional";
    }

    return "nao-aplicavel";
}

export function roteiar(diagnostico) {

    return MODULOS.map(modulo => {

        let pontuacao = 0;

        if (modulo.condicao) {
            pontuacao = modulo.condicao(diagnostico);
        }

        return {
            ...modulo,
            pontuacao,
            status: classificar(pontuacao)
        };
    });
}
