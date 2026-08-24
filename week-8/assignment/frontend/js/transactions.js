/*
==========================================================
    transactions.js
    Loaded only on transactions.html

    This page shows the full transaction history for all
    of the logged-in user's accounts.

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
    Create one state variable to hold all transactions:

        let allTransactions = [];
*/

// YOUR CODE HERE


// ==========================================================
// STEP 2 — SELECT DOM ELEMENTS
// ==========================================================
/*
    Select the elements specific to transactions.html:

        transactionsContainer — id="transactionsContainer"
        viewAllBtn            — id="viewAllBtn"
*/

// YOUR CODE HERE


// ==========================================================
// STEP 3 — GET TRANSACTIONS FROM THE API
// ==========================================================
/*
    Create an async function called getTransactions().

    Inside try/catch:
        const data = await apiRequest("/transactions");

    The API returns:
        {
            transactions: [
                {
                    id,
                    accountId,
                    type,         // "deposit", "withdrawal", "transfer"
                    amount,
                    status,
                    description,
                    createdAt
                },
                ...
            ]
        }

    1. Store the result: allTransactions = data.transactions;
    2. Call displayTransactions(allTransactions)

    In the catch block, set transactionsContainer.innerHTML
    to an error message in red.
*/

// YOUR CODE HERE


// ==========================================================
// STEP 4 — DISPLAY TRANSACTIONS
// ==========================================================
/*
    Research: map(), join(), new Date(), toLocaleDateString(),
              String.startsWith()

    Create a function called displayTransactions(transactions).

    Step 1 — Empty state:
        If transactions.length === 0, set innerHTML to the
        empty-transactions div and return.

    Step 2 — Decide how many to show.
        Track with a property on the function:
            displayTransactions.showAll = false;

        Default shows 10. "View All" shows everything.

            const list = transactions.slice(
                0,
                displayTransactions.showAll ? transactions.length : 10
            );

    Step 3 — Use map() to build each transaction card.

        For each transaction (tx):

        a) Is it a credit or debit?

               Credit (green, "+"):
               - tx.type === "deposit"
               - tx.type === "transfer" AND tx.description starts with "Transfer from"

               Debit (red, "−"):
               - tx.type === "withdrawal"
               - tx.type === "transfer" AND tx.description starts with "Transfer to"

        b) Format the date:
               new Date(tx.createdAt).toLocaleDateString("en-NG", {
                   day: "2-digit",
                   month: "short",
                   year: "numeric",
               });

        c) Build a div showing:
               - Coloured circle with + or −
               - Transaction type (capitalize the first letter)
               - Description (tx.description or "—")
               - Amount with ₦ symbol (green or red)
               - Date

    Step 4 — Render:
        transactionsContainer.innerHTML =
            "<div style='padding: 0 20px;'>" + items.join("") + "</div>";

    Connect "View All":
        viewAllBtn.addEventListener("click", async () => {
            displayTransactions.showAll = true;
            await getTransactions();
        });

    Note: set displayTransactions.showAll = false as a
    default right after you define the function:
        displayTransactions.showAll = false;
*/

// YOUR CODE HERE


// ==========================================================
// STEP 5 — INITIALIZE
// ==========================================================
/*
    Call getTransactions() when the page loads:

        document.addEventListener("DOMContentLoaded", () => {
            getTransactions();
        });
*/

// YOUR CODE HERE
