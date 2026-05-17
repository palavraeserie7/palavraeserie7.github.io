export function renderBook(
    title,
    description,
    isPremium = false
) {

    return `
        <div class="book-card">

            <span class="tag ${
                isPremium
                ? "pro-tag"
                : "free-tag"
            }">
                ${
                    isPremium
                    ? "PREMIUM"
                    : "FREE"
                }
            </span>

            <h3>${title}</h3>

            <p>${description}</p>

            <button class="${
                isPremium
                ? "btn-bloqueado"
                : "btn-liberado"
            }">
                ${
                    isPremium
                    ? "BLOQUEADO"
                    : "LER AGORA"
                }
            </button>

        </div>
    `;
}
