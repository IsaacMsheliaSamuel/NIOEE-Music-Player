// NIOEE App Navigation
// Temporary navigation for testing


// PAGE STATE

let currentPage = "home";
const pageHistory = [];


// GET PAGES
const pages = document.querySelectorAll(".app-page");

// SHOW PAGE
const showPage = (pageName, saveHistory = true) => {
    const targetPage =
        document.querySelector(
            `[data-page="${pageName}"]`
        );
    if (!targetPage) {
        return;
    }

    // Save current page
    if (
        saveHistory &&
        currentPage !== pageName
    ) {
        pageHistory.push(currentPage);
    }

    // Hide every page
    pages.forEach((page) => {
        page.hidden = true;
    });


    // Show selected page
    targetPage.hidden = false;
    currentPage = pageName;

};

// NAVIGATION
const navigateTo = (pageName) => {
    showPage(pageName);
};

// GO BACK
const goBack = () => {
    if (pageHistory.length === 0) {
        showPage("home", false);
        return;
    }

    const previousPage =
        pageHistory.pop();

    showPage(previousPage, false);
};

// NAVIGATION BUTTONS
document.addEventListener(
    "click",
    (event) => {
        const navigationButton =
            event.target.closest(
                "[data-navigate]"
            );
        if (navigationButton) {
            const pageName =
                navigationButton.dataset.navigate;
            navigateTo(pageName);
            return;
        }

        const backButton =
            event.target.closest(
                "[data-back]"
            );

        if (backButton) {
            goBack();
            return;
        }
    }
);

// START APP
showPage("home", false);