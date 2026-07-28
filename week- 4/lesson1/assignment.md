# Project: Console Quiz App

## Objective

Create a quiz application that asks the user 5 questions, checks their answers, and displays their final score.

---

## Requirements

### 1. Create an Array of Question Objects

Each question object should contain:

* `question`
* `options`
* `answer`

### Example

```javascript
{
    question: "What is the capital of Nigeria?",
    options: ["A. Lagos", "B. Abuja", "C. Kano", "D. Ibadan"],
    answer: "B"
}
```

---

### 2. Create a Score Variable

Create a variable called `score` and initialize it to `0`.

```javascript
let score = 0;
```

---

### 3. Loop Through All Questions

Use a `for` loop to iterate through all the questions in the array.

---

### 4. For Each Question

Perform the following actions:

* Display the question.
* Display all available options.
* Collect the user's answer:

  * Use `prompt()` if running in the browser.
  * Use `readline` if running in Node.js.

---

### 5. Check the User's Answer

Use an `if...else` statement:

* If the answer is correct:

  * Increase the `score` by `1`.
  * Display `"Correct!"`.

* Otherwise:

  * Display `"Wrong! The correct answer is B."`

#### Example

```javascript
if (userAnswer === question.answer) {
    score++;
    console.log("Correct!");
} else {
    console.log(`Wrong! The correct answer is ${question.answer}`);
}
```

---

### 6. Display the Final Score

After all questions have been answered:

* Display the user's final score.
* Display an appropriate message based on their performance.

#### Grading Criteria

| Score   | Message          |
| ------- | ---------------- |
| 5/5     | Excellent!       |
| 4/5     | Very Good!       |
| 3/5     | Good Job!        |
| Below 3 | Keep Practicing! |

---

## JavaScript Concepts You'll Practice

* Variables
* Arrays
* Objects
* `for` loops
* `if...else` statements
* Functions (optional)
* User input
* Console output

---

## Optional Challenges

Once you've completed the project, try implementing the following features:

1. Shuffle the questions before asking them.
2. Allow the user to play again.
3. Display the percentage score.
4. Keep track of the number of correct and incorrect answers.
5. Display the total time taken to complete the quiz.

---

## Submission Instructions

* Create a file named `assignment.md`.
* Add this project description to the file.
* Complete the implementation using JavaScript.
* Ensure your program runs entirely in the console (No DOM manipulation).
* Push your solution to GitHub and submit the repository link.

Good luck, and happy coding!
