import { html } from "lit-html";

export const emptyProductsState = () => html`
    <div class="c-empty-state">
        <h3 class="c-empty-state__title">Produkty sa nenašli</h3>
        <p class="c-empty-state__text">
            Momentálne nemáme v tejto sekcii žiadne produkty. Skúste to prosím neskôr.
        </p>
        <button class="c-add-btn is-secondary" @click=${() => window.location.reload()}>
            Skúsiť znova
        </button>
    </div>
`;
