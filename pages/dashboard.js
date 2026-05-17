import { checkAuth }
from "../core/auth.js";

import { renderBook }
from "../core/permissions.js";

async function iniciarDashboard() {

    const user = await checkAuth();

    if (!user) return;

    document.getElementById(
        "welcome-msg"
    ).innerText =
      `Bem-vindo, ${user.email}`;

    document.getElementById(
        "user-plan"
    ).innerText =
      "Plano atual: FREE";

    const booksContainer =
        document.getElementById(
            "books-container"
        );

    booksContainer.innerHTML = `
        ${renderBook(
            "Devocional Diário",
            "Conteúdo gratuito para leitura.",
            false
        )}

        ${renderBook(
            "Teologia Avançada",
            "Conteúdo premium bloqueado.",
            true
        )}
    `;
}

window.addEventListener(
    "DOMContentLoaded",
    iniciarDashboard
);
