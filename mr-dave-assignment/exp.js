const balance = document.getElementById("balance")
const money_in = document.getElementById("money-in")
const money_out = document.getElementById("money-out")
const list = document.getElementById("list")
const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount")


const localStorageTransactions = JSON.parse(
     localStorage.getItem("transactions"));


     let transactions = 
     localStorage.getItem("transactions") !== null 
     ? localStorageTransactions : [];
        

function calcTransaction(e){
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please add a expense and amount");
    } else {
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value,
        };

       transactions.push(transaction);
       addTransactionDOM(transaction)
       updateValues()
       updateLocalStorage();
       text.value = "";
       amount.value = "";
    }
}

function addTransactionToDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+"
    const item = document.createElement('li')


    item.classlist.add(transaction.amount < 0 ? "minus" : "plus");
    item.innerHTML = `
         ${transaction.text} <span>${sign}${Math.abs(
        transaction.amount
    )}</span> <button class="delete-btn" onClick="removeTransaction(${
        transaction.id
    })">x</button>
    `;
    list.appendChild(item);
}


function updateValues() {
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts
        .filter((item) => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    const expense = (
        amounts
            .filter((item) => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

     balance.innerText = `${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}



    function removeTransaction(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id);

    updateLocalStoarge();

    init();
}

// Update The Local Storage
function updateLocalStoarge() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}


   function init() {
    list.innerHTML = "";

    transactions.forEach(addTransactionToDOM);
    updateValues();
}

   init();

function genrateTransactionID( ){
    return Math.floor(Math.random() * 100000000);
}

form.addEventListener("submit", calcTransaction);

