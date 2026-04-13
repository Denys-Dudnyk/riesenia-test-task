// Banner button click handler
export const handleBannerClick = () => {
    console.log("Banner button clicked");
    const contentSection = document.querySelector(".l-solution__content");

    if (contentSection) {
        contentSection.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }
};
