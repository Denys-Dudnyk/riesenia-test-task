import { html } from "lit-html";
import { router } from "../router";
import { cartIcon, compareIcon, starIcon, wishlistIcon } from "./ui/icons";
import { showToast } from "./ui/toast";

const productImages = {
    1: "/images/products/product-1.webp",
    2: "/images/products/product-2.webp",
};

export const productCard = (product) => {
    const productImage = productImages[product.id] || product.imageUrl;

    const handleAddToCart = (e) => {
        const card = e.target.closest(".c-product-card");
        const qtyInput = card.querySelector(".c-quantity input");
        const quantity = parseInt(qtyInput.value);

        if (quantity > 10) {
            showToast(`Maximálne množstvo je 10 ks. (Zadali ste ${quantity})`, "error");
        } else {
            showToast(`Pridané do košíka: ${quantity} ks - ${product.name}`, "success");
            qtyInput.value = 1;
        }
    };

    const changeQty = (e, delta) => {
        const input = e.target.closest(".c-quantity").querySelector("input");
        let newVal = parseInt(input.value) + delta;
        if (newVal < 1) newVal = 1;
        input.value = newVal;
    };

    const handleTitleClick = (e, link) => {
        e.preventDefault();
        console.log("Navigating to:", link);
        router.navigate(link);
    };

    const toggleActive = (e) => {
        e.currentTarget.classList.toggle("is-active");
    };

    return html`
        <article class="c-product-card">
            <div class="c-product-card__header">
                <div class="c-product-card__badges">
                    ${product.badges.map(
                        (badge) => html`
                            <span class="badge is-${badge.type}">${badge.label}</span>
                        `
                    )}
                </div>

                <div class="c-product-card__actions-top">
                    <button
                        class="action-btn"
                        title="Porovnať"
                        aria-label="Porovnať"
                        @click=${toggleActive}
                    >
                        ${compareIcon()}
                    </button>
                    <button
                        class="action-btn"
                        title="Pridať do wishlistu"
                        aria-label="Pridať do wishlistu"
                        @click=${toggleActive}
                    >
                        ${wishlistIcon()}
                    </button>
                </div>
            </div>

            <div class="c-product-card__image">
                <img src="${productImage}" alt="${product.name}" />
            </div>

            <div class="c-product-card__content">
                <div class="c-product-card__rating">
                    <div class="c-product-card__stars">
                        ${[0, 1, 2, 3, 4].map((index) => starIcon(index < product.rating))}
                    </div>

                    <span class="c-product-card__rating-count">(${product.reviewCount})</span>
                </div>

                <a
                    href="${product.link}"
                    class="c-product-card__title"
                    @click=${(e) => handleTitleClick(e, product.link)}
                    >${product.name}</a
                >
                <p class="c-product-card__sku">${product.sku}</p>

                <div class="c-product-card__price-box">
                    <span class="old-price">${product.originalPrice} ${product.currency}</span>

                    <span class="current-price">${product.salePrice} ${product.currency}</span>
                    <span class="vat-price"
                        >${product.priceWithoutVAT} ${product.currency} bez DPH</span
                    >
                </div>

                <p class="c-product-card__stock">${product.stock}</p>

                <div class="c-product-card__footer">
                    <div class="c-quantity">
                        <button type="button" @click=${(e) => changeQty(e, -1)}>-</button>
                        <input type="text" value="1" min="1" readonly />
                        <button type="button" @click=${(e) => changeQty(e, 1)}>+</button>
                    </div>
                    <button class="c-add-btn" @click="${handleAddToCart}">
                        ${cartIcon()} Do košíka
                    </button>
                </div>
            </div>
        </article>
    `;
};
