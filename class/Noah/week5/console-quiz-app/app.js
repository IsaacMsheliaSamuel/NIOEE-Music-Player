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

const questions = [ //array//

    //object({})//
    //any object with a double quotation is a string//
    {
        question: "Who is the President of the United States?",
        options: [
            "A. Joe Biden",
            "B. Donald J. Trump",
            "C. Barack Obama",
            "D. George W. Bush"
        ],
        answer: "B"
    },

    {
        question: "When did 9/11 take place?",
        options: [
            "A. September 11, 2001",
            "B. December 7, 1941",
            "C. November 22, 1963",
            "D. July 4, 2001"
        ],
        answer: "A"
    },

    {
        question: "Who invented JavaScript?",
        options: [
            "A. Tim Berners-Lee",
            "B. Bill Gates",
            "C. Brendan Eich",
            "D. James Gosling"
        ],
        answer: "C"
    },

    {
        question: "When did Nigeria become a republic?",
        options: [
            "A. October 1, 1960",
            "B. October 1, 1963",
            "C. May 29, 1999",
            "D. January 15, 1966"
        ],
        answer: "B"
    },

    {
        question: "What sparked the First World War?",
        options: [
            "A. The bombing of Pearl Harbor",
            "B. The invasion of Poland",
            "C. The assassination of Archduke Franz Ferdinand",
            "D. The Russian Revolution"
        ],
        answer: "C"
    }
];

let score = 0;

async function runQuiz() {
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

    if (score === 5) {
        console.log("🎉 Excellent!");
    } else if (score === 4) {
        console.log("👏 Very Good!");
    } else if (score === 3) {
        console.log("👍 Good Job!");
    } else {
        console.log("📚 Keep Practicing!");
    }

    rl.close();
}

runQuiz();

