import { executarANL } from '../pages/pesquisa/js/engine.js';
export async function runANL12(alvo) {
    return await executarANL("ANL-12", "Síntese", ["Base de Evidências Validada"], 
        `Integre os resultados distinguindo claramente o que o texto afirma, o que implica, interpretação e aplicação para: '${alvo}'.`);
}
