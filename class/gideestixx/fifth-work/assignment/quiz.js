const readline = require("readline");

const questions = [
  {
    question: "Who is the president of Nigeria?",
    options: ["A. Buhari", "B. Tinubu", "C. Kanu", "D. Peter Obi"],
    answer: "B",
  },
  {
    question: "Where is the capital city of Nigeria?",
    options: ["A. Abuja", "B. Kano", "C. Kaduna", "D. Lagos"],
    answer: "A",
  },
  {
    question: "When did Nigeria gain independence?",
    options: ["A. 1980", "B. 2020", "C. 1948", "D. 1960"],
    answer: "D",
  },
  {
    question: "Who is the GOAT of football?",
    options: ["A. Ronaldo", "B. Neymar", "C. Ronaldinho", "D. Lionel Messi"],
    answer: "D",
  },
  {
    question: "Who is the greatest female artist alive?",
    options: ["A. Tems", "B. Tiwa Savage", "C. Rihanna", "D. Beyonce"],
    answer: "A",
  },
];

let currentQuestion = 0;
let score = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion() {
  
  if (currentQuestion >= questions.length) {
    console.log(`\nQuiz finished! Your final score is ${score} out of ${questions.length}.`);
    rl.close();
    return;
  }

  const question = questions[currentQuestion];

  console.log(`\n--- Question ${currentQuestion + 1} of ${questions.length} ---`);
  console.log(question.question);
  question.options.forEach(option => console.log(option));

  rl.question("\nYour answer (A, B, C, or D): ", (answer) => {
    const userAnswer = answer.trim().toUpperCase();

    if (userAnswer === question.answer) {
      console.log("✓ Correct!");
      score++;
    } else {
      console.log(`X Incorrect. The correct answer is ${question.answer}.`);
    }

    currentQuestion++;
    askQuestion();
  });
}

askQuestion();

