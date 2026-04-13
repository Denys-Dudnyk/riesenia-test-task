import { html } from "lit-html";

export const highlightText = (text, phrase) => {
    const parts = text.split(phrase);

    return html` ${parts[0]}<strong>${phrase}</strong>${parts[1]} `;
};

export const handlePhoneInput = (e) => {
    let rawValue = e.target.value.replace(/\D/g, "").substring(0, 9);

    if (rawValue.length > 0) {
        e.target.value = rawValue.match(/.{1,3}/g).join(" ");
    } else {
        e.target.value = "";
    }
};
