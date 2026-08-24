let screen = document.getElementById('screen');
let input1 = document.querySelector('.num1');
let input2 = document.querySelector('.num2');


function add(num1, num2){
    let sum = num1 + num2
    return sum;
}
function calculate(){
    let realNumber1 = Number(num1.value)
    let realNumber2 = Number(num2.value)
    let sum = add(realNumber1, realNumber2)
    screen.innerHTML = sum;

}