import { html } from "lit-html";
import { validateEmail } from "../api/emailApi";
import { handlePhoneInput } from "../utils/helpers";
import { arrowRightIconSmall, closeIcon } from "./ui/icons";
import { customSelect } from "./ui/select";
import { showToast } from "./ui/toast";

export const openModal = () => {
    const modal = document.getElementById("cta-modal");
    if (modal) modal.classList.add("is-active");
};

const closeModal = () => {
    const modal = document.getElementById("cta-modal");
    if (modal) modal.classList.remove("is-active");
};

const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (!data.source || data.source === "") {
        showToast("Prosím, vyberte jednu z možností v zozname.", "error");

        const customSelect = document.getElementById("customSelectSource");
        customSelect.classList.add("has-error");

        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        const emailInput = form.querySelector('input[name="email"]');
        emailInput.classList.add("has-error");
        showToast("Zadajte platný e-mail vo formáte meno@domena.sk", "error");
        return;
    }

    const phoneClean = data.phone.replace(/\s/g, "");
    if (!/^\d{9}$/.test(phoneClean)) {
        showToast("Zadajte platné telefónne číslo (9 číslic).", "error");

        return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = "Odosielam...";
    submitBtn.disabled = true;

    try {
        const apiResult = await validateEmail(data.email);

        if (apiResult.success) {
            showToast("Tajná ponuka bola úspešne odoslaná na váš e-mail!", "success");
            form.reset();
            closeModal();
        } else {
            showToast(apiResult.message || "Tento e-mail nie je povolený.", "error");
        }
    } catch (error) {
        console.log(error);
        showToast("Vyskytla sa chyba pri komunikácii so serverom.", "error");
    } finally {
        submitBtn.innerHTML = originalBtnContent;
        submitBtn.disabled = false;
    }
};

export const ctaModal = () => html`
    <div id="cta-modal" class="c-modal">
        <div class="c-modal__overlay" @click=${closeModal}></div>
        <div class="c-modal__content">
            <button class="c-modal__close" @click=${closeModal} aria-label="Zavrieť">
                ${closeIcon()}
            </button>

            <div class="c-modal__header">
                <h2 class="c-modal__title">Tajná ponuka produktov<br />Dewalt len pre vás</h2>
                <span class="c-modal__required">* povinné polia</span>
            </div>

            <form class="c-modal__form" @submit=${handleFormSubmit}>
                <div class="form-group">
                    <label>E-mail <span>*</span></label>
                    <input type="email" name="email" required placeholder="Napr. jozko@gmail.com" />
                </div>

                <div class="form-row">
                    <div class="form-group half">
                        <label>Meno a priezvisko <span>*</span></label>
                        <input type="text" name="name" id="name" required />
                    </div>

                    <div class="form-group half">
                        <label>Telefónne číslo (mobil) <span>*</span></label>
                        <div class="phone-input-wrap">
                            <span class="prefix">+421</span>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                placeholder="_ _ _  _ _ _   _ _ _"
                                @input=${handlePhoneInput}
                                autocomplete="off"
                            />
                        </div>
                    </div>
                </div>

                ${customSelect()}

                <div class="c-modal__footer">
                    <button type="submit" class="c-add-btn is-primary">
                        Získať tajnú ponuku ${arrowRightIconSmall()}
                    </button>
                    <p class="consent-text">
                        Odoslaním formuláru súhlasíte<br />
                        so <a href="/privacy-policy" target="_blank">spracovaním osobných údajov</a>
                    </p>
                </div>
            </form>
        </div>
    </div>
`;
