const readline = require("readline")

const questions =[ 

    // const question = questions [current questions];

    {
        question: "Who is the best football player in the world?",
        options: ["A. Cristiano Ronaldo", "B. Lionel Messi", "C. Neymar", "D. Kylian Mbappe"],
        answer: "A"
    },
    {
       question: "who is the best world tennis player",
       options: ["A. Novak Djokovic", "B. Rafeal Nadal", "C. Roger Federer", "D. Andy Murray"],
       answer: "A"
    },
    {
       question: "who is the president of the United States?",
       options: ["A. Joe Biden", "B. Donald Trump", "C. Barack Obama", "D. George Bush"],
       answer: "B"
    }
    {
       question: "Who won 2026 FIFA world cup?",
       options: ["A. Argentina", "B.France", "C. Brazil", "D. Spain"],
       answer: "B"  
    }
    

    ];

    let correctQuestion = 0 ;
    let scores = 0;


    const rl = readline.createInterface({
      input: process, stdin,
      output: process, stdout,
    })
{
    function askQuestion(){
       const question = questions [currentQuestions];

       console.log("\n --- Question $(current Question + 1)of $(questions.length)---");
       console.log(question.question);
       questions.options.forEach(option => console.log(option));

       rl.question{'\nYour answer (A,B,C,or D):' ,(answer) => { 
          const userAnswer = answer.touppercase).
          

       }



   }


   



      











    
]