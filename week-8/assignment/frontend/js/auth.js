/*
==========================================================
    auth.js
    Handles login and signup on index.html.
==========================================================

    This file is ONLY loaded on index.html.

    When the user successfully logs in:
    - Save the JWT token to localStorage
    - Save the user object to localStorage
    - Redirect to dashboard.html

    If the user is already logged in (token exists),
    redirect them straight to dashboard.html so they
    don't see the login screen again.
==========================================================
*/


// ==========================================================
// STEP 1 — REDIRECT IF ALREADY LOGGED IN
// ==========================================================
/*
    At the very top of this file (runs immediately):

    1. Read the token from localStorage
    2. If it exists, the user is already logged in:
           window.location.href = "dashboard.html";

    This means a logged-in user who visits index.html
    goes straight to the dashboard.
*/

// YOUR CODE HERE


// ==========================================================
// STEP 2 — SELECT DOM ELEMENTS
// ==========================================================
/*
    Select all the elements you need from index.html.

    Login form elements:
        loginForm, loginEmail, loginPassword, loginMessage

    Signup form elements:
        signupForm, signupName, signupEmail,
        signupPassword, confirmPassword, signupMessage

    Toggle buttons:
        showSignupBtn, showLoginBtn

    Auth view containers:
        loginView, signupView
*/

// YOUR CODE HERE


// ==========================================================
// STEP 3 — API HELPER (local copy)
// ==========================================================
/*
    shared.js is NOT loaded on index.html because the user
    is not yet authenticated. You need a local version of
    apiRequest for the login and signup requests.

    These two requests don't need an Authorization header,
    but they do need Content-Type: application/json.

    Write the same apiRequest function here.
    It should work exactly like the one in shared.js.
*/

// YOUR CODE HERE


// ==========================================================
// STEP 4 — SHOW / HIDE LOGIN AND SIGNUP VIEWS
// ==========================================================
/*
    Create two functions:

    ── showLoginView() ───────────────────────────────────
    - Remove "hidden" from loginView
    - Add "hidden" to signupView
    - Clear loginMessage text
    - Reset loginForm

    ── showSignupView() ──────────────────────────────────
    - Remove "hidden" from signupView
    - Add "hidden" to loginView
    - Clear signupMessage text
    - Reset signupForm

    Connect them:
        showSignupBtn.addEventListener("click", showSignupView);
        showLoginBtn.addEventListener("click", showLoginView);
*/

// YOUR CODE HERE


// ==========================================================
// STEP 5 — SIGNUP
// ==========================================================
/*
    Create an async function called signup(event).

    Step 1 — event.preventDefault()

    Step 2 — Read values:
        name, email, password, confirmPassword

    Step 3 — Validate:
        - name is not empty
        - email is not empty
        - password is at least 6 characters
        - password matches confirmPassword

        Use a helper called showMessage(el, text, type)
        to display errors. Define it below.

    Step 4 — Call the API:

        POST /auth/signup
        Body: { name, email, password }

        API response on success:
        {
            message: "Account created successfully",
            user: { id, name, email }
        }

    Step 5 — On success:
        showMessage(signupMessage, "Account created! Redirecting to login...", "success")
        setTimeout(() => showLoginView(), 1500)

    Step 6 — On error (catch block):
        showMessage(signupMessage, err.message, "error")

    Connect it:
        signupForm.addEventListener("submit", signup);
*/

// YOUR CODE HERE


// ==========================================================
// STEP 6 — LOGIN
// ==========================================================
/*
    Create an async function called login(event).

    Step 1 — event.preventDefault()

    Step 2 — Read values:
        email, password

    Step 3 — Validate:
        - both fields must not be empty

    Step 4 — Call the API:

        POST /auth/login
        Body: { email, password }

        API response on success:
        {
            token: "JWT_TOKEN",
            user: { id, name, email }
        }

    Step 5 — On success:
        - localStorage.setItem("token", data.token)
        - localStorage.setItem("currentUser", JSON.stringify(data.user))
        - window.location.href = "dashboard.html"

    Step 6 — On error (catch block):
        showMessage(loginMessage, err.message, "error")

    Connect it:
        loginForm.addEventListener("submit", login);
*/

// YOUR CODE HERE


// ==========================================================
// STEP 7 — showMessage UTILITY
// ==========================================================
/*
    Create a function called showMessage(el, text, type).

    It takes:
        el   — the DOM element to display the message in
        text — the message string
        type — "error", "success", or "" (plain)

    Steps:
    1. el.textContent = text
    2. el.className = "form-message"
    3. if (type) el.classList.add(type)
*/

// YOUR CODE HERE
