/*
==========================================================
    dashboard.js
    Loaded only on dashboard.html

    This page shows:
    - Statistics (total accounts, deposits, withdrawals,
      total transactions)
    - A preview of the 5 most recent transactions

    shared.js already handles:
    - Auth guard (redirect if not logged in)
    - Header user info
    - Logout button

    Your job: load data from the API and display it.
==========================================================
*/


// ==========================================================
// STEP 1 — SELECT DOM ELEMENTS
// ==========================================================
/*
    Select the elements specific to dashboard.html:

        totalAccounts          — stat card strong element
        totalDeposits          — stat card strong element
        totalWithdrawals       — stat card strong element
        totalTransactions      — stat card strong element
        recentTransactionsContainer — the div for recent transactions
*/

// YOUR CODE HERE


// ==========================================================
// STEP 2 — LOAD DASHBOARD DATA
// ==========================================================
/*
    Create an async function called loadDashboard().

    It should fetch two things at the same time:

        const [accountsData, transactionsData] = await Promise.all([
            apiRequest("/accounts"),
            apiRequest("/transactions"),
        ]);

    Promise.all() runs both requests simultaneously.
    It waits for BOTH to finish and returns both results.

    Then:
    - Store accounts: const accounts = accountsData.accounts;
    - Store transactions: const transactions = transactionsData.transactions;

    Call:
        updateStatistics(accounts, transactions);
        displayRecentTransactions(transactions);
*/

// YOUR CODE HERE


// ==========================================================
// STEP 3 — UPDATE STATISTICS
// ==========================================================
/*
    Create a function called updateStatistics(accounts, transactions).

    It receives the raw arrays directly as arguments.

    ── Total Accounts ────────────────────────────────────
        totalAccountsEl.textContent = accounts.length;

    ── Total Deposits ────────────────────────────────────
    Use filter() to get only deposit transactions.
    Use reduce() to add up all their amounts.
    Display formatted with ₦ symbol.

        const deposits = transactions.filter((tx) => tx.type === "deposit");
        const total = deposits.reduce((sum, tx) => sum + tx.amount, 0);
        totalDepositsEl.textContent = "₦" + total.toLocaleString("en-NG", { minimumFractionDigits: 2 });

    ── Total Withdrawals ─────────────────────────────────
    Same pattern as deposits but filter for "withdrawal".

    ── Total Transactions ────────────────────────────────
        totalTransactionsEl.textContent = transactions.length;
*/

// YOUR CODE HERE


// ==========================================================
// STEP 4 — DISPLAY RECENT TRANSACTIONS
// ==========================================================
/*
    Create a function called displayRecentTransactions(transactions).

    Show only the 5 most recent:
        const recent = transactions.slice(0, 5);

    If recent.length === 0, show the empty state:
        recentTransactionsContainer.innerHTML = `
            <div class="empty-transactions">
                <span>📋</span>
                <h4>No transactions yet</h4>
                <p>Transactions will appear here.</p>
            </div>`;
        return;

    Otherwise, use map() to build an HTML string for each
    transaction and set it as the container's innerHTML.

    For each transaction show:
    - A coloured circle (green + for credit, red − for debit)
    - Transaction type (capitalize it)
    - Description
    - Amount
    - Date (formatted with toLocaleDateString)

    Decide credit vs debit:
        deposit                  → credit (green)
        transfer description starts with "Transfer from" → credit (green)
        withdrawal / transfer to → debit (red)
*/

// YOUR CODE HERE


// ==========================================================
// STEP 5 — INITIALIZE
// ==========================================================
/*
    Call loadDashboard() when the page loads.

    Wrap it in a DOMContentLoaded listener:

        document.addEventListener("DOMContentLoaded", () => {
            loadDashboard();
        });

    Put any error handling around loadDashboard() in a
    try/catch so the page does not crash silently.
*/

// YOUR CODE HERE
