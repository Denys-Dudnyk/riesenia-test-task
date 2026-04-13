export const showToast = (message, type = "success") => {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `c-toast is-${type}`;

    const successIcon = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM10 18C5.589 18 2 14.411 2 10C2 5.589 5.589 2 10 2C14.411 2 18 5.589 18 10C18 14.411 14.411 18 10 18ZM13.707 6.293L8 12L6.293 10.293L4.879 11.707L8 14.828L15.121 7.707L13.707 6.293Z" fill="currentColor"/>
        </svg>
    `;

    const errorIcon = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM10 18C5.589 18 2 14.411 2 10C2 5.589 5.589 2 10 2C14.411 2 18 5.589 18 10C18 14.411 14.411 18 10 18ZM11 5H9V11H11V5ZM11 13H9V15H11V13Z" fill="currentColor"/>
        </svg>
    `;

    const icon = type === "success" ? successIcon : errorIcon;

    toast.innerHTML = `
        <div class="c-toast__icon">${icon}</div>
        <div class="c-toast__content">
            <p class="c-toast__message">${message}</p>
        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("is-fading");
        setTimeout(() => toast.remove(), 500);
    }, 3000);
};
