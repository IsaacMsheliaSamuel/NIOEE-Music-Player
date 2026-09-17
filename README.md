# NIOEE — Music Player
NIOEE is a browser-based music player built with HTML, CSS and Vanilla JavaScript.
This project is being developed as a team project for the Frontend Cohort. 

## Project Goal
Build a functional music player with a clean, responsive interface while demonstrating:
- DOM manipulation
- Event handling
- JavaScript state management
- HTML5 Audio API
- Dynamic track rendering
- Search and filtering
- Local storage
- Responsive design
- Team Git/GitHub workflow

---
# Team Sections
The project is divided into five main sections:

| Section | Responsibility |
|---|---|
| Home | Home screen and music discovery | (NOAH MAZTAH)
| Search | Search/filter songs | (OLUMIDE)
| Library | User's music/library | (ELIJAH)
| Playlist | Playlist display and management | (ENOCH)
| Now Playing / Player | Audio playback and full player | (ISAAC)

### Important
The **Player / Now Playing system is already implemented and tested.**

Do not rewrite the player logic unless the team agrees first.
Other sections should communicate with the player instead of creating separate audio systems.
---

# Project Structure

```text
NIOEE-MUSIC-PLAYER/
│
├── index.html
├── README.md
│
├── css/
│   ├── styles.css
│   ├── home.css
│   ├── search.css
│   ├── library.css
│   ├── playlist.css
│   ├── player.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   ├── home.js
│   ├── search.js
│   ├── library.js
│   ├── playlist.js
│   └── player.js
│
└── assets/
    ├── audio/
    └── images/





 Technology Rules
Use:

HTML5
CSS3
Vanilla JavaScript
ES6+ JavaScript
HTML5 Audio API
LocalStorage

Do NOT use:
React
Vue
Angular
jQuery
Bootstrap
Tailwind
Other UI frameworks

Do not put JavaScript inside HTML onclick attributes.
Track Data Structure
All sections should use the same track structure.

{
    id: 1,
    title: "Song Title",
    artist: "Artist Name",
    src: "assets/audio/song.mp3",
    cover: "assets/images/song.jpg"
}

The shared playlist is stored in:

js/playlist.js

Do not create different track object formats for different sections.

Player System

# The player is responsible for:
Play
Pause
Previous
Next
Shuffle
Repeat
Progress
Seeking
Duration
Volume
Mute
Track information
Album artwork
Audio playback
LocalStorage persistence
Mini-player
Now Playing screen

The player uses the HTML5 Audio API.
Important Player IDs

When working with the player UI, do not randomly rename these IDs.
Main Player
#album-cover
#song-title
#song-artist

#progress-bar
#current-time
#duration

#shuffle-btn
#previous-btn
#play-btn
#next-btn
#repeat-btn

#like-btn

#mute-btn
#volume-bar
Mini Player
#mini-song
#mini-album-cover
#mini-song-title
#mini-song-artist

#mini-shuffle-btn
#mini-previous-btn
#mini-play-btn
#mini-next-btn
#mini-repeat-btn

If you need to change one of these IDs, tell the player owner (ISAAC) first.

How OTHER SECTIONS CONNECT TO THE PLAYER
Home, Search, Library and Playlist should NOT create their own audio player.

Their job is to identify which song the user selected and pass that song to the player.

The general flow is:

Home
   ↓
User selects a song
   ↓
Player receives the selected track
   ↓
Now Playing updates
   ↓
Audio starts

The same flow applies to:

Search
Library
Playlist

All sections should eventually use the same player system.

Shared Track Example

Example:

const track = {
    id: 1,
    title: "Song Title",
    artist: "Artist Name",
    src: "assets/audio/song.mp3",
    cover: "assets/images/song.jpg"
};

When a user clicks this track, the section should send the selected track to the player instead of creating another Audio() object.

Important Rule

There should be only ONE main audio system.

Do NOT do this inside Home, Search, Library or Playlist:

const audio = new Audio();

The main player already handles audio playback.

This prevents:

Multiple songs playing at once
Different volume states
Conflicting play/pause buttons
Broken progress bars
Different player states
Audio and Images

Audio files go inside:

assets/audio/

Cover images go inside:

assets/images/

Use royalty-free or public-domain audio only.

Do not commit copyrighted music.

LocalStorage

NIOEE currently saves player information using LocalStorage.

The player remembers:

Last selected track
Playback position
Volume

This means refreshing the page can restore the previous player state.

Do not remove this functionality.

CSS Ownership

Each section should mainly work inside its own CSS file.

home.css       → Home
search.css     → Search
library.css    → Library
playlist.css   → Playlist
player.css     → Now Playing / Player

Shared/global styles:

styles.css
responsive.css

Avoid unnecessarily changing another person's CSS.

Git Workflow

The main shared branch is:

music

Do NOT work directly on music.

Each person should create their own feature branch.

Examples:

feature/home
feature/search
feature/library
feature/playlist
feature/player
Getting the Project

Clone the team's repository:

git clone -b music https://github.com/IsaacMsheliaSamuel/NIOEE-Music-Player.git

Enter the project:

cd NIOEE-Music-Player
Creating Your Branch

After cloning:

git checkout -b feature/your-section

Example:

git checkout -b feature/search
Before Starting Work

Always get the latest version:

git checkout music
git pull origin music

Then create/update your feature branch.

Do not start important work from an old version of the project.

Saving Your Work

Check your changes:

git status

Add your files:

git add .

Commit:

git commit -m "Build search section"

Push your branch:

git push -u origin feature/search

Replace feature/search with your own branch.

Pull Requests

When your section is ready:

Push your feature branch.
Open GitHub.
Create a Pull Request.
Set the base branch to:
music
Ask the team to review/test it.
Merge only after the team agrees.
Important Git Rules
DO =
Work on your own feature branch.
Pull the latest music branch before starting.
Commit regularly.
Write meaningful commit messages.
Test before creating a Pull Request.
Communicate before changing shared files.
DO NOT =
Push directly to music.
Force push.
Delete another person's branch.
Reset shared branches.
Overwrite another person's work.
Commit API keys or passwords.
Commit unnecessary files.
Shared Files

Be careful when changing:

index.html
js/app.js
js/playlist.js
css/styles.css
css/responsive.css
README.md

These files may affect multiple sections.

If you need to make a major change to one of them, tell the team first.

Current Features

NIOEE currently supports:

Play/Pause
Previous/Next
Playlist wrap-around
Dynamic song title
Dynamic artist
Dynamic cover artwork
Progress bar
Track seeking
Current time
Track duration
Volume control
Mute/unmute
Shuffle
Repeat
Mini-player
Now Playing screen
Section navigation
LocalStorage persistence
Responsive player layout
Remaining Team Work

The remaining sections need to be connected to the player:

Home
Search
Library
Playlist
      ↓
   NIOEE Player
      ↓
Now Playing

The objective is to make the entire application feel like one system rather than five separate pages.

Testing Checklist

Before pushing your work, test:

Does the section load?
Does navigation work?
Do buttons work?
Does selecting a song update the player?
Does the correct artwork appear?
Does the correct title appear?
Does the correct artist appear?
Does playback work?
Does the mini-player still work?
Does Now Playing open correctly?
Does the layout work on mobile?
Did your changes break another section?
API Note

The written project specification allows the use of 3–5 royalty-free audio files or public-domain sources.

The current implementation therefore uses local audio files.

If API integration is added later, it should not break the existing player functionality.

Never commit API keys or other secrets to GitHub.

Project Status

Current status:

 Project structure
 Player UI
 Audio playback
 Track information
 Progress and seeking
 Volume and mute
 Shuffle
 Repeat
 LocalStorage persistence
 Mini-player
 Now Playing screen
 Home integration
 Search integration
 Library integration
 Playlist integration
 Final responsive testing
 Error handling
 Final deployment
 Final presentation preparation
Team Members

Add team members here:

Home:
- NOAH 

Search:
- OLUMIDE

Library:
- ELIJAH

Playlist:
- ENOCH

Now Playing / Player:
- Isaac
Final Goal

NIOEE should behave as one connected music application.

The user should be able to:

Open Home
   ↓
Choose a song
   ↓
Play song
   ↓
Open Now Playing
   ↓
Control playback
   ↓
Search for another song
   ↓
Select it
   ↓
Player updates automatically

Keep the project simple, functional and reliable.

Build first. Test first. Then improve.