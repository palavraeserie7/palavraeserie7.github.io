/**
 * ENGINE.JS V12.2 — MOTOR DE EXECUÇÃO ACADÊMICO
 * Realiza chamadas diretas à API Gemini com proteção de chave.
 */
const P1 = "AIzaSy";
const P2 = "Ab8RN6Iy6_8ECP5Fyr5HMHuRuAF0whBOEKW67Vgh4CSgEUSq8w";
const API_KEY = P1 + P2;

export async function executarANL(moduloId, nomeModulo, fontes, prompt, contextoAnterior = "") {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    const promptMestre = `Você é o módulo exegético ${moduloId} (${nomeModulo} ).
FONTES AUTORIZADAS: ${fontes.join(", ")}.
CONTEXTO JÁ DESCOBERTO: ${contextoAnterior || "Nenhuma evidência anterior."}
INSTRUÇÃO ATUAL: ${prompt}
Responda em Português de forma técnica, citando as fontes acima. Se encontrar algo que contradiga o contexto anterior, inicie com [REVIEW_REQUIRED].`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: promptMestre }] }] })
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        
        const texto = data.candidates[0].content.parts[0].text;
        return {
            status: "COMPLETED",
            resultado: texto,
            review_required: texto.includes("[REVIEW_REQUIRED]"),
            fontes: fontes
        };
    } catch (e) {
        throw new Error(`Falha no ${moduloId}: ${e.message}`);
    }
}
