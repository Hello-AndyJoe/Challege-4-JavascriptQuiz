//The global variable that are found throughout the script; gotten through HTML DOM methods
var seconds = 100;

var countDown = document.getElementById("countdown");
var startBox = document.getElementById("start-box");
var tallyBox = document.getElementById("tally-box");
var scoreBox = document.getElementById("score-box");
var questionBox = document.getElementById("question-box");
var resultBox= document.getElementById("result-box");

var countTimer;

//The creation of the timer and it being displayed; largely adapted from the Timers Intervals Activity from Week 4 of the bootcamp
function setTime() {
    startBox.style.display = "none"
    resultBox.style.display = "none";
    questionBox.style.display = "block";
    tallyBox.style.display = "block";
    loadQuiz();

    countTimer = setInterval(function() {
    seconds --;
    countDown.textContent = seconds;

    if (seconds < 10 && seconds > 0) {//makes sure the timer stays in the double digits for aesthetic reasons
        countDown.textContent = "0"+ seconds;
    } else if(seconds <= 0) {
        endQuiz();
        countDown.textContent = "00";
        console.log("Time is over.");
    }
    }, 1000);
}

//The function to end the quiz, stop the timer and alter the visiblity of the various div elements.
function endQuiz() {
    resultBox.style.display = "block";
    questionBox.style.display = "none";
    document.getElementById("question-option").innerHTML = "";
    document.getElementById("score-results").innerHTML = scoreTotal;
    clearInterval(countTimer);
}

//Subtracts time from the countdow, the function is called when an answer is missed.
function minusTime() {
    seconds = seconds - 19;
}

//The array that houses the objects that make up the quiz questions, their answer options and the value that will be check to make sure the answer is correct.
var quiz = {
    quizQuestions: [{
        question: "Which is not a JavaScript data type?",
        options:[
        {choice: "A. Ringo", answer: true},
        {choice: "B. String", answer: false},
        {choice: "C. Number", answer: false},
        {choice: "D. Boolean", answer: false},
        ]},
        {question: "What HTML element tag is used to embed a JavaScipt scipt into an HTML file?",
        options:[
        {choice: "A. a", answer: false},
        {choice: "B. link", answer: false},
        {choice: "C. svg", answer: false},
        {choice: "D. script", answer: true},
        ]},
        {question: "What is used to get code to repeat",
        options:[
        {choice: "A. CA", answer: false},
        {choice: "B. CB", answer: false},
        {choice: "C. CC", answer: true},
        {choice: "D. CD", answer: false},
        ]},
        {question: "The answer is A, again.",
        options:[
        {choice: "A. AA", answer: true},
        {choice: "B. AB", answer: false},
        {choice: "C. AC", answer: false},
        {choice: "D. AD", answer: false},
        ]},
        {question: "The answer is B.",
        options:[
        {choice: "A. BA", answer: false},
        {choice: "B. BB", answer: true},
        {choice: "C. BC", answer: false},
        {choice: "D. BD", answer: false},
        ]},
    ]
}

//These variables and function loads the first question and then runs a loop to load the various options to answer with
var choices = document.getElementById("question-option");
var x = 0;

function loadQuiz() {
    document.getElementById("question").innerHTML = quiz.quizQuestions[x].question;

    for (y = 0; y < quiz.quizQuestions[x].options.length; y++) {
        var quizChoice = quiz.quizQuestions[x].options[y].choice;
        var questionAnswer = quiz.quizQuestions[x].options[y].answer;

        var choiceButton = document.createElement("button");
        choiceButton.innerHTML = quizChoice;
        choices.appendChild(choiceButton);
        choiceButton.setAttribute("value", questionAnswer);
    }
    choices.addEventListener("click", nextQuestion);
}

//These variables and functions are used to find the value of the questions answer options and determine if it's correct or not; makes a tally box and adds up the score. 
choices.addEventListener("click", answerVerify);

var questionValue;
var scoreTally = [];
var scoreTotal = 0;

function answerVerify(event) {
    questionValue = event.target.value;
    console.log(questionValue);
    if (questionValue === "true") {
        scoreTally.push("o");
        console.log("Correct")
        scoreTotal++;
    } else {
        scoreTally.push("x");
        console.log("Incorrect");
        minusTime();
    }

    console.log(scoreTally);
    console.log(scoreTotal);
    scoreBox.innerHTML = scoreTally.join(" ");
}

//Moves the quiz to the next questions and its respective answers; if else statement ends the quiz if there are no more questions.
function nextQuestion() {
    if (x < quiz.quizQuestions.length - 1) {
        x++;
        document.getElementById("question-option").innerHTML = "";
        loadQuiz();
    } else {
        if (seconds < 0) {
            seconds = 0;
        }//Prevents timer from going into the negatives

        endQuiz();

        countDown.textContent = seconds;
        console.log("No more questions.");
        console.log(seconds);
    }
}

//The button to retry the quiz; a lot of variables are reset to their default positions to make this run as intended.
function reTry() {
    seconds = 100;
    countDown.textContent= "--";
    x = 0;
    scoreTally = [];
    scoreTotal = 0;
    scoreBox.innerHTML = "";
    setTime();
    console.log("This is a retry.");
}

//Stores player data into localstorage to be pulled; still working on how to pull it
document.getElementById("submit-name").addEventListener("click", function() {
    var player = document.getElementById("player-name");
    
    var playerScoreData = {
      player: player.value,
      scoreTotal: scoreTotal,
      seconds: seconds
    };
    
    localStorage.setItem("playerScoreData", JSON.stringify(playerScoreData));
    console.log(playerScoreData);
});