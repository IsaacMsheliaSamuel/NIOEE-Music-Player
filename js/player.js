// NIOEE Music Player
// Owner: Isaac

// AUDIO SETUP
const audio = new Audio();

// PLAYER STATE
const playerState = {
    currentTrackIndex: 0,
    isPlaying: false,
    isShuffleOn: false,
    repeatMode: "off",
    volume: 1,
    previousVolume: 1
};

// LOCAL STORAGE
const savePlayerState = () => {
    localStorage.setItem(
        "nioeePlayerState",
        JSON.stringify({
            currentTrackIndex: playerState.currentTrackIndex,
            currentTime: audio.currentTime,
            volume: playerState.volume
        })
    );
};

const restorePlayerState = () => {
    const savedState =
        localStorage.getItem("nioeePlayerState");
    if (!savedState) {
        return;
    }
    const saved = JSON.parse(savedState);
    playerState.currentTrackIndex =
        saved.currentTrackIndex ?? 0;
    playerState.volume =
        saved.volume ?? 1;
};

// PLAYER BUTTONS
const playBtn = document.querySelector("#play-btn");
const miniPlayBtn = document.querySelector("#mini-play-btn");

const previousBtn = document.querySelector("#previous-btn");
const nextBtn = document.querySelector("#next-btn");

const miniPreviousBtn = document.querySelector("#mini-previous-btn");
const miniNextBtn = document.querySelector("#mini-next-btn");

const shuffleBtn = document.querySelector("#shuffle-btn");
const miniShuffleBtn = document.querySelector("#mini-shuffle-btn");

const repeatBtn = document.querySelector("#repeat-btn");
const miniRepeatBtn = document.querySelector("#mini-repeat-btn");

const progressBar = document.querySelector("#progress-bar");
const currentTimeDisplay = document.querySelector("#current-time");
const durationDisplay = document.querySelector("#duration");

const muteBtn = document.querySelector("#mute-btn");
const volumeBar = document.querySelector("#volume-bar");

// BACK BUTTON
const backBtn = document.querySelector(".back-btn");
if (backBtn) {
    backBtn.addEventListener("click", () => {
        goBack();
    });
}

// TRACK INFORMATION
const songTitle = document.querySelector("#song-title");
const songArtist = document.querySelector("#song-artist");
const albumCover = document.querySelector("#album-cover");

const miniSongTitle = document.querySelector("#mini-song-title");
const miniSongArtist = document.querySelector("#mini-song-artist");
const miniAlbumCover = document.querySelector("#mini-album-cover");


// GET CURRENT TRACK
const getCurrentTrack = () => {
    return playlist[playerState.currentTrackIndex];
};

// UPDATE TRACK INFORMATION
const updateTrackInfo = () => {
    const track = getCurrentTrack();
    songTitle.textContent = track.title;
    songArtist.textContent = track.artist;
    albumCover.src = track.cover;

    miniSongTitle.textContent = track.title;
    miniSongArtist.textContent = track.artist;
    miniAlbumCover.src = track.cover;
};

// LOAD TRACK
const loadTrack = () => {
    const track = getCurrentTrack();
    audio.src = track.src;
    audio.volume = playerState.volume;
    audio.load();
    updateTrackInfo();
    progressBar.value = 0;
    currentTimeDisplay.textContent = "0:00";
    durationDisplay.textContent = "0:00";
};

// PLAY TRACK
const playTrack = () => {
    audio.play();
    playerState.isPlaying = true;
    playBtn.textContent = "❚❚";
    miniPlayBtn.textContent = "❚❚";
};

// PAUSE TRACK
const pauseTrack = () => {
    audio.pause();
    playerState.isPlaying = false;
    playBtn.textContent = "▶";
    miniPlayBtn.textContent = "▶";
};

