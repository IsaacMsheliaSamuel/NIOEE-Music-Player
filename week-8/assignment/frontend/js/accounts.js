/*
==========================================================
    accounts.js
    Loaded only on accounts.html

    This page handles:
    - Fetching and displaying all accounts
    - Creating a new account (modal form)
    - Deposit and Withdraw per account row
    - Live search by account name or number

    shared.js already handles:
    - Auth guard
    - Header user info
    - Logout

    The BankAccount class should be defined here.
    It is only needed on this page.
==========================================================
*/


// ==========================================================
// STEP 1 — BankAccount CLASS
// ==========================================================
/*
    Research: class, constructor, this, methods

    Create a class called BankAccount.

    Constructor receives a data object from the API:
        { id, accountNumber, accountName, balance, status }

    Save each property with this.

    Add two methods:

    ── getFormattedBalance() ─────────────────────────────
    Returns the balance as a currency string.
    Example: 50000 → "₦50,000.00"

    Use toLocaleString():
        return "₦" + this.balance.toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    ── getStatusClass() ──────────────────────────────────
    Returns a string based on status:
        "active"   → "success"
        "inactive" → "warning"
        "frozen"   → "danger"
        default    → "muted"

    IMPORTANT: This class NEVER changes balance.
    The backend is always the source of truth.
*/

// YOUR CODE HERE


// ==========================================================
// STEP 2 — STATE
// ==========================================================
/*
    Create one state variable:

        let allAccounts = [];

    This holds the array of BankAccount instances for the
    current user. It is updated every time getAccounts() runs.
*/

// YOUR CODE HERE


// ==========================================================
// STEP 3 — SELECT DOM ELEMENTS
// ==========================================================
/*
    Select all elements specific to accounts.html:

        accountsTableBody   — <tbody> of the accounts table
        openAccountBtn      — "+ Create Account" button
        modal               — the modal wrapper
        modalOverlay        — the dark backdrop
        closeModal          — × button
        cancelBtn           — Cancel button
        accountForm         — the form
        accountNameInput    — id="accountName"
        initialDepositInput — id="initialDeposit"
        accountMessage      — id="accountMessage"
        searchInput         — id="searchInput"
        searchBtn           — id="searchBtn"
*/

// YOUR CODE HERE


// ==========================================================
// STEP 4 — HIDE THE ACCOUNT NUMBER FIELD
// ==========================================================
/*
    The form has an account number input in the HTML.
    The backend generates account numbers automatically,
    so students should not fill it in.

    Hide it immediately:

        const accountNumberGroup = document.getElementById("accountNumberGroup");
        if (accountNumberGroup) accountNumberGroup.style.display = "none";
*/

// YOUR CODE HERE


// ==========================================================
// STEP 5 — GET ACCOUNTS FROM THE API
// ==========================================================
/*
    Create an async function called getAccounts().

    Steps:
    1. Show loading state: showTableLoading()
    2. Inside try/catch:
           const data = await apiRequest("/accounts");
    3. Convert each account to a BankAccount instance using map():
           allAccounts = data.accounts.map((acc) => new BankAccount(acc));
    4. Call displayAccounts(allAccounts)
    5. In catch: call showTableError(err.message)
*/

// YOUR CODE HERE


// ==========================================================
// STEP 6 — DISPLAY ACCOUNTS IN THE TABLE
// ==========================================================
/*
    Create a function called displayAccounts(accounts).

    Step 1 — Empty state:
        If accounts.length === 0, set accountsTableBody.innerHTML
        to a tr.empty-state row with a "No accounts yet" message.
        Return early.

    Step 2 — Build rows:
        Create an empty string: let rows = "";

        Use forEach() to loop and build each row with:
        1. accountNumber
        2. accountName
        3. getFormattedBalance()
        4. A coloured status badge (green for active, red otherwise)
        5. Two buttons: Deposit and Withdraw
           Give them onclick attributes:
               onclick="openDeposit(${account.id})"
               onclick="openWithdraw(${account.id})"

    Step 3:
        accountsTableBody.innerHTML = rows;

    ── showTableLoading() ────────────────────────────────
    Set accountsTableBody.innerHTML to a single row
    with "Loading accounts..." centred text.

    ── showTableError(msg) ───────────────────────────────
    Set accountsTableBody.innerHTML to a single row
    showing the error message in red.
*/

