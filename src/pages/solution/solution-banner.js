import { html } from "lit-html";
import { arrowRightIcon } from "../../components/ui/icons";
import { handleBannerClick } from "../../utils/dom";
import { highlightText } from "../../utils/helpers";

// Solution main banner
export const solutionBanner = (banner) => {
    const description = highlightText(
        banner.description,
        "vŕtačky R-driller so zľavami až do 40 %. Spoľahlivý výkon, precízne spracovanie a dlhá životnosť"
    );

    return html`
        <div class="c-solution-banner">
            <div class="c-solution-banner__image">
                <picture>
                    <source media="(max-width: 768px)" srcset="/images/hero-banner-mobile.png" />
                    <img src="/images/hero-banner-bg.webp" alt="${banner.title}" />
                </picture>
            </div>
            <div class="c-solution-banner__overlay"></div>
            <div class="c-solution-banner__content">
                <h1 class="c-solution-banner__content__title">${banner.title}</h1>
                <div class="c-solution-banner__content__description">${description}</div>
                <button
                    class="c-solution-banner__content__button"
                    @click=${() => handleBannerClick()}
                >
                    <span class="sb-text">${banner.ctaText}</span>
                    ${arrowRightIcon()}
                </button>
            </div>
        </div>
    `;
};
