import { html } from "lit-html";
import { productCard } from "../../components/product-card.js";
import { emptyProductsState } from "../../components/ui/emptyProductsState.js";
import { loadData } from "../../dataLoader.js";
import { solutionBanner } from "./solution-banner.js";
import { solutionCta } from "./solution-cta.js";

/**
 * Solution Page
 */

// Main page template
export const renderSolutionPage = (data) => {
    if (!data) {
        return html`<div class="l-solution">Loading...</div>`;
    }

    console.log("data.banner:\n", data.banner);
    console.log("data.ctaBanner:\n", data.ctaBanner);
    console.log("data.products:\n", data.products);
    console.log("data.categories:\n", data.categories);

    return html`
        <div class="l-solution">
            <section class="l-solution__banner">
                <div class="l-container">${data.banner ? solutionBanner(data.banner) : html``}</div>
            </section>

            <section class="l-solution__content">
                <div class="l-container is-shorter">
                    <div class="c-solution-content">
                        <div class="c-solution-content__cta">
                            ${data.ctaBanner ? solutionCta(data.ctaBanner) : html``}
                        </div>

                        <div class="c-solution-content__products">
                            ${data.products
                                ? data.products.slice(0, 2).map((p) => productCard(p))
                                : emptyProductsState()}
                        </div>
                    </div>
                </div>
            </section>

            <section class="l-solution__categories">
                <div class="l-container">
                    <div class="c-solution-categories"></div>
                </div>
            </section>
        </div>
        <div id="toast-container" class="c-toast-container"></div>
    `;
};

/**
 * Load data and render the solution page
 */
export const loadAndRenderSolutionPage = async () => {
    try {
        const data = await loadData();
        return renderSolutionPage(data);
    } catch (error) {
        return html`<div class="l-solution">Error loading data: ${error.message}</div>`;
    }
};