// YOUR CODE HERE


// ==========================================================
// STEP 7 — ACCOUNT MODAL
// ==========================================================
/*
    Create two functions:

    ── openAccountModal() ────────────────────────────────
    - modal.classList.remove("hidden")
    - Clear accountMessage
    - Reset accountForm

    ── closeAccountModal() ───────────────────────────────
    - modal.classList.add("hidden")

    Connect them:
        openAccountBtn.addEventListener("click", openAccountModal);
        closeModal.addEventListener("click", closeAccountModal);
        cancelBtn.addEventListener("click", closeAccountModal);
        modalOverlay.addEventListener("click", closeAccountModal);
*/

// YOUR CODE HERE


// ==========================================================
// STEP 8 — CREATE ACCOUNT
// ==========================================================
/*
    Create an async function called createAccount(event).

    Step 1 — event.preventDefault()

    Step 2 — Read values:
        const name    = accountNameInput.value.trim();
        const deposit = parseFloat(initialDepositInput.value);

    Step 3 — Validate:
        - name must not be empty
        - deposit must be a valid number and >= 0

    Step 4 — Call the API inside try/catch:

        await apiRequest("/accounts", {
            method: "POST",
            body: JSON.stringify({
                accountName: name,
                initialDeposit: deposit,
            }),
        });

    Step 5 — On success:
        - closeAccountModal()
        - accountForm.reset()
        - await getAccounts()   ← refresh the table

    Step 6 — On error:
        showMessage(accountMessage, err.message, "error")

    Connect it:
        accountForm.addEventListener("submit", createAccount);
*/

// YOUR CODE HERE


// ==========================================================
// STEP 9 — DEPOSIT
// ==========================================================
/*
    Two functions needed:

    ── openDeposit(accountId) ────────────────────────────
    Called via onclick from the table row button.
    accountId is the numeric ID of the account.

    1. Use find() to locate the account:
           const account = allAccounts.find((a) => a.id === accountId);
    2. Build a label: accountName (accountNumber)
    3. Use prompt() to ask for the amount
    4. If user cancelled (null), return
    5. Call deposit(accountId, input)

    ── deposit(accountId, rawAmount) ─────────────────────
    Async function.

    1. const amount = parseFloat(rawAmount);
    2. Validate amount > 0
    3. Call the API:
           POST /accounts/:id/deposit
           Body: { amount }
    4. On success: alert success message, then await getAccounts()
    5. On error: alert error message
*/

// YOUR CODE HERE


// ==========================================================
// STEP 10 — WITHDRAW
// ==========================================================
/*
    Same two-function pattern as deposit.

    ── openWithdraw(accountId) ───────────────────────────
    Same as openDeposit but include the current balance
    in the prompt text so the user knows what they have.

    ── withdraw(accountId, rawAmount) ────────────────────
    Same as deposit but calls:
        POST /accounts/:id/withdraw
*/

// YOUR CODE HERE


// ==========================================================
// STEP 11 — SEARCH
// ==========================================================
/*
    Create a function called searchAccounts().

    1. Read the query: searchInput.value.trim().toLowerCase()
    2. If empty: displayAccounts(allAccounts) and return
    3. Use filter() to search by:
           - accountName (case-insensitive includes)
           - accountNumber (includes)
    4. displayAccounts(results)

    Connect it:
        searchBtn.addEventListener("click", searchAccounts);
        searchInput.addEventListener("input", searchAccounts);
*/

// YOUR CODE HERE


// ==========================================================
// STEP 12 — showMessage UTILITY
// ==========================================================
/*
    Create a function called showMessage(el, text, type).
    Same as in auth.js:

    1. el.textContent = text
    2. el.className = "form-message"
    3. if (type) el.classList.add(type)
*/

// YOUR CODE HERE


// ==========================================================
// STEP 13 — INITIALIZE
// ==========================================================
/*
    When the page loads, call getAccounts().

        document.addEventListener("DOMContentLoaded", () => {
            getAccounts();
        });
*/

// YOUR CODE HERE
