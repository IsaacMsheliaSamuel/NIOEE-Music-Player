# Console Quiz App

## Objective

To build a console-based quiz application using JavaScript. The application asks the user five multiple-choice questions, checks each answer, and displays the final score with a performance message.

---

## Project Requirements

### 1. Questions

Create an array of question objects. Each object should contain:

- `question`
- `options`
- `answer`

Example:

```javascript
{
question: "Who is the President of the United States?",
     options: [
    "A. Joe Biden",
    "B. Donald J. Trump",
    "C. Barack Obama",
    "D. George W. Bush"
  ],
 answer: "B"
}
```

---

### 2. Score

Create a variable named `score` and initialize it to `0`.

```javascript
let score = 0;
```

---

### 3. Display Questions

Use a `for` loop to go through each question in the array.

For each question:

- Display the question.
- Display all available options.
- Ask the user to enter an answer.

---

### 4. Check Answers

Use an `if...else` statement to compare the user's answer with the correct answer.

- If the answer is correct:
  - Increase the score by `1`.
  - Display **"Correct!"**

- If the answer is incorrect:
  - Display the correct answer.

Example:

```javascript
if (userAnswer === currentQuestion.answer) {
  score++;
  console.log("Correct!");
} else {
  console.log(`Wrong! The correct answer is ${currentQuestion.answer}.`);
}
```

---

### 5. Final Result

After all questions have been answered:

- Display the user's final score.
- Display a message based on the score.

| Score | Message |
|-------|---------|
| 5/5 | Excellent! |
| 4/5 | Very Good! |
| 3/5 | Good Job! |
| Below 3 | Keep Practicing! |

---

## JavaScript Concepts Used

- Variables
- Arrays
- Objects
- `for` loops
- `if...else`
- Functions
- Async/Await
- User input using `readline`
- Console output

---

## Notes

- The application runs entirely in the terminal.
- No HTML or DOM manipulation is used.
- The project was built using Node.js.

