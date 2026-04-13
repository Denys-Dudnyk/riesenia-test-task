import { html } from "lit-html";

export const highlightText = (text, phrase) => {
    const parts = text.split(phrase);

    return html` ${parts[0]}<strong>${phrase}</strong>${parts[1]} `;
};
