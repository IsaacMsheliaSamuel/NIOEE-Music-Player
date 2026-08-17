# JavaScript Fundamentals

This module introduces the core concepts of JavaScript and provides a foundation for learning web development.

---

## Topic 1: What is JavaScript?

### Definition

JavaScript is a programming language used to build interactive and dynamic web applications.

### Where Does JavaScript Run?

* In web browsers (Chrome, Firefox, Safari, Edge, etc.)
* On servers using environments like Node.js

### Why Learn JavaScript?

* It powers the interactive behavior of websites.
* It is one of the most popular programming languages in the world.
* It can be used for frontend, backend, mobile, and desktop development.

---

## Topic 2: Variables

### Definition

Variables are containers used to store data values.

### Examples

```javascript id="up4zbw"
let name = "Alice";
const age = 25;
```

### Types of Variables

#### `let`

* Can be reassigned (mutable).

```javascript id="xvugw5"
let city = "Abuja";

city = "Lagos";

console.log(city); // Lagos
```

#### `const`

* Cannot be reassigned (constant).

```javascript id="uq8gql"
const country = "Nigeria";

// country = "Ghana"; // Error
```

### Summary

| Keyword | Can Change? |
| ------- | ----------- |
| `let`   | Yes         |
| `const` | No          |

---

## Topic 3: Data Types

JavaScript supports several data types. The three most common are:

### 1. String

Represents text.

```javascript id="2f9vfp"
let name = "Henry";
```

### 2. Number

Represents numeric values.

```javascript id="vqnl00"
let score = 90;
```

### 3. Boolean

Represents `true` or `false`.

```javascript id="k58r0e"
let isStudent = true;
```

### Examples

```javascript id="zcsmv8"
let firstName = "John";
let age = 30;
let hasGraduated = false;
```

---

## Topic 4: Operators

Operators are symbols used to perform operations on values.

### Arithmetic Operators

| Operator | Meaning        |
| -------- | -------------- |
| `+`      | Addition       |
| `-`      | Subtraction    |
| `*`      | Multiplication |
| `/`      | Division       |

### Example

```javascript id="2twwet"
let total = 10 + 5;

console.log(total); // 15
```

### Comparison Operators

| Operator | Meaning                   |
| -------- | ------------------------- |
| `>`      | Greater Than              |
| `<`      | Less Than                 |
| `==`     | Equal To (Loose Equality) |
| `===`    | Strict Equality           |

### Examples

```javascript id="6hajlc"
console.log(10 > 5);   // true
console.log(10 < 5);   // false
console.log(10 == "10"); // true
console.log(10 === "10"); // false
```

---

## Topic 5: Conditionals

Conditionals allow JavaScript to make decisions.

### `if` Statement

```javascript id="mgjlwm"
let score = 75;

if (score > 60) {
    console.log("Passed");
}
```

### `if...else`

```javascript id="5lmkve"
let age = 16;

if (age >= 18) {
    console.log("You can vote.");
} else {
    console.log("You cannot vote.");
}
```

### `if...else if...else`

```javascript id="hxd57c"
let grade = 85;

if (grade >= 90) {
    console.log("A");
} else if (grade >= 80) {
    console.log("B");
} else if (grade >= 70) {
    console.log("C");
} else {
    console.log("F");
}
```

---

## Topic 6: Loops

Loops allow us to repeat code multiple times.

### `for` Loop

Use a `for` loop when you know how many times you want the code to execute.

```javascript id="oikx87"
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

### Output

```text
0
1
2
3
4
```

---

### `while` Loop

Use a `while` loop when you want the code to continue running until a condition becomes false.

```javascript id="kjmxqj"
let count = 0;

while (count < 3) {
    console.log(count);
    count++;
}
```

### Output

```text
0
1
2
```

---

## Recap

By the end of this module, students should understand:

* What JavaScript is.
* How to declare variables using `let` and `const`.
* Common JavaScript data types.
* How to use operators.
* How to make decisions using conditionals.
* How to repeat actions using loops.

---

## Homework

1. Create three variables:

   * Your name
   * Your age
   * Whether you are a student

2. Write a program that:

   * Adds two numbers together.
   * Checks if a number is greater than 50.
   * Prints numbers from 1 to 10 using a `for` loop.
   * Uses a `while` loop to count down from 5 to 1.

---

## Next Module

* Arrays
* Objects
* Functions
* DOM Manipulation
* Events
* ES6 Features
