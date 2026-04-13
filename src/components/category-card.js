import { html } from "lit-html";
import { arrowRightIconMiddle } from "./ui/icons";

const categoryImages = {
    "elektricke-naradie": "/images/categories/category-tools.webp",
    "zahrada-a-les": "/images/categories/category-garden.webp",
    "cistenie-a-upratovanie": "/images/categories/category-cleaning.webp",
    "rucne-naradie": "/images/categories/category-hand-tools.webp",
    prislusenstvo: "/images/categories/category-accessories.webp",
};

export const categoryCard = (category, modifier) => {
    const categoryImage = categoryImages[category.id] || category.imageUrl;

    return html`
        <div class="c-category-card ${modifier}">
            <div
                class="c-category-card__image"
                style="background-image: url('${categoryImage}')"
            ></div>
            <div class="c-category-card__overlay"></div>
            <div class="c-category-card__content">
                <h3 class="c-category-card__title">
                    ${category.name}
                    <span class="c-category-card__badge">${category.productCount}</span>
                </h3>

                <ul
                    class="c-category-card__list ${modifier === "is-wide" &&
                    category.subcategories.length > 3
                        ? "is-multiline"
                        : ""}"
                >
                    ${category.subcategories.map(
                        (sub) => html`
                            <li class="c-category-card__item">
                                <a href="${sub.link}" class="c-category-card__link">${sub.name}</a>
                            </li>
                        `
                    )}
                </ul>

                <a href="${category.link}" class="c-category-card__cta">
                    ${category.ctaText}
                    <span class="c-category-card__arrow"> ${arrowRightIconMiddle()} </span>
                </a>
            </div>
        </div>
    `;
};
