/// NIOEE App Navigation
// Temporary navigation for testing

// PAGE STATE
let currentPage = "home";
const pageHistory = [];

// GET PAGES
const pages = document.querySelectorAll(".app-page");

// SHOW PAGE
const showPage = (pageName, saveHistory = true) => {
    const targetPage = document.querySelector(
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
    // Move focus to the selected page
    targetPage.setAttribute("tabindex", "-1");
    targetPage.focus();
    // Move the screen to the selected page
    targetPage.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
    // Focus the search input if the page has one
    const searchInput = targetPage.querySelector("input");
    if (searchInput) {
        searchInput.focus();
    }
    // Update active navigation link
    const navigationLinks = document.querySelectorAll(
        ".main-navigation .nav-link"
    );
    navigationLinks.forEach((link) => {
        link.classList.remove("active");
    });
    const activeLink = document.querySelector(
        `.main-navigation [data-navigate="${pageName}"]`
    );
    if (activeLink) {
        activeLink.classList.add("active");
    }
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

    const previousPage = pageHistory.pop();

    showPage(previousPage, false);
};

// NAVIGATION BUTTONS

document.addEventListener("click", (event) => {

    const navigationButton =
        event.target.closest("[data-navigate]");

    if (navigationButton) {
        event.preventDefault();

        const pageName =
            navigationButton.dataset.navigate;

        navigateTo(pageName);

        return;
    }

    const backButton =
        event.target.closest("[data-back]");
        
    if (backButton) {
        goBack();

        return;
    }
});

// START APP
showPage("home", false);