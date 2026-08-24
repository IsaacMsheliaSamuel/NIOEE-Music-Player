/*
==========================================================
    transfer.js
    Loaded only on transfer.html

    This page handles sending money from one account
    to another.

    shared.js already handles:
    - Auth guard
    - Header user info
    - Logout
==========================================================
*/


// ==========================================================
// STEP 1 — STATE
// ==========================================================
/*
    Create one state variable:

        let allAccounts = [];

    This holds the user's accounts loaded from the API.
    They are used to populate the "From Account" dropdown
    and the accounts summary sidebar.
*/

// YOUR CODE HERE


// ==========================================================
// STEP 2 — SELECT DOM ELEMENTS
// ==========================================================
/*
    Select elements specific to transfer.html:

        transferForm          — id="transferForm"
        transferFromAccount   — id="transferFromAccount" (the <select>)
        transferToAccount     — id="transferToAccount"
        transferAmount        — id="transferAmount"
        transferMessage       — id="transferMessage"
        accountsSummary       — id="accountsSummary" (sidebar balances)
*/

// YOUR CODE HERE


// ==========================================================
// STEP 3 — LOAD ACCOUNTS
// ==========================================================
/*
    Create an async function called loadAccounts().

    Steps:
    1. Call the API:
           const data = await apiRequest("/accounts");

    2. Store the raw accounts in allAccounts:
           allAccounts = data.accounts;

    3. Call populateFromDropdown(allAccounts) to fill the
       sender dropdown with options.

    4. Call displayAccountsSummary(allAccounts) to show
       balances in the sidebar.

    Wrap in try/catch. In the catch block, show an error
    message in the accountsSummary element.
*/

// YOUR CODE HERE


// ==========================================================
// STEP 4 — POPULATE THE FROM ACCOUNT DROPDOWN
// ==========================================================
/*
    Create a function called populateFromDropdown(accounts).

    Step 1 — Reset the dropdown:
        transferFromAccount.innerHTML =
            '<option value="">Select your account</option>';

    Step 2 — Use forEach() to create an <option> for each account:

        accounts.forEach((account) => {
            const option = document.createElement("option");
            option.value = account.accountNumber;
            option.textContent =
                account.accountName +
                " — " +
                account.accountNumber +
                " (₦" + account.balance.toLocaleString() + ")";
            transferFromAccount.appendChild(option);
        });

    Research: document.createElement(), appendChild()
*/

// YOUR CODE HERE


// ==========================================================
// STEP 5 — DISPLAY ACCOUNTS SUMMARY (SIDEBAR)
// ==========================================================
/*
    Create a function called displayAccountsSummary(accounts).

    If accounts.length === 0, show "No accounts found."

    Otherwise, use map() to build one summary item per account:
        - Account name on the left
        - Formatted balance on the right

    Each item should be a div with class "account-summary-item"
    (the CSS for this class is already in style.css).

    Use toLocaleString() to format the balance with commas.
    Prefix with "₦".

    Set accountsSummary.innerHTML to the result.
*/

// YOUR CODE HERE


// ==========================================================
// STEP 6 — TRANSFER (FORM SUBMISSION)
// ==========================================================
/*
    Create an async function called transfer(event).

    Step 1 — event.preventDefault()

    Step 2 — Read values:
        const fromAccount = transferFromAccount.value.trim();
        const toAccount   = transferToAccount.value.trim();
        const amount      = parseFloat(transferAmount.value);

    Step 3 — Validate (show errors with showMessage):
        - fromAccount must not be empty
          → "Please select an account to send from."
        - toAccount must be exactly 10 characters
          → "Enter a valid 10-digit receiver account number."
        - fromAccount must not equal toAccount
          → "Sender and receiver cannot be the same account."
        - amount must be a positive number
          → "Amount must be greater than 0."

    Step 4 — Optional client-side balance check:
        Use find() to get the sender from allAccounts.
        If amount > sender.balance, show:
            "Insufficient balance in sender account."

    Step 5 — Call the API inside try/catch:

        showMessage(transferMessage, "Processing transfer...", "");

        await apiRequest("/transfers", {
            method: "POST",
            body: JSON.stringify({ fromAccount, toAccount, amount }),
        });

    Step 6 — On success:
        - showMessage(transferMessage, "Transfer successful!", "success")
        - transferForm.reset()
        - await loadAccounts()   ← refresh balances
        - Repopulate dropdown (loadAccounts already does this)

    Step 7 — On error:
        showMessage(transferMessage, err.message, "error")

    Connect it:
        transferForm.addEventListener("submit", transfer);
*/

// YOUR CODE HERE


// ==========================================================
// STEP 7 — showMessage UTILITY
// ==========================================================
/*
    Create a function called showMessage(el, text, type).

    1. el.textContent = text
    2. el.className = "form-message"
    3. if (type) el.classList.add(type)
*/

// YOUR CODE HERE


// ==========================================================
// STEP 8 — INITIALIZE
// ==========================================================
/*
    When the page loads, call loadAccounts().

        document.addEventListener("DOMContentLoaded", () => {
            loadAccounts();
        });
*/

// YOUR CODE HERE
