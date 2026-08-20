/* =====================================================================
   BANK MANAGEMENT APP — script.js
   Every section below is explained in plain language for beginners.
   Read the comments (lines starting with // or wrapped in /* *​/) —
   they don't run as code, they're just notes for humans.
   ===================================================================== */


/* ---------------------------------------------------------------------
   STEP 1: THE "DATABASE" (in-memory arrays)
   Since we don't have a real server or database, we use plain JavaScript
   ARRAYS to hold our data while the page is open. An array is just an
   ordered list, written with square brackets: []
--------------------------------------------------------------------- */

// This array will hold every BankAccount object (an "object" is a
// grouping of related data — see the class below).
let accounts = [];

// This array holds a record of every transaction (deposit, withdrawal,
// transfer) that has ever happened, newest first.
let transactions = [];

// A simple counter we use to generate unique account numbers.
// "let" means this variable's value CAN change later (unlike "const").
let nextAccountNumber = 1001;


/* ---------------------------------------------------------------------
   STEP 2: THE BankAccount CLASS
   A "class" is a blueprint for creating objects that all share the same
   shape (the same properties and abilities/methods). Think of it like a
   cookie cutter: the class is the cutter, and each "new BankAccount(...)"
   we make is one cookie.
--------------------------------------------------------------------- */
class BankAccount {
  // The constructor runs automatically every time we create
  // ("instantiate") a new BankAccount. It sets up the account's starting
  // data.
  constructor(accountName, balance) {
    // "this" refers to THE SPECIFIC account being created right now.
    // So "this.accountName = accountName" means: "store the name that
    // was passed in, on THIS particular account."
    this.accountName = accountName;

    // We generate the account number using our counter, then increase
    // the counter by 1 so the NEXT account gets a different number.
    this.accountNumber = nextAccountNumber++;
    // The "++" after a variable means "use the current value, THEN add 1".

    this.balance = balance;

    // Every account keeps its OWN mini transaction list too, so we can
    // show "this account's history" if we ever want to.
    this.history = [];
  }

  // ---- METHOD: deposit ----
  // A "method" is just a function that belongs to the class, so every
  // account built from this class can call account.deposit(amount).
  deposit(amount) {
    // BUSINESS RULE: "Deposit amount must be greater than 0."
    if (amount <= 0) {
      // "throw new Error(...)" stops this method immediately and sends
      // an error message back to whoever called deposit(). We catch
      // that error later and show it to the user nicely.
      throw new Error('Deposit amount must be greater than 0.');
    }
    this.balance += amount; // Same as: this.balance = this.balance + amount;
    this.history.push({ type: 'deposit', amount, date: new Date() });
    // .push() adds a new item to the end of an array — here, we're
    // adding a record of this deposit to the account's own history.
    return this.balance;
  }

  // ---- METHOD: withdraw ----
  withdraw(amount) {
    if (amount <= 0) {
      throw new Error('Withdrawal amount must be greater than 0.');
    }
    // BUSINESS RULE: can't withdraw more than the current balance.
    if (amount > this.balance) {
      throw new Error('Insufficient funds. Withdrawal exceeds balance.');
    }
    this.balance -= amount; // Same as: this.balance = this.balance - amount;
    this.history.push({ type: 'withdraw', amount, date: new Date() });
    return this.balance;
  }

  // ---- METHOD: transfer ----
  // "targetAccount" is another BankAccount object we are sending money to.
  transfer(amount, targetAccount) {
    if (amount <= 0) {
      throw new Error('Transfer amount must be greater than 0.');
    }
    if (amount > this.balance) {
      throw new Error('Cannot transfer more than your balance.');
    }
    // A transfer is really just "withdraw from me, deposit into them":
    this.balance -= amount;
    targetAccount.balance += amount;

    this.history.push({ type: 'transfer-out', amount, date: new Date(), to: targetAccount.accountName });
    targetAccount.history.push({ type: 'transfer-in', amount, date: new Date(), from: this.accountName });
    return this.balance;
  }
}


/* ---------------------------------------------------------------------
   STEP 3: GRABBING REFERENCES TO HTML ELEMENTS
   document.getElementById('x') finds the HTML element whose id="x" and
   gives us a JavaScript "handle" to it, so we can read/change it.
   We do this once at the top so we don't repeat ourselves everywhere.
--------------------------------------------------------------------- */
const createForm       = document.getElementById('create-account-form');
const nameInput         = document.getElementById('account-name');
const balanceInput      = document.getElementById('initial-balance');
const accountsListEl    = document.getElementById('accounts-list');
const searchInput       = document.getElementById('search-input');
const historyEl         = document.getElementById('transaction-history');

const totalDepositedEl   = document.getElementById('total-deposited');
const totalWithdrawnEl   = document.getElementById('total-withdrawn');
const totalTxCountEl     = document.getElementById('total-transactions');
const totalBalanceEl     = document.getElementById('total-balance');

