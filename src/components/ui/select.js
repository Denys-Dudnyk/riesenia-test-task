import { html } from "lit-html";

const toggleCustomSelect = (e) => {
    e.stopPropagation();
    const select = e.currentTarget.closest(".c-modal__custom-select");
    if (select) {
        select.classList.toggle("is-active");
    }
};

const handleOptionSelect = (e) => {
    const option = e.currentTarget;
    if (option.classList.contains("is-disabled")) return;

    const value = option.getAttribute("data-value");
    const text = option.textContent;
    const select = option.closest(".c-modal__custom-select");

    select.classList.remove("has-error");

    if (!select) return;

    const textHolder = select.querySelector(".c-modal__selected-text");
    const hiddenInput = select.querySelector('input[type="hidden"]');

    if (textHolder) textHolder.textContent = text;
    if (hiddenInput) hiddenInput.value = value;

    const options = select.querySelectorAll(".c-modal__option");
    options.forEach((opt) => opt.classList.remove("is-selected"));
    option.classList.add("is-selected");

    select.classList.remove("is-active");
};

document.addEventListener("click", () => {
    const activeSelects = document.querySelectorAll(".c-modal__custom-select.is-active");
    activeSelects.forEach((s) => s.classList.remove("is-active"));
});

export const customSelect = () =>
    html` <div class="c-modal__custom-select" id="customSelectSource">
        <input type="hidden" name="source" value="" required />

        <div class="c-modal__select-trigger" @click=${toggleCustomSelect}>
            <span class="c-modal__selected-text">Vyberte možnosť</span>
            <svg
                class="c-modal__select-arrow"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
            >
                <path
                    d="M15.023 7.14798L9.39804 12.773C9.3458 12.8253 9.28376 12.8668 9.21547 12.8951C9.14719 12.9234 9.07399 12.9379 9.00007 12.9379C8.92615 12.9379 8.85295 12.9234 8.78466 12.8951C8.71638 12.8668 8.65434 12.8253 8.6021 12.773L2.9771 7.14798C2.87155 7.04243 2.81226 6.89927 2.81226 6.75001C2.81226 6.60074 2.87155 6.45759 2.9771 6.35204C3.08265 6.24649 3.2258 6.18719 3.37507 6.18719C3.52434 6.18719 3.66749 6.24649 3.77304 6.35204L9.00007 11.5798L14.2271 6.35204C14.2794 6.29978 14.3414 6.25832 14.4097 6.23004C14.478 6.20175 14.5512 6.18719 14.6251 6.18719C14.699 6.18719 14.7722 6.20175 14.8404 6.23004C14.9087 6.25832 14.9708 6.29978 15.023 6.35204C15.0753 6.4043 15.1168 6.46634 15.145 6.53463C15.1733 6.60291 15.1879 6.6761 15.1879 6.75001C15.1879 6.82392 15.1733 6.8971 15.145 6.96539C15.1168 7.03367 15.0753 7.09571 15.023 7.14798Z"
                    fill="#DD1969"
                />
            </svg>
        </div>

        <ul class="c-modal__select-options">
            <li class="c-modal__option is-disabled" data-value="" @click=${handleOptionSelect}>
                Vyberte možnosť
            </li>
            <li
                class="c-modal__option"
                data-value="Priamo z vášho webu"
                @click=${handleOptionSelect}
            >
                Priamo z vášho webu
            </li>
            <li
                class="c-modal__option"
                data-value="Zo sociálnych sietí"
                @click=${handleOptionSelect}
            >
                Zo sociálnych sietí
            </li>
            <li class="c-modal__option" data-value="Od známeho" @click=${handleOptionSelect}>
                Od známeho
            </li>
            <li class="c-modal__option" data-value="Iné" @click=${handleOptionSelect}>Iné</li>
        </ul>
    </div>`;
