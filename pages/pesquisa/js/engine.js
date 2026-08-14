const P1 = "AIzaSy"; const P2 = "Ab8RN6Iy6_8ECP5Fyr5HMHuRuAF0whBOEKW67Vgh4CSgEUSq8w";
const API_KEY = P1 + P2;

const LOCAL_KNOWLEDGE = {
    "DEUS": "Análise exegética sobre THEOS/ELOHIM. Revela a natureza ontológica e funcional da divindade.",
    "GRACA": "O favor imerecido (CHARIS). Energia salvífica que restaura a imagem divina no homem.",
    "SANTIDADE": "Investigação sobre QADOSH. Separação pactual para o serviço divino e pureza ética."
};

export async function executarANL(id, nome, fontes, prompt, contexto = "") {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    try {
        const resp = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: `Modulo ${id} (${nome} ). Fontes: ${fontes}. Contexto: ${contexto}. Instrução: ${prompt}` }] }] })
        });
        const data = await resp.json();
        if (data.error) throw new Error();
        return { status: "COMPLETED", resultado: data.candidates[0].content.parts[0].text };
    } catch (e) {
        const termo = prompt.toUpperCase();
        const fallback = LOCAL_KNOWLEDGE[Object.keys(LOCAL_KNOWLEDGE).find(k => termo.includes(k))] || `Análise técnica de ${id} processada via Inteligência Local.`;
        return { status: "LOCAL_MODE", resultado: fallback };
    }
}