// Modal (pop-up) elements
const modalOverlay        = document.getElementById('modal-overlay');
const modalTitle          = document.getElementById('modal-title');
const modalLabel          = document.getElementById('modal-label');
const modalAmountInput    = document.getElementById('modal-amount');
const modalTransferGroup  = document.getElementById('modal-transfer-group');
const modalTransferSelect = document.getElementById('modal-transfer-target');
const modalError          = document.getElementById('modal-error');
const modalCancelBtn      = document.getElementById('modal-cancel');
const modalConfirmBtn     = document.getElementById('modal-confirm');

const toastEl = document.getElementById('toast');

// This variable will temporarily remember WHICH account and WHICH action
// (deposit/withdraw/transfer) the modal is currently being used for.
let activeAccountNumber = null;
let activeAction = null; // 'deposit' | 'withdraw' | 'transfer'


/* ---------------------------------------------------------------------
   STEP 4: HELPER FUNCTIONS
--------------------------------------------------------------------- */

// Formats a plain number like 5000 into "₦5,000" for nicer display.
function formatMoney(amount) {
  return '₦' + amount.toLocaleString('en-NG');
  // .toLocaleString adds thousand-separators (commas) automatically.
}

// Shows the little pop-up notification at the bottom of the screen.
function showToast(message, isError = false) {
  toastEl.textContent = message;              // Set the text inside it.
  toastEl.classList.remove('hidden');          // Make it visible.
  toastEl.classList.toggle('error', isError);  // Turn it red if isError is true.

  // setTimeout runs code AFTER a delay (here, 2500 milliseconds = 2.5s).
  // We use it to automatically hide the toast again after a short time.
  setTimeout(() => {
    toastEl.classList.add('hidden');
  }, 2500);
}

// Finds one account by its account number.
// Array.find() loops through the array and returns the FIRST item where
// the condition inside the () is true — here, matching account numbers.
function findAccount(accountNumber) {
  return accounts.find(acc => acc.accountNumber === accountNumber);
}


/* ---------------------------------------------------------------------
   STEP 5: RENDERING (drawing data onto the page)
   "Render" functions don't create new data — they just read the CURRENT
   state of our arrays (accounts, transactions) and rebuild the HTML to
   match. We call these any time the data changes.
--------------------------------------------------------------------- */

// Draws the list of account cards.
function renderAccounts(filterText = '') {
  // .trim() removes extra spaces, .toLowerCase() makes the search
  // case-insensitive ("Amina" will match "amina").
  const search = filterText.trim().toLowerCase();

  // Array.filter() builds a NEW array containing only the items that
  // pass the test inside the (). Here: does the name or account number
  // contain what the user typed in the search box?
  const visibleAccounts = accounts.filter(acc => {
    return (
      acc.accountName.toLowerCase().includes(search) ||
      String(acc.accountNumber).includes(search)
      // String(...) converts the number to text so .includes() works on it.
    );
  });

  if (accounts.length === 0) {
    accountsListEl.innerHTML = '<p class="empty-message">No accounts yet. Create one above to get started.</p>';
    return; // "return" stops the function here — nothing left to do.
  }

  if (visibleAccounts.length === 0) {
    accountsListEl.innerHTML = '<p class="empty-message">No accounts match your search.</p>';
    return;
  }

  // Array.map() builds a NEW array by transforming each item — here we
  // turn each account OBJECT into a chunk of HTML TEXT.
  const cardsHtml = visibleAccounts.map(acc => `
    <div class="account-card">
      <div class="account-card-top">
        <div>
          <div class="account-name">${acc.accountName}</div>
          <div class="account-number">Acct #${acc.accountNumber}</div>
        </div>
        <div class="account-balance">${formatMoney(acc.balance)}</div>
      </div>
      <div>
        <button class="btn btn-primary btn-small" onclick="openModal(${acc.accountNumber}, 'deposit')">Deposit</button>
        <button class="btn btn-secondary btn-small" onclick="openModal(${acc.accountNumber}, 'withdraw')">Withdraw</button>
        <button class="btn btn-secondary btn-small" onclick="openModal(${acc.accountNumber}, 'transfer')">Transfer</button>
        <button class="btn btn-danger btn-small" onclick="deleteAccount(${acc.accountNumber})">Delete</button>
      </div>
    </div>
  `).join('');
  // .join('') glues the array of HTML strings together into ONE long string.

  // Setting .innerHTML replaces everything inside the element with our
  // new HTML string, effectively "redrawing" the accounts list.
  accountsListEl.innerHTML = cardsHtml;
}

