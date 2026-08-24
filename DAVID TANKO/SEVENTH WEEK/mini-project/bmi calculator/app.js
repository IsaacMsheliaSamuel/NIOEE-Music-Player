let screen = document.querySelector('.screen');
let height = document.querySelector('.height');
let weight = document.querySelector('.weight');
let btn = document.querySelector('button');

function square(height){
    let square = height * height ;
    console.log(square)
    return square;
   
}

function division(square,weight){
    let div = weight / square;
    return div;
}

function calculate(){
    let realNumber1 = Number(height.value)
    let realNumber2 = Number(weight.value)
    let result = division(square(realNumber1), realNumber2)
    screen.innerHTML = result ;
if(realNumber1 <= 0 || realNumber2 <= 0){
    screen.innerHTML = 'INVALID INPUT'
    screen.style.color = "red"
}
 else if(result<= 18.5 ){
    screen.innerHTML= result + "(under weight)"
 }else if (result===18.6 && result<=24.9){
    screen.innerHTML= result +"(normal weight)"

 }else if (result===25 && result<=29.9){
    screen.innerHTML= result +"(over weight)"

}else if(result>30){
    screen.innerHTML= result +"(obese)"

}
}
//https://github.com/BlockheaderWeb3-Community/frontend-cohort3/pull/12