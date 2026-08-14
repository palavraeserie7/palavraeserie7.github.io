/**
 * ENGINE.JS V16 - MOTOR HÍBRIDO (IA + LOCAL)
 */

// 1. COLE AQUI A CHAVE QUE COMEÇA COM "AIzaSy"
const API_KEY = "COLE_AQUI_A_CHAVE_QUE_COMECA_COM_AIzaSy";

export async function executarMotorIA(promptEtapa) {
    // Se a chave for a errada (AQ...), o site entra em Modo Local para não travar
    if (!API_KEY.startsWith("AIzaSy")) {
        console.warn("Chave Inválida detectada. Entrando em Modo Local.");
        return await simularRespostaIA(promptEtapa);
    }

    const url = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + API_KEY;
    
    try {
        const resposta = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: promptEtapa }] }] } )
        });

        const dados = await resposta.json();
        if (dados.error) throw new Error(dados.error.message);
        return dados.candidates[0].content.parts[0].text;
    } catch (e) {
        console.error("Erro na IA, usando Simulador:", e);
        return await simularRespostaIA(promptEtapa);
    }
}

// Função que impede o site de travar se a IA falhar
async function simularRespostaIA(prompt) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("--- MODO DE DEMONSTRAÇÃO (IA OFFLINE) ---\n\n" +
                    "A investigação vasta e profunda percorreu as 12 etapas teológicas.\n" +
                    "Fontes acionadas: NA28, BHS, Metzger, BDAG, HALOT, BECNT, IVP, Beale, Osborne, Grudem.\n\n" +
                    "RESULTADO: O tema pesquisado possui raízes profundas nos originais gregos e hebraicos, exigindo uma exegese técnica e uma aplicação prática voltada para a maturidade cristã.");
        }, 1000);
    });
}
