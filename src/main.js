import { html, render } from "lit-html";
import "./assets/styles/import.scss";
import { renderFooter } from "./components/footer.js";
import { renderHeader } from "./components/header.js";
import { logDataMode } from "./dataLoader.js";
import { renderAssignmentPage } from "./pages/assignment.js";
import { loadAndRenderSolutionPage } from "./pages/solution/solution.js";
import { router } from "./router.js";

// Log current data mode
logDataMode();

/**
 * Render the entire application layout
 */
const renderLayout = (content) => {
    const app = document.querySelector("#app");

    const template = html`
        ${renderHeader()}
        <main class="l-page__main">${content}</main>
        ${renderFooter()}
    `;

    render(template, app);
};

/**
 * Route handlers
 */
const showAssignmentPage = () => {
    const pageContent = renderAssignmentPage();
    renderLayout(pageContent);
};

const showSolutionPage = async () => {
    // Show loading state
    renderLayout(html`<div class="l-solution">Loading...</div>`);

    // Load data and render page
    const pageContent = await loadAndRenderSolutionPage();
    renderLayout(pageContent);
};

const showProductPage = (path) => {
    const content = html`
        <div class="l-container" style="padding: 5rem 0; text-align: center;">
            <h1>Detail produktu</h1>
            <p>Tu by sa zobrazil detail pre: <strong>${path}</strong></p>
            <button
                class="c-add-btn"
                style="width: auto; padding: 0 2rem; margin: 2rem auto 0;"
                @click=${() => router.navigate("/solution")}
            >
                Späť na zoznam
            </button>
        </div>
    `;
    renderLayout(content);
};

/**
 * Initialize application
 */
const init = () => {
    // Register routes
    router.addRoute("/", showAssignmentPage);
    router.addRoute("/solution", showSolutionPage);
    router.addRoute("/product/dewalt-pro-700-max", () =>
        showProductPage("/product/dewalt-pro-700-max")
    );
    router.addRoute("/product/metabo-600-heavy-tools", () =>
        showProductPage("/product/metabo-600-heavy-tools")
    );
    // Initialize router
    router.init();
};

// Start the application
init();
