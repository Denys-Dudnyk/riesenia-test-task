import { html } from "lit-html";
import { openModal } from "../../components/modal";
import { arrowRightIcon } from "../../components/ui/icons";
import { highlightText } from "../../utils/helpers";

// Solution CTA section
export const solutionCta = (ctaBanner) => {
    const description = highlightText(ctaBanner.description, "výkonných a spoľahlivých vŕtačiek");

    return html`
        <div class="c-solution-cta">
            <div
                class="c-solution-cta__image"
                style="background-image: url('src/assets/images/cta-banner-bg.webp')"
            ></div>

            <div class="c-solution-cta__overlay"></div>

            <div class="c-solution-cta__content">
                <h2 class="c-solution-cta__content__title">${ctaBanner.title}</h2>

                <div class="c-solution-cta__content__description">${description}</div>

                <button class="c-solution-cta__content__button" @click=${() => openModal()}>
                    <span class="sc-text">${ctaBanner.ctaText}</span>
                    ${arrowRightIcon()}
                </button>
            </div>
        </div>
    `;
};
