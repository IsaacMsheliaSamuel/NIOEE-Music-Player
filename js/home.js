// NIOEE Home
// OWNER : NOAH MAZTAH


//HOME DATA
const jumpBackIn = [
    {
        title: "Afrobeats Mix",
        description: "Playlist",
        trackIndex: 0
    },
    {
        title: "Aura Salad",
        description: "Album",
        trackIndex: 1
    },
    {
        title: "New Music",
        description: "Playlist",
        trackIndex: 2
    },
    {
        title: "Rap Mix",
        description: "Playlist",
        trackIndex: 3
    }
];


const recentlyPlayed = [
    {
        title: "Hip Hop Mix",
        description: "Recently played",
        trackIndex: 0
    },
    {
        title: "Chill Mix",
        description: "Recently played",
        trackIndex: 1
    },
    {
        title: "Focus Mix",
        description: "Recently played",
        trackIndex: 2
    },
    {
        title: "Night Mix",
        description: "Recently played",
        trackIndex: 3
    },
    {
        title: "Daily Mix",
        description: "Recently played",
        trackIndex: 4
    },
    {
        title: "Evening Mix",
        description: "Recently played",
        trackIndex: 0
    },
    {
        title: "Morning Mix",
        description: "Recently played",
        trackIndex: 1
    },
    {
        title: "Relax Mix",
        description: "Recently played",
        trackIndex: 2
    }
];


const madeForYou = [
    {
        title: "Chill Session",
        description: "Perfect for relaxing",
        trackIndex: 3
    },
    {
        title: "Focus Flow",
        description: "Keep your mind moving",
        trackIndex: 4
    },
    {
        title: "Evening Vibes",
        description: "Your evening soundtrack",
        trackIndex: 0
    },
    {
        title: "Daily Mix",
        description: "A mix picked for you",
        trackIndex: 1
    }
];


//GET HOME CONTAINERS
const jumpBackCards =
    document.querySelector("#jump-back-cards");

const recentlyPlayedCards =
    document.querySelector("#recently-played-cards");

const madeForYouCards =
    document.querySelector("#made-for-you-cards");


//CREATE QUICK CARD
const createQuickCard = (item) => {

    const track = playlist[item.trackIndex];

    const card = document.createElement("article");

    card.className = "quick-card";

    card.dataset.playTrack = item.trackIndex;

    card.innerHTML = `
        <img
            src="${track.cover}"
            alt="${item.title} cover"
        >

        <div class="quick-card-info">

            <h3>${item.title}</h3>

            <p>${item.description}</p>

        </div>
    `;

    return card;
};


// CREATE MUSIC CARD
const createMusicCard = (item) => {

    const track = playlist[item.trackIndex];

    const card = document.createElement("article");

    card.className = "music-card";

    card.dataset.playTrack = item.trackIndex;

    card.innerHTML = `
        <img
            src="${track.cover}"
            alt="${item.title} cover"
        >

        <h3>${item.title}</h3>

        <p>${item.description}</p>
    `;

    return card;
};


//RENDER QUICK CARDS

const renderJumpBackIn = () => {

    jumpBackIn.forEach((item) => {

        const card = createQuickCard(item);

        jumpBackCards.appendChild(card);

    });
};


//RENDER RECENTLY PLAYED
const renderRecentlyPlayed = () => {

    recentlyPlayed.forEach((item) => {

        const card = createMusicCard(item);

        recentlyPlayedCards.appendChild(card);

    });
};


//RENDER MADE FOR YOU

const renderMadeForYou = () => {

    madeForYou.forEach((item) => {

        const card = createMusicCard(item);

        madeForYouCards.appendChild(card);

    });
};


//PLAY HOME TRACK
const playHomeTrack = (trackIndex) => {

    if (
        trackIndex < 0 ||
        trackIndex >= playlist.length
    ) {
        console.error(
            "Invalid track index:",
            trackIndex
        );

        return;
    }

    playerState.currentTrackIndex = trackIndex;

    loadTrack();

    playTrack();

    savePlayerState();
};


//HOME CARD CLICK
document.addEventListener("click", (event) => {

    const card =
        event.target.closest("[data-play-track]");

    if (!card) {
        return;
    }

    const trackIndex =
        Number(card.dataset.playTrack);

    playHomeTrack(trackIndex);

});


//START HOME
renderJumpBackIn();

renderRecentlyPlayed();

renderMadeForYou();