// TOGGLE PLAY / PAUSE
const togglePlay = () => {
    if (playerState.isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
};

// NEXT TRACK
const nextTrack = () => {
    if (playerState.isShuffleOn) {
        let randomIndex;
        do {
            randomIndex =
                Math.floor(Math.random() * playlist.length);
        } while (
            randomIndex === playerState.currentTrackIndex &&
            playlist.length > 1
        );
        playerState.currentTrackIndex = randomIndex;
    } else {
        playerState.currentTrackIndex++;
        if (playerState.currentTrackIndex >= playlist.length) {
            playerState.currentTrackIndex = 0;
        }
    }
    loadTrack();
    savePlayerState();
    if (playerState.isPlaying) {
        playTrack();
    }
};

// PREVIOUS TRACK
const previousTrack = () => {
    playerState.currentTrackIndex--;
    if (playerState.currentTrackIndex < 0) {
        playerState.currentTrackIndex = playlist.length - 1;
    }
    loadTrack();
    savePlayerState();
    if (playerState.isPlaying) {
        playTrack();
    }
};

// SHUFFLE
const toggleShuffle = () => {
    playerState.isShuffleOn =
        !playerState.isShuffleOn;
    updateShuffleButtons();
};

const updateShuffleButtons = () => {
    const opacity =
        playerState.isShuffleOn ? "1" : "0.5";
    shuffleBtn.style.opacity = opacity;
    miniShuffleBtn.style.opacity = opacity;
};

// REPEAT
const toggleRepeat = () => {
    if (playerState.repeatMode === "off") {
        playerState.repeatMode = "all";
    } else if (playerState.repeatMode === "all") {
        playerState.repeatMode = "one";
    } else {
        playerState.repeatMode = "off";
    }
    updateRepeatButtons();
};

const updateRepeatButtons = () => {
    if (playerState.repeatMode === "off") {
        repeatBtn.textContent = "🔁";
        miniRepeatBtn.textContent = "🔁";
        repeatBtn.style.opacity = "0.5";
        miniRepeatBtn.style.opacity = "0.5";
    } else if (playerState.repeatMode === "all") {
        repeatBtn.textContent = "🔁";
        miniRepeatBtn.textContent = "🔁";
        repeatBtn.style.opacity = "1";
        miniRepeatBtn.style.opacity = "1";
    } else {
        repeatBtn.textContent = "🔂";
        miniRepeatBtn.textContent = "🔂";
        repeatBtn.style.opacity = "1";
        miniRepeatBtn.style.opacity = "1";
    }
};

// FORMAT TIME
const formatTime = (time) => {
    if (!Number.isFinite(time)) {
        return "0:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
};

// UPDATE PROGRESS
const updateProgress = () => {
    if (!Number.isFinite(audio.duration)) {
        return;
    }
    progressBar.value =
        (audio.currentTime / audio.duration) * 100;
    currentTimeDisplay.textContent =
        formatTime(audio.currentTime);
};

// LOAD DURATION
const updateDuration = () => {
    if (!Number.isFinite(audio.duration)) {
        return;
    }
    durationDisplay.textContent =
        formatTime(audio.duration);
};

// SEEK
const seekTrack = () => {
    if (!Number.isFinite(audio.duration)) {
        return;
    }
    const seekTime =
        (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
};

// WHEN SONG ENDS
const handleTrackEnd = () => {
    if (playerState.repeatMode === "one") {
        audio.currentTime = 0;
        playTrack();
        return;
    }
    nextTrack();
};

// VOLUME
const updateVolume = () => {
    const volume =
        Number(volumeBar.value) / 100;
    playerState.volume = volume;
    audio.volume = volume;
    if (volume > 0) {
        playerState.previousVolume = volume;
    }
    updateMuteButton();
    savePlayerState();
};

// MUTE / UNMUTE
const toggleMute = () => {
    if (audio.volume > 0) {
        playerState.previousVolume =
            audio.volume;
        audio.volume = 0;
        playerState.volume = 0;
        volumeBar.value = 0;
    } else {
        const restoredVolume =
            playerState.previousVolume || 1;
        audio.volume = restoredVolume;
        playerState.volume = restoredVolume;
        volumeBar.value =
            restoredVolume * 100;
    }
    updateMuteButton();
};

// UPDATE MUTE BUTTON
const updateMuteButton = () => {
    if (audio.volume === 0) {
        muteBtn.textContent = "🔇";
        muteBtn.setAttribute(
            "aria-label",
            "Unmute"
        );
    } else {
        muteBtn.textContent = "🔊";
        muteBtn.setAttribute(
            "aria-label",
            "Mute"
        );
    }
};

// PLAY BUTTON EVENTS
playBtn.addEventListener("click", togglePlay);
miniPlayBtn.addEventListener("click", togglePlay);

// NEXT / PREVIOUS EVENTS
nextBtn.addEventListener("click", nextTrack);
miniNextBtn.addEventListener("click", nextTrack);

previousBtn.addEventListener("click", previousTrack);
miniPreviousBtn.addEventListener("click", previousTrack);

// SHUFFLE EVENTS
shuffleBtn.addEventListener("click", toggleShuffle);
miniShuffleBtn.addEventListener("click", toggleShuffle);

// REPEAT EVENTS
repeatBtn.addEventListener("click", toggleRepeat);
miniRepeatBtn.addEventListener("click", toggleRepeat);

// PROGRESS EVENTS
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("timeupdate", () => {
    updateProgress();
    savePlayerState();
});
audio.addEventListener("loadedmetadata", updateDuration);
audio.addEventListener("loadedmetadata", () => {
    const savedState =
        localStorage.getItem("nioeePlayerState");
    if (!savedState) {
        return;
    }
    const saved = JSON.parse(savedState);
    if (saved.currentTrackIndex === playerState.currentTrackIndex) {
        audio.currentTime = saved.currentTime || 0;
    }
});
progressBar.addEventListener("input", seekTrack);
audio.addEventListener("ended", handleTrackEnd);

// VOLUME EVENTS
volumeBar.addEventListener("input", updateVolume);
muteBtn.addEventListener("click", toggleMute);

// INITIAL PLAYER STATE
updateShuffleButtons();
updateRepeatButtons();
updateMuteButton();

// START PLAYER
restorePlayerState();
loadTrack();