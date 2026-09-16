const searchInput = document.querySelector(".search-input");
const resultsList = document.querySelector(".recents");
const resultsHeading = document.querySelector("#search-page h2");

// RECENT SEARCHES (localStorage, same pattern as nioeePlayerState)
const RECENTS_KEY = "nioeeRecentSearches";
const MAX_RECENTS = 5;

const getRecentSearches = () => {
    const saved = localStorage.getItem(RECENTS_KEY);
    if (!saved) {
        return [];
    }
    try {
        return JSON.parse(saved);
    } catch {
        return [];
    }
};

const saveRecentSearch = (query) => {
    const trimmed = query.trim();
    if (!trimmed) {
        return;
    }
    let recents = getRecentSearches();
    recents = recents.filter(
        (item) => item.toLowerCase() !== trimmed.toLowerCase()
    );
    recents.unshift(trimmed);
    recents = recents.slice(0, MAX_RECENTS);
    localStorage.setItem(RECENTS_KEY, JSON.stringify(recents));
};

// SEARCH LOGIC
const searchPlaylist = (query) => {
    const term = query.trim().toLowerCase();
    if (!term) {
        return [];
    }
    return playlist.filter((track) => {
        return (
            track.title.toLowerCase().includes(term) ||
            track.artist.toLowerCase().includes(term)
        );
    });
};

// RENDER: SEARCH RESULTS
const renderResults = (tracks, query) => {
    resultsList.innerHTML = "";

    if (tracks.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.textContent = `No results for "${query}"`;
        emptyItem.classList.add("search-empty");
        resultsList.appendChild(emptyItem);
        return;
    }

    tracks.forEach((track) => {
        const item = document.createElement("li");
        item.classList.add("search-result-item");

        const cover = document.createElement("img");
        cover.src = track.cover;
        cover.alt = `${track.title} cover`;
        cover.classList.add("search-result-cover");

        const label = document.createElement("span");
        label.classList.add("search-result-label");
        label.textContent = `${track.title} · ${track.artist}`;

        item.appendChild(cover);
        item.appendChild(label);

        item.addEventListener("click", () => {
            playTrackFromSearch(track);
        });

        resultsList.appendChild(item);
    });
};

// RENDER: RECENT SEARCHES
const renderRecents = () => {
    const recents = getRecentSearches();
    resultsList.innerHTML = "";

    if (resultsHeading) {
        resultsHeading.textContent = "Recent Searches";
    }

    if (recents.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.textContent = "No recent searches yet";
        emptyItem.classList.add("search-empty");
        resultsList.appendChild(emptyItem);
        return;
    }

    recents.forEach((query) => {
        const item = document.createElement("li");
        item.classList.add("recent-search-item");
        item.textContent = query;

        item.addEventListener("click", () => {
            searchInput.value = query;
            handleSearchInput();
        });

        resultsList.appendChild(item);
    });
};

// PLAY A TRACK SELECTED FROM SEARCH
const playTrackFromSearch = (track) => {
    const index = playlist.findIndex((item) => item.id === track.id);
    if (index === -1) {
        return;
    }

    saveRecentSearch(searchInput.value);
    playerState.currentTrackIndex = index;
    loadTrack();
    playTrack();
    savePlayerState();

    // Hand off navigation to app.js's router so it stays
    // consistent with the rest of the app (data-navigate pattern)
    const navigateTarget = document.querySelector(
        '[data-navigate="now-playing"]'
    );
    if (navigateTarget) {
        navigateTarget.click();
    } else if (typeof navigateTo === "function") {
        navigateTo("now-playing");
    }
};

// HANDLE INPUT
const handleSearchInput = () => {
    const query = searchInput.value;

    if (resultsHeading) {
        resultsHeading.textContent = query.trim() ? "Results" : "Recent Searches";
    }

    if (!query.trim()) {
        renderRecents();
        return;
    }

    const matches = searchPlaylist(query);
    renderResults(matches, query);
};

// SAVE SEARCH TO RECENTS WHEN USER FINISHES TYPING
let searchDebounce;
searchInput.addEventListener("input", () => {
    handleSearchInput();
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
        saveRecentSearch(searchInput.value);
    }, 600);
});

// INITIAL STATE (show recents when the search page first loads)
renderRecents();