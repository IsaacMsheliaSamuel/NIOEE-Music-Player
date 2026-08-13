
let screen = document.getElementById("screen");
let num1 = document.querySelector(".num1");
let num2 = document.querySelector(".num2");
let btn = document.querySelector("button");

function add(num1, num2) {
    return num1 + num2;
}

function multiply(num1, num2){
    return  num1 * num2;
} 

function calculate(symbol) {
    // Convert string to number
    let realNumber1 = Number(num1.value)
    let realNumber2 = Number(num2.value)
    let result;

    if (symbol == "+"){
        result = add(realNumber1, realNumber2)
    }else if (symbol == "*"){
        result = multiply(realNumber1, realNumber2)
    }

    screen.innerHTML = result;
}

