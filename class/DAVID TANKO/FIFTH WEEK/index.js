const readline = require('readline');
const questions = [
    {
         question: "Which is the smallest continent in the world?",
        options: [" A .Asia","B .Australia", "C .Arctic", "D .Africa"],
        answers: "B"
    },
    {
        question: "Which is the smallest continent in the world?",
        options: [" A .Asia","B .Australia", "C .Arctic", "D .Africa"],
        answers: "B"
    },
    {
         question: "Which is the smallest continent in the world?",
        options: [" A .Asia","B .Australia", "C .Arctic", "D .Africa"],
        answers: "B"
    }
];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let score = 0;
let currentQuestionIndex = 0;

function askQuestion(index) {
    if (index < questions.length) {
        const question = questions[index];
        console.log(`${index + 1}. ${question.question}`);
        question.options.forEach((option, i) => {
            console.log(`   ${i + 1}. ${option}`);
        });
    }
}
askQuestion(0);