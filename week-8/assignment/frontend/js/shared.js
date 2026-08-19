/*
==========================================================
    shared.js
    Runs on every protected page (dashboard, accounts,
    transactions, transfer).

    Responsibilities:
    - Redirect to index.html if the user is not logged in
    - Fill in the header user info (name, email, initials)
    - Handle the Logout button

    Your job: implement the three sections below.
==========================================================
*/


const BASE_URL = "http://localhost:5000/api";


// ==========================================================
// STEP 1 — API HELPER
// ==========================================================
/*
    This is the same apiRequest function used everywhere.
    Because shared.js is loaded on every page, you only
    need to write it once here.

    async function apiRequest(url, options = {})

    It should:
    1. Read the token from localStorage
    2. Build a headers object
    3. Add "Content-Type": "application/json" if options.body exists
    4. Add "Authorization": "Bearer " + token if token exists
    5. Call fetch(BASE_URL + url, { ...options, headers })
    6. Parse the JSON response
    7. If !response.ok → throw new Error(data.error or fallback message)
    8. Return data
*/

// YOUR CODE HERE


// ==========================================================
// STEP 2 — AUTH GUARD
// ==========================================================
/*
    Every protected page must check that the user is
    logged in before showing any content.

    If the user is NOT logged in, send them to index.html.

    Steps:
    1. Read the token from localStorage:
           const token = localStorage.getItem("token");
           const savedUser = localStorage.getItem("currentUser");

    2. If either is missing:
           window.location.href = "index.html";

    3. If both exist, parse the user:
           const currentUser = JSON.parse(savedUser);

    4. Fill in the header elements using currentUser:
           - #userAvatar      → user's initials (e.g. "JD")
           - #currentUserName → user's full name
           - #currentUserEmail → user's email
           - #welcomeUserName  → user's first name (if it exists on this page)

       To generate initials:
           Split the name by spaces, take the first character
           of each word, uppercase it, and join them.

       These elements exist on every page so always update them.
       #welcomeUserName only exists on dashboard.html —
       check it exists before setting it:
           const welcomeEl = document.getElementById("welcomeUserName");
           if (welcomeEl) welcomeEl.textContent = firstNameHere;

    Run this auth check immediately (not inside a function)
    so it runs as soon as the script loads.
*/

// YOUR CODE HERE


// ==========================================================
// STEP 3 — LOGOUT
// ==========================================================
/*
    Find the logout button and add a click listener.

    When clicked:
    1. Remove "token" from localStorage
    2. Remove "currentUser" from localStorage
    3. Redirect: window.location.href = "index.html"
*/

// YOUR CODE HERE