// Draws the 4 summary numbers (Total Deposited, Withdrawn, etc.)
function renderSummary() {
  // Array.reduce() "boils down" an array into a single value by running
  // a function on every item and carrying a running total forward.
  // Here: add up the .amount of every deposit-type transaction.
  const totalDeposited = transactions
    .filter(tx => tx.type === 'deposit' || tx.type === 'transfer-in')
    .reduce((sum, tx) => sum + tx.amount, 0);
    // "0" is the STARTING value of sum before we add anything.

  const totalWithdrawn = transactions
    .filter(tx => tx.type === 'withdraw' || tx.type === 'transfer-out')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  totalDepositedEl.textContent = formatMoney(totalDeposited);
  totalWithdrawnEl.textContent = formatMoney(totalWithdrawn);
  totalTxCountEl.textContent = transactions.length;
  totalBalanceEl.textContent = formatMoney(totalBalance);
}

// Draws the transaction history list.
function renderHistory() {
  if (transactions.length === 0) {
    historyEl.innerHTML = '<p class="empty-message">No transactions yet.</p>';
    return;
  }

  // .slice() copies the array so .reverse() doesn't mess up the
  // original order; we want NEWEST transactions shown at the top.
  const rows = transactions.slice().reverse().map(tx => {
    let label = '';
    let cssClass = '';

    // A "switch" statement is a tidy way of writing many "if/else if"
    // checks against the same variable (tx.type here).
    switch (tx.type) {
      case 'deposit':
        label = `Deposit of ${formatMoney(tx.amount)} to ${tx.accountName} (#${tx.accountNumber})`;
        cssClass = 'tx-deposit';
        break;
      case 'withdraw':
        label = `Withdrawal of ${formatMoney(tx.amount)} from ${tx.accountName} (#${tx.accountNumber})`;
        cssClass = 'tx-withdraw';
        break;
      case 'transfer-out':
        label = `${tx.accountName} sent ${formatMoney(tx.amount)} to ${tx.toName}`;
        cssClass = 'tx-transfer';
        break;
    }

    // .toLocaleTimeString() turns a Date object into a readable clock time.
    const time = tx.date.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });

    return `<div class="transaction-item"><span class="${cssClass}">${label}</span><span>${time}</span></div>`;
  }).join('');

  historyEl.innerHTML = rows;
}

// A single function that calls all three render functions above, so we
// only need one line "renderAll()" whenever data changes.
function renderAll() {
  renderAccounts(searchInput.value);
  renderSummary();
  renderHistory();
}


/* ---------------------------------------------------------------------
   STEP 6: EVENT HANDLING — CREATE ACCOUNT
   "Event handling" means: run some code WHEN something happens (a click,
   a form submit, typing in a box). We attach ("listen for") events using
   addEventListener(eventName, functionToRun).
--------------------------------------------------------------------- */
createForm.addEventListener('submit', function (event) {
  // Forms reload the page by default when submitted. We don't want that
  // (it would erase all our JavaScript data!), so we cancel that default:
  event.preventDefault();

  const name = nameInput.value.trim();
  // Number(...) converts the text typed by the user into an actual number.
  const startingBalance = Number(balanceInput.value);

  if (!name) {
    showToast('Please enter an account holder name.', true);
    return;
  }
  if (isNaN(startingBalance) || startingBalance < 0) {
    // isNaN = "is Not a Number" — catches invalid input.
    showToast('Please enter a valid starting balance.', true);
    return;
  }

  // Create a brand-new BankAccount object using our class from Step 2.
  const account = new BankAccount(name, startingBalance);
  accounts.push(account); // Add it to our list of all accounts.

  // If they deposited a starting balance greater than 0, log it as a
  // transaction too, so it shows up in the Summary and History.
  if (startingBalance > 0) {
    transactions.push({
      type: 'deposit',
      amount: startingBalance,
      accountName: account.accountName,
      accountNumber: account.accountNumber,
      date: new Date()
    });
  }

  showToast(`Account created for ${name} (#${account.accountNumber})`);

  // Clear the form fields and redraw the page with the new data.
  createForm.reset();
  renderAll();
});


/* ---------------------------------------------------------------------
   STEP 7: SEARCH
   Every time the user types in the search box, redraw just the accounts
   list, filtered to match what they typed.
--------------------------------------------------------------------- */
searchInput.addEventListener('input', function () {
  renderAccounts(searchInput.value);
});


/* ---------------------------------------------------------------------
   STEP 8: DELETE ACCOUNT
   This function is called directly from the onclick="" attribute we put
   on the Delete button inside renderAccounts() above.
--------------------------------------------------------------------- */
function deleteAccount(accountNumber) {
  const account = findAccount(accountNumber);
  if (!account) return; // Safety check — do nothing if it's not found.

  // confirm() shows a built-in browser pop-up with OK/Cancel buttons and
  // returns true or false depending on what the user clicked.
  const sure = confirm(`Delete account #${accountNumber} (${account.accountName})? This cannot be undone.`);
  if (!sure) return;

  // Array.filter() here rebuilds the accounts array WITHOUT the deleted
  // one (keeping every account whose number does NOT match).
  accounts = accounts.filter(acc => acc.accountNumber !== accountNumber);

  showToast(`Account #${accountNumber} deleted.`);
  renderAll();
}


