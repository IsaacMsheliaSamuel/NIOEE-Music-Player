// NIOEE Playlist
// OWNER : ELI


// ========================= GET ELEMENTS =========================

const playlistTabs =
    document.querySelectorAll("#playlist-page .tabs button");

const playlistSection =
    document.querySelector("#playlist-page");


// ========================= CREATE DISPLAY AREA =========================

const playlistDisplay =
    document.createElement("div");

playlistDisplay.className = "playlist-display";

playlistSection.appendChild(playlistDisplay);


// ========================= SHUFFLE SONGS =========================

const shuffleSongs = (songs) => {

    return [...songs].sort(() => Math.random() - 0.5);

};


// ========================= CREATE SONG CARD =========================

const createPlaylistSong = (track, trackIndex) => {

    const songCard =
        document.createElement("article");

    songCard.className = "playlist-song";

    songCard.dataset.playTrack = trackIndex;

    songCard.innerHTML = `
        <img
            src="${track.cover}"
            alt="${track.title} cover"
        >

        <h3>${track.title}</h3>

        <p>${track.artist}</p>
    `;

    return songCard;
};


// ========================= DISPLAY SONGS =========================

const displaySongs = (songs) => {

    playlistDisplay.innerHTML = "";

    songs.forEach((track) => {

        const trackIndex =
            playlist.indexOf(track);

        const songCard =
            createPlaylistSong(
                track,
                trackIndex
            );

        playlistDisplay.appendChild(songCard);

    });

};


// ========================= FAVORITES =========================

const showFavorites = () => {

    displaySongs(playlist);

};


// ========================= RECENTLY ADDED =========================

const showRecentlyAdded = () => {

    const randomSongs =
        shuffleSongs(playlist);

    displaySongs(randomSongs);

};


// ========================= MOST PLAYED =========================

const showMostPlayed = () => {

    const randomSongs =
        shuffleSongs(playlist);

    displaySongs(randomSongs);

};


// ========================= TAB CLICK =========================

playlistTabs.forEach((button, index) => {

    button.addEventListener("click", () => {

        playlistTabs.forEach((tab) => {
            tab.classList.remove("active");
        });

        button.classList.add("active");


        if (index === 0) {

            showFavorites();

        } else if (index === 1) {

            showRecentlyAdded();

        } else if (index === 2) {

            showMostPlayed();

        }

    });

});


// ========================= PLAY SONG =========================

playlistDisplay.addEventListener("click", (event) => {

    const songCard =
        event.target.closest("[data-play-track]");

    if (!songCard) {
        return;
    }

    const trackIndex =
        Number(songCard.dataset.playTrack);

    if (
        trackIndex < 0 ||
        trackIndex >= playlist.length
    ) {
        return;
    }

    playerState.currentTrackIndex =
        trackIndex;

    loadTrack();

    playTrack();

    savePlayerState();

});


// ========================= DEFAULT VIEW =========================

if (playlistTabs.length > 0) {

    playlistTabs[0].classList.add("active");

    showFavorites();

}