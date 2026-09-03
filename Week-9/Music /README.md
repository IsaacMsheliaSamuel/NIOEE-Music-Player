# Assignment: Build a Music Player with Vanilla JavaScript

**Duration:** 2-3 weeks
**Weight:** 20% of course grade
**Submission:** GitHub repository link plus a deployed URL (GitHub Pages, Netlify, or Vercel)

## Objective

Build a working browser based music player using only HTML, CSS, and plain JavaScript. The goal is to demonstrate DOM manipulation, event handling, state management, and use of the HTML5 Audio API without relying on a framework.

## Constraints

1. No frameworks or UI libraries. React, Vue, jQuery, Bootstrap, and Tailwind are not permitted.
2. No build tools. The app must run by opening `index.html` in a browser.
3. All JavaScript must live in `.js` files. No logic inside `onclick` attributes.
4. Use ES6+ syntax: `const`/`let`, arrow functions, template literals, destructuring.
5. Supply your own royalty free audio files (3 to 5 tracks) or link to public domain sources. Do not commit copyrighted music.

## Core Requirements (70 marks)

### 1. Playback controls (20 marks)
- Play and pause with a button that reflects the current state.
- Next and previous track navigation.
- Playback wraps around at both ends of the playlist.

### 2. Track information display (10 marks)
- Show the current track title, artist, and cover art.
- Update the display whenever the track changes.

### 3. Progress bar (15 marks)
- A seek bar that advances as the track plays.
- Current time and total duration displayed in `m:ss` format.
- Clicking or dragging the bar seeks to that position in the track.

### 4. Volume control (10 marks)
- A slider that adjusts volume from 0 to 100%.
- A mute toggle that restores the previous volume level when unmuted.

### 5. Playlist view (15 marks)
- Render the full track list from a JavaScript array of objects.
- Clicking a track loads and plays it.
- The active track is visually highlighted.

## Stretch Requirements (30 marks)

Complete any three:

- **Shuffle and repeat** (10 marks): repeat off, repeat one, repeat all, plus a shuffle toggle.
- **Search and filter** (10 marks): filter the playlist by title or artist as the user types.
- **Persistence** (10 marks): store the last played track, playback position, and volume in `localStorage` and restore them on reload.
- **Keyboard shortcuts** (10 marks): space to toggle play, arrow keys to seek and change volume.
- **Audio visualiser** (10 marks): a waveform or frequency bar display using the Web Audio API `AnalyserNode`.
- **Responsive layout** (10 marks): a usable layout at 320px, 768px, and 1200px widths.

## Suggested Project Structure

```
music-player/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js          // wiring and initialisation
│   ├── player.js       // audio state and playback logic
│   └── playlist.js     // track data and list rendering
└── assets/
    ├── audio/
    └── images/
```

## Data Format

Define your playlist as an array of objects:

```javascript
const playlist = [
  {
    id: 1,
    title: "Track Title",
    artist: "Artist Name",
    src: "assets/audio/track-01.mp3",
    cover: "assets/images/cover-01.jpg",
  },
];
```

## Technical Hints

- The `Audio` object exposes `play()`, `pause()`, `currentTime`, `duration`, and `volume`.
- Listen for `timeupdate` to drive the progress bar and `ended` to advance the playlist.
- `loadedmetadata` fires when `duration` becomes available. Reading it earlier returns `NaN`.
- Attach one click listener to the playlist container and use `event.target.closest()` instead of a listener per track.
- Keep playback state in a single object rather than scattered variables.

## Deliverables

1. A public Git repository with a minimum of 10 meaningful commits.
2. A `README.md` covering setup steps, a feature list, the stretch goals attempted, and known limitations.
3. A deployed, publicly reachable URL.
4. A screen recording of 2 to 3 minutes demonstrating each feature.

## Grading Rubric

| Criterion | Marks |
|---|---|
| Core functionality | 70 |
| Stretch features (3 x 10) | 30 |
| Code organisation and naming | 15 |
| UI design and responsiveness | 15 |
| Documentation and commit history | 10 |
| Error handling (missing files, failed loads) | 10 |
| **Total** | **150** |
