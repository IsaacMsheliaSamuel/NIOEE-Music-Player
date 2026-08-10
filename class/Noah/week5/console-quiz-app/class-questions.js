const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askUser(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

const questions = [
    {
        question: "Which planet is known as the Red Planet?",
        options: [
            "A. Venus",
            "B. Mars",
            "C. Jupiter",
            "D. Saturn"
        ],
        answer: "B"
    },
    {
        question: "Which programming language is primarily used for styling web pages?",
        options: [
            "A. HTML",
            "B. Python",
            "C. CSS",
            "D. Java"
        ],
        answer: "C"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: [
            "A. Atlantic Ocean",
            "B. Indian Ocean",
            "C. Arctic Ocean",
            "D. Pacific Ocean"
        ],
        answer: "D"
    }
]

let score = 0;

async function askquestions() {
    for (let i = 0; i < questions.length; i++) {
        const currentQuestion = questions[i];

        console.log(currentQuestion.question);

        for (let j = 0; j < currentQuestion.options.length; j++) {
            console.log(currentQuestion.options[j]);
        }


        const userAnswer = await askUser("Your answer: ");
        if (userAnswer.toUpperCase() === currentQuestion.answer) {
            score++;
            console.log("✅ Correct!");
        } else {
            console.log(`❌ Wrong! The correct answer is ${currentQuestion.answer}.`);
        }

    }

    console.log(`\nYour final score is ${score}/${questions.length}`);

    if (score === 3) {
        console.log("🎉 E sharppp");
    } else if (score === 2) {
        console.log("👍 You try");
    } else if (score === 1) {
        console.log("Practice mf, practice");
    }

    rl.close();
}
askquestions();