/* ---------------------------------------------------------------------
   STEP 9: THE MODAL (deposit / withdraw / transfer pop-up)
--------------------------------------------------------------------- */

// Called from the Deposit/Withdraw/Transfer buttons via onclick="".
function openModal(accountNumber, action) {
  activeAccountNumber = accountNumber;
  activeAction = action;

  const account = findAccount(accountNumber);
  modalError.textContent = ''; // Clear any old error message.
  modalAmountInput.value = '';

  // Set the modal's title/label text based on which action was chosen.
  // An object like this is a clean alternative to writing 3 separate
  // if/else blocks.
  const titles = {
    deposit: 'Deposit Money',
    withdraw: 'Withdraw Money',
    transfer: 'Transfer Money'
  };
  modalTitle.textContent = `${titles[action]} — ${account.accountName}`;
  modalLabel.textContent = `Amount to ${action} (₦)`;

  // Only show the "Transfer To" dropdown when the action is 'transfer'.
  if (action === 'transfer') {
    modalTransferGroup.classList.remove('hidden');

    // Build the dropdown options from every OTHER account (you can't
    // transfer to yourself).
    const otherAccounts = accounts.filter(acc => acc.accountNumber !== accountNumber);

    if (otherAccounts.length === 0) {
      modalTransferSelect.innerHTML = '<option value="">No other accounts available</option>';
    } else {
      modalTransferSelect.innerHTML = otherAccounts
        .map(acc => `<option value="${acc.accountNumber}">${acc.accountName} (#${acc.accountNumber})</option>`)
        .join('');
    }
  } else {
    modalTransferGroup.classList.add('hidden');
  }

  // Reveal the modal by removing the 'hidden' class from its overlay.
  modalOverlay.classList.remove('hidden');
}

// Closes the modal and resets which account/action was "active".
function closeModal() {
  modalOverlay.classList.add('hidden');
  activeAccountNumber = null;
  activeAction = null;
}

modalCancelBtn.addEventListener('click', closeModal);

// Clicking the dark backdrop (outside the white box) also closes the modal.
modalOverlay.addEventListener('click', function (event) {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

// The Confirm button inside the modal — this is where deposit/withdraw/
// transfer actually happen, using the BankAccount class methods from Step 2.
modalConfirmBtn.addEventListener('click', function () {
  const account = findAccount(activeAccountNumber);
  const amount = Number(modalAmountInput.value);

  if (!amount || amount <= 0) {
    modalError.textContent = 'Please enter an amount greater than 0.';
    return;
  }

  // "try/catch" lets us ATTEMPT something that might fail (like
  // account.withdraw() throwing an error for insufficient funds) and
  // gracefully handle the failure instead of the whole app breaking.
  try {
    if (activeAction === 'deposit') {
      account.deposit(amount);
      transactions.push({
        type: 'deposit', amount,
        accountName: account.accountName,
        accountNumber: account.accountNumber,
        date: new Date()
      });
      showToast(`Deposited ${formatMoney(amount)} to ${account.accountName}.`);

    } else if (activeAction === 'withdraw') {
      account.withdraw(amount);
      transactions.push({
        type: 'withdraw', amount,
        accountName: account.accountName,
        accountNumber: account.accountNumber,
        date: new Date()
      });
      showToast(`Withdrew ${formatMoney(amount)} from ${account.accountName}.`);

    } else if (activeAction === 'transfer') {
      const targetNumber = Number(modalTransferSelect.value);
      const targetAccount = findAccount(targetNumber);

      if (!targetAccount) {
        modalError.textContent = 'Please choose a valid account to transfer to.';
        return;
      }

      account.transfer(amount, targetAccount);
      transactions.push({
        type: 'transfer-out', amount,
        accountName: account.accountName,
        accountNumber: account.accountNumber,
        toName: targetAccount.accountName,
        date: new Date()
      });
      showToast(`Transferred ${formatMoney(amount)} to ${targetAccount.accountName}.`);
    }

    closeModal();
    renderAll();

  } catch (error) {
    // If deposit()/withdraw()/transfer() threw an Error (see Step 2),
    // we land here instead of crashing. error.message is the text we
    // passed into "throw new Error('...')".
    modalError.textContent = error.message;
  }
});


/* ---------------------------------------------------------------------
   STEP 10: INITIAL RENDER
   Draw the page once when the script first loads, so the "No accounts
   yet" messages, ₦0 totals etc. are shown correctly from the start.
--------------------------------------------------------------------- */
renderAll();
