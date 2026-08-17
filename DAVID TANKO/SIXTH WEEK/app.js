const heading = document.getElementById('title');
heading.textContent = 'Hello, World!';
heading.innerHTML = '<span>Hello World!</span>';
heading.style.color = 'blue';
console.log(heading.textContent);
const button = document.querySelector('button');
button.addEventListener('click', function() {
    console.log('Button clicked');


});
