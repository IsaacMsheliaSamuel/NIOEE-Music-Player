# 🎵 NIOEE

NIOEE is a browser-based music player built with HTML, CSS and Vanilla JavaScript.

The project is inspired by modern music streaming applications while using an original NIOEE interface.

---

## 👥 Team Sections

The project is divided into five main sections:

| Section | Main File |
|---|---|
| Home | `home.js` / `home.css` |
| Search | `search.js` / `search.css` |
| Library | `library.js` / `library.css` |
| Playlist | `playlist.js` / `playlist.css` |
| Now Playing / Song | `player.js` / `player.css` |

### Ownership

Each team member should primarily work inside their assigned files.

Avoid modifying another member's feature files unless the team has agreed on it.

---

## 📁 Project Structure

```text
NIOEE/
├── index.html
├── README.md
├── .gitignore
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






    IMPORTANT READ
    ⚠️ Shared Files

The following files affect the whole application:

index.html
css/styles.css
css/responsive.css
js/app.js
README.md

Before making major changes to these files, communicate with the team.

Avoid overwriting another team member's work.


🌿 Git & Team Workflow

1. Clone the project
Clone the music branch:

git clone -b music https://github.com/BlockheaderWeb3-Community/frontend-cohort3.git

Then enter the project:
cd frontend-cohort3


2. Create your own branch

Do NOT work directly on music.

Use a feature branch:

git checkout -b feature/your-section

Examples:

git checkout -b feature/home
git checkout -b feature/search
git checkout -b feature/library
git checkout -b feature/playlist
git checkout -b feature/player


3. Work only on your assigned section
Examples:

Home:
js/home.js
css/home.css

Search:
js/search.js
css/search.css

Library:
js/library.js
css/library.css

Playlist:
js/playlist.js
css/playlist.css

Now Playing:
js/player.js
css/player.css
4. Save and check your work

Before committing:

git status

Test the application in the browser and check the browser console for errors.


5. Commit your work

Add your changes:

git add .

Create a meaningful commit:

git commit -m "Add player playback controls"

Use clear commit messages describing what you actually changed.


6. Push your branch

The first time:

git push -u origin feature/your-section

After that:

git push


7. Pull Request

After your feature is ready:

Go to GitHub.
Open the repository.
Create a Pull Request.
Select your feature branch as the source.
Select music as the target branch.
Describe what you changed.
Ask the team to review it before merging.
🔄 Before Starting New Work

Always make sure your local music branch is up to date.

git checkout music
git pull origin music

Then return to your feature branch:

git checkout feature/your-section

If your feature branch needs the latest changes from music, coordinate with the team before merging them into your branch.

🚫 Important Git Rules
DO NOT:
Push directly to music.
Force push.
Delete someone else's branch.
Run git reset --hard unless you understand exactly what it does.
Commit passwords, API keys or secret credentials.
Overwrite another person's work.
Change another person's feature without communication.
DO:
Work on your own branch.
Make meaningful commits.
Test before pushing.
Communicate before changing shared files.
Create Pull Requests for completed features.
🧑‍💻 Coding Rules



NIOEE uses:
HTML5
CSS3
Vanilla JavaScript
ES6+

JavaScript must remain in .js files.

Do not use inline JavaScript such as:

onclick=""

Use JavaScript event listeners instead.

🎧 Music & API

Music information will be supplied through the selected music API.

The application should use API data for information such as:

Track title
Artist
Album
Artwork
Search results
Other available music metadata

The exact API integration will be implemented and documented by the team.

Do not commit API keys or secrets to GitHub.

🎯 Required Core Features
Play / Pause
Previous / Next
Track wrap-around
Track information
Cover artwork
Progress bar
Seeking
Current time
Total duration
Volume control
Mute / Unmute
Playlist rendering
Active track
⭐ Stretch Features

Targeted stretch features:

Shuffle
Repeat
Search / Filter
Local Storage
Responsive Design

Additional stretch features may be added if time allows.

🧪 Testing

Before submitting a feature, test:

Desktop layout
Mobile layout
Buttons
Search
Track selection
Audio playback
Progress
Volume
API data
Error states

Check the browser console for JavaScript errors.

📱 Responsive Design

The application should work at:

320px
768px
1200px

Responsive changes should be coordinated because responsive.css is a shared file.

📦 Assets

Place approved project assets inside:

assets/audio/
assets/images/

Only use audio that is permitted by the assignment/API terms.

🚀 Project Status

🚧 NIOEE is currently under development.

Team Members
NOAH
ISAAC
OLUMIDE
ELIJAH
ENOCH

Deployment

Final deployed URL:
To be added
Demo

Final screen recording:
To be added