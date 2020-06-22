// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "What does HTML stand for?",
        imgSrc : "img/a.jpg",
        correct : "ankitha"
    },
{
        question : "What does CSS stand for?",
        imgSrc : "img/b.jpg",
        correct : "kunal"
    },
{
        question : "What does JS stand for?",
        imgSrc : "img/c.jpg",
        correct : "shaunak"
    },
{
        question : "What does JS stand for?",
        imgSrc : "img/d.jpg",
        correct : "parth"
    },
{
        question : "What does JS stand for?",
        imgSrc : "img/e.jpg",
        correct : "ankit"
    },
{
        question : "What does JS stand for?",
        imgSrc : "img/u.jpg",
        correct : "aarnav"
    },
{
        question : "What does JS stand for?",
        imgSrc : "img/f.jpeg",
        correct : "shristi"
    },
{
        question : "What does JS stand for?",
        imgSrc : "img/g.jpg",
        correct : "ishika"
    },

{
        question : "What does JS stand for?",
        imgSrc : "img/h.jpg",
        correct : "rohit"
    },
{
        question : "What does JS stand for?",
        imgSrc : "img/i.jpg",
        correct : "rahul"
    },
{
        question : "What does JS stand for?",
        imgSrc : "img/j.jpg",
        correct : "chinmay"
    },
{
        question : "What does JS stand for?",
        imgSrc : "img/k.jpg",
        correct : "chainika"
    },
{
        question : "What does JS stand for?",
        imgSrc : "img/l.png",
        correct : "shanu"
    },
{
        question : "What does JS stand for?",
        imgSrc : "img/m.jpg",
        correct : "anish"
    },
{
        question : "What does JS stand for?",
        imgSrc : "img/n.jpg",
        correct : "shashank"
    },
{
        question : "What does JS stand for?",
        imgSrc : "img/o.jpg",
        correct : "muskan"
    },
{
        question : "What does JS stand for?",
        imgSrc : "img/p.jpg",
        correct : "amogh"
    },
{
        question : "What does JS stand for?",
        imgSrc : "img/q.jpg",
        correct : "tanay"
    },
{
        question : "What does JS stand for?",
        imgSrc : "img/r.jpg",
        correct : "yash"
    },
{
    question : "What does JS stand for?",
    imgSrc : "img/z.jpg",
    correct : "muskan"
},
{
        question : "What does JS stand for?",
        imgSrc : "img/s.jpg",
        correct : "atharva"
    },
{
        question : "What does JS stand for?",
        imgSrc : "img/t.jpg",
        correct : "madhulika"
    },
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
   }

// render progress
function renderProgress(){
  for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
    progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
   }
}

// counter render



// checkAnwer

function checkAnswer(answer){
    answer = document.getElementById("text").value
     if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
	if(runningQuestion < lastQuestion){
        runningQuestion++;
	renderQuestion();
    }else{
        // end the quiz and show the score
        scoreRender();
    }
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    scoreDiv.innerHTML += "<p>Happy Birthday Anmol!</p>";
}
