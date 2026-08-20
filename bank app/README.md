# Bank Management App

A simple browser-based bank management system built with **HTML, CSS, and vanilla JavaScript** (no frameworks, no libraries). It lets you create accounts, deposit, withdraw, transfer between accounts, search accounts, view a live transaction summary, and see a full transaction history.

## How to run it
1. Download the three files: `index.html`, `style.css`, `script.js` (keep them in the same folder).
2. Double-click `index.html`, or open it in any browser (Chrome, Safari, Edge, etc.).
3. That's it — no installation, no server needed.

To deploy it live, drag the folder into [Netlify Drop](https://app.netlify.com/drop), or push it to a GitHub repo and enable **GitHub Pages** in the repo settings.

---

## Research: JavaScript Concepts Used

### 1. Arrays
**Explanation:** An array is an ordered list of values, written with square brackets `[]`. It's how we store a collection of similar things — in this app, every account and every transaction.

**Examples:**
```js
let accounts = [];               // starts empty
accounts.push(newAccount);       // add an item to the end
accounts = accounts.filter(a => a.accountNumber !== 1001); // remove an item
```

**Where used:** `accounts` holds every `BankAccount` object created. `transactions` holds every deposit/withdrawal/transfer record. Each account also keeps its own `history` array.

---

### 2. Objects
**Explanation:** An object stores related data as `key: value` pairs, e.g. `{ name: 'Amina', balance: 5000 }`. Objects let us group information that belongs together instead of using separate loose variables.

**Examples:**
```js
const transaction = { type: 'deposit', amount: 500, date: new Date() };
console.log(transaction.amount); // 500
```

**Where used:** Every transaction pushed into the `transactions` array is an object with `type`, `amount`, `accountName`, etc. Every `BankAccount` instance is itself an object (built from the class).

---

### 3. Functions
**Explanation:** A function is a reusable block of code that performs a task, optionally taking inputs ("parameters") and giving back a result ("return value").

**Examples:**
```js
function formatMoney(amount) {
  return '₦' + amount.toLocaleString('en-NG');
}
function findAccount(accountNumber) {
  return accounts.find(acc => acc.accountNumber === accountNumber);
}
```

**Where used:** `renderAccounts()`, `renderSummary()`, `renderHistory()`, `showToast()`, `openModal()`, `deleteAccount()` — the entire app is broken into small functions, each with one job.

---

### 4. Loops (to process and display data)
**Explanation:** A loop repeats an action for every item in a collection, so we don't have to write repetitive code by hand. Modern JavaScript often loops using array methods (`map`, `filter`, `reduce`) instead of old-style `for` loops, because they're shorter and safer.

**Examples:**
```js
// Classic for loop
for (let i = 0; i < accounts.length; i++) {
  console.log(accounts[i].accountName);
}

// Same idea using .map()
accounts.map(acc => acc.accountName);
```

**Where used:** `renderAccounts()` loops over every account to build one HTML card per account. `renderHistory()` loops over every transaction to build one row per transaction.

---

### 5. Array Methods: `map()`, `filter()`, `find()`, `reduce()`
**Explanation:**
- `.map(fn)` — transforms every item and returns a **new array** of the results (e.g., turn accounts into HTML strings).
- `.filter(fn)` — keeps only the items that pass a test, returns a **new, shorter array**.
- `.find(fn)` — returns the **first single item** that matches a test (or `undefined` if none match).
- `.reduce(fn, start)` — "boils down" an entire array into one value (like a running total).

**Examples:**
```js
const names = accounts.map(acc => acc.accountName);
const rich = accounts.filter(acc => acc.balance > 10000);
const acc1001 = accounts.find(acc => acc.accountNumber === 1001);
const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
```

**Where used:**
- `.map()` — building account cards and transaction history rows.
- `.filter()` — search box filtering, deleting an account, splitting transactions into deposits vs withdrawals.
- `.find()` — `findAccount()`, used everywhere we need "the one account with this number."
- `.reduce()` — calculating Total Deposited, Total Withdrawn, and Total Balance in `renderSummary()`.

---

### 6. DOM Manipulation
**Explanation:** DOM = "Document Object Model" — it's how JavaScript sees and controls the HTML page as a tree of objects. DOM manipulation means using JavaScript to find HTML elements and change what they show.

**Examples:**
```js
const el = document.getElementById('accounts-list'); // find an element
el.innerHTML = '<p>Hello</p>';                        // change its content
el.classList.add('hidden');                            // add a CSS class
```

**Where used:** All the `document.getElementById(...)` calls at the top of `script.js`, and every `renderXxx()` function that sets `.innerHTML` to redraw the page after data changes.

---

### 7. Event Handling
**Explanation:** Events are things that happen in the browser — a click, typing, submitting a form. `addEventListener('eventName', function)` tells the browser "run this function whenever that event happens."

**Examples:**
```js
createForm.addEventListener('submit', function (event) {
  event.preventDefault(); // stop the page from reloading
  // ...create the account...
});

searchInput.addEventListener('input', function () {
  renderAccounts(searchInput.value);
});
```

**Where used:** Form submission (create account), search box typing, modal Confirm/Cancel buttons, and the Deposit/Withdraw/Transfer/Delete buttons (using inline `onclick` attributes that call named functions).

---

### 8. The `BankAccount` Class
**Explanation:** A class is a blueprint for creating multiple objects that share the same structure and behavior. Instead of writing out `{ accountName: ..., balance: ... }` and separate deposit/withdraw functions every time, we define the shape once and reuse it with `new BankAccount(...)`.

**Example:**
```js
class BankAccount {
  constructor(accountName, balance) {
    this.accountName = accountName;
    this.balance = balance;
  }
  deposit(amount) {
    this.balance += amount;
  }
}
const acc = new BankAccount('Amina', 5000);
acc.deposit(1000); // acc.balance is now 6000
```

**Where used:** Defined once near the top of `script.js`; every account the user creates is `new BankAccount(name, startingBalance)`.

---

### 9. Constructor and Methods
**Explanation:** The `constructor` is a special method that runs automatically the moment `new ClassName(...)` is called — it sets up the object's starting data. "Methods" are the other functions inside a class that give the object abilities (things it can *do*).

**Example:**
```js
class BankAccount {
  constructor(accountName, balance) {  // runs once, on creation
    this.accountName = accountName;
    this.balance = balance;
  }
  withdraw(amount) { /* a method — can be called any time after creation */ }
}
```

**Where used:** `constructor(accountName, balance)` sets `accountName`, `accountNumber`, `balance`, and `history` the moment an account is created. `deposit()`, `withdraw()`, and `transfer()` are the methods used afterward whenever the user interacts with that account.

---

### 10. Use of `this`
**Explanation:** Inside a class method, `this` refers to **the specific object the method was called on** — not the class in general. It's how one method definition can work correctly for many different accounts, each with their own balance.

**Example:**
```js
const acc1 = new BankAccount('Amina', 1000);
const acc2 = new BankAccount('Musa', 2000);
acc1.deposit(500); // "this" = acc1, so only acc1.balance changes
```

**Where used:** Throughout the `BankAccount` class — `this.balance`, `this.accountName`, `this.history` inside `deposit()`, `withdraw()`, and `transfer()` always refer to whichever account the method is currently being run on.

---

## Business Rules Implemented
| Rule | Where enforced |
|---|---|
| Account numbers must be unique | Auto-generated via an incrementing counter (`nextAccountNumber++`) — never reused |
| Deposit amount must be greater than 0 | Checked inside `BankAccount.deposit()` |
| Withdrawal amount must be greater than 0 | Checked inside `BankAccount.withdraw()` |
| Users cannot transfer more than their balance | Checked inside `BankAccount.transfer()` |
| Every successful transaction is recorded | Pushed into the `transactions` array right after each successful action |
| Success/error messages shown | Toast notifications (success) and inline modal error text (failures), via `try/catch` around each action |

## Transaction Summary (Challenge)
The **Transaction Summary** card recalculates live using `Array.reduce()` every time data changes:
- **Total Deposited** — sum of all deposit + incoming-transfer amounts
- **Total Withdrawn** — sum of all withdrawal + outgoing-transfer amounts
- **Number of Transactions** — `transactions.length`
- **Total Balance** — sum of every account's current balance

## File Structure
```
bank-app/
├── index.html   → page structure (forms, sections, modal)
├── style.css    → visual styling
├── script.js    → all logic: BankAccount class, data arrays, rendering, events
└── README.md    → this file
```

## Known Limitation
Data is stored only in memory (JavaScript variables), so it resets if you refresh the page. This was a deliberate simplification — no backend/database was required by the assignment. A natural next step would be saving `accounts` and `transactions` to `localStorage` so data survives a page reload.
