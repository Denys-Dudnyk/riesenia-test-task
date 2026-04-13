import { html } from "lit-html";
import { categoryCard } from "../../components/category-card";

export const solutionCategories = (categories) => {
    if (!categories || categories.length === 0) return html``;

    const cat1 = categories.find((c) => c.id === "elektricke-naradie");
    const cat2 = categories.find((c) => c.id === "zahrada-a-les");
    const cat3 = categories.find((c) => c.id === "cistenie-a-upratovanie");
    const cat4 = categories.find((c) => c.id === "rucne-naradie");
    const cat5 = categories.find((c) => c.id === "prislusenstvo");

    return html`
        <h2 class="c-solution-categories__title">Top kategórie produktov</h2>
        <div class="c-categories-grid">
            ${cat1 ? categoryCard(cat1, "is-small") : ""}
            ${cat2 ? categoryCard(cat2, "is-wide") : ""}
            ${cat3 ? categoryCard(cat3, "is-wide") : ""}
            ${cat4 ? categoryCard(cat4, "is-small") : ""}
            ${cat5 ? categoryCard(cat5, "is-tall") : ""}
        </div>
    `;
};
