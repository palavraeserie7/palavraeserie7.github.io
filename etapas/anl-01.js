
import { executarANL } from '../pages/pesquisa/js/engine.js';
export async function runANL01(alvo) {
    return await executarANL("ANL-01", "Texto e Manuscritos", ["NA28", "BHS", "BHQ", "Septuaginta", "Metzger"], 
        `Estabeleça o texto crítico e testemunhos textuais para: '${alvo}'.`);
}
