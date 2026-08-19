// DOM Elements - Select username and password input fields from the HTML
const username =  document.querySelector(".username");
const password =  document.querySelector(".password");

// Initialize users array to store user accounts
let users = [];
// Retrieve existing users from browser's local storage (if any have been saved before)
let usersFromLocalStorage = localStorage.getItem("users")

// Check if there are existing users in local storage
// If yes, parse the JSON string back into an array and load it into the users variable
if(usersFromLocalStorage !== null ){
    users = JSON.parse(localStorage.getItem("users"))
}

// Sign-up function - creates a new user account and saves it to local storage
const signUp = () => { 

    // Generate a unique account number for the new user
    const userAccountNumber = generateAccountNumber();

    // Validate that both username and password fields have been filled in
    // If either field is empty, show an alert and exit the function
    if (username.value === "" || password.value === ""){
        alert("Please fill in all fields")
        return
    }
    
    // Create a new user object with account details
    const user = {
        username: username.value,  // User's chosen username
        password: password.value,  // User's chosen password
        accountNumber: userAccountNumber,  // Auto-generated unique account number
        type: "savings",  // Default account type set to savings
        balance: 0  // Initial account balance set to zero
    }
    
    // Add the new user object to the users array
    users.push(user)

    // Save the updated users array to local storage as a JSON string for persistence
    localStorage.setItem('users', JSON.stringify(users))
}

// Utility function - retrieves and displays all users stored in local storage (for debugging/testing purposes)
const viewLoacalstorage = () => {
    let userArr = localStorage.getItem("users")
    // Parse and log the users array to the browser console
    console.log(JSON.parse(userArr))
}

// Account number generator - creates a unique 11-digit account number for each user
function generateAccountNumber(){
    // Initialize the account number array with starting digits [0, 2]
    let accNum = [0,2];
    
    // Generate 9 random digits and add them to the account number
    for (let i = 0; i < 9; i ++){
        // Generate a random number between 0 and 9
        let random = Math.floor(Math.random() * 10)
        
        // Safety check: if random number is greater than 9, set it to 1
        // (Note: due to Math.random() * 10, this condition is redundant as random will always be 0-9)
        if (random > 9 ){
            random = 1
        }
        // Add the random digit to the account number array
        accNum.push(random);
    }
    
    // Convert the array of digits into a single string and return it as the account number
    return accNum.join("");
}
