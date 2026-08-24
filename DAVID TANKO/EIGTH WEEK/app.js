const username = document.querySelector(".username");
const password = document.querySelector(".password");
//const users = [];
const signup = () =>{
 const userAccountNumber = generateAccountNumber();
 const user = {
        username: username.value,
        password: password.value,
        accountNumber: userAccountNumber,
        type:"savings"
}
        console.log(user, userAccountNumber)
        users.push(user)
        let newUsers = JSON.parse(localStorage.getItem('users')) || [];
        newUsers.push(user);
        localStorage.setItem('users', JSON.stringify(newUsers));
}
      const viewLocalstorage = {
      users: JSON.parse(localStorage.getItem('users')) || []
}
    

function generateAccountNumber(){
    let accNum = [0,2];
    for(let i=0;i < 10;i++){
        let random = Math.floor(Math.random()* 10)
        if(random>9){
            random =1
        }
        console.log(random)

        accNum.push(random);
    }
    return accNum.join('');
}