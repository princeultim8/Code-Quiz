// * A start button that when clicked a timer starts and the first question appears.

let startScreen = document.querySelector("#start-screen");
let startBtn = document.querySelector("#start");
let timeContent = document.querySelector(".timer");
let timeClock = document.querySelector("#time");
let quizEl = document.querySelector("#questions");
let qTitle = document.querySelector("#question-title");
let choiceBtn = document.querySelectorAll(".choice");
let choiceA = document.querySelector("#a");
let choiceB = document.querySelector("#b");
let choiceC = document.querySelector("#c");
let choiceD = document.querySelector("#d");
let endScreen = document.querySelector("#end-screen");
let initials = document.querySelector("#initials");
let submit = document.querySelector("#submit");

let scores = [];

if (localStorage.getItem('scores')) {
  scores = JSON.parse(localStorage.getItem('scores'))
}


let timer = 75;
let score = 0;

// When the start button is clicked, it must hide the starting content and display the questions on screen
function startQuiz() {
  startBtn.addEventListener("click", function () {
    startScreen.style.display = "none";
    renderQ();
    quizEl.style.display = "block";

    // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      timer--;
      timeClock.textContent = timer;

      if (timer <= 0) {
        endQuiz();
        clearInterval(timeInterval);
        return;
      }
    }, 1000);
  });
}

startQuiz();

// How to navigate to the first question at the same time the button is clicked?
// It should transition to the question when the button is clicked and the timer starts to count down

// Import the questions array and declare the question being displayed on screen
let lastQuestionIndex = questions.length - 1;
let runningQuestion = 0;

// Manipulate the DOM so that the content is displayed on the screen from the objects in the arrays in questions.js

function renderQ() {
  let q = questions[runningQuestion];
  qTitle.innerHTML = q.question;
  choiceA.innerHTML = q.a;
  choiceB.innerHTML = q.b;
  choiceC.innerHTML = q.c;
  choiceD.innerHTML = q.d;
}

// From the objects in the array, if a user chooses a specific option, run a function to explicitly show them that they are right/wrong

function checkAnswer(answer) {
  if (questions[runningQuestion].correct === answer) {
    answerCorrect();
  } else {
    answerWrong();
  }

  //Input a delay between each question
  // Go through the questions array and if the value of the current question is less that the value of the length of the array, move to the next question

  setTimeout(function () {
    if (runningQuestion < lastQuestionIndex) {
      runningQuestion++;
      renderQ();
      // If the user answers the last question, show the ending screen
    } else if (runningQuestion === lastQuestionIndex) {
      endQuiz();
      timer = 0;
    }
  }, 700);
}

// Make a function that makes the screen green, plays the 'correct' audio and increment score if the user chooses the correct answer for a question

function answerCorrect() {
  // When the correct answer is chosen, the background colour turns green for a set period of time and then returns to neutral colour.
  document.body.style.backgroundColor = "green";
  setTimeout(function () {
    document.body.style.backgroundColor = "";
  }, 700);

  let correctSfx = new Audio("assets/sfx/correct.wav");
  correctSfx.play();
  correctSfx.volume = 0.1;
  score += 20;
}

// Make a function that makes the screen red, plays the 'incorrect' audio and increment score if the user chooses the incorrect answer for a question

function answerWrong() {
  // When the correct answer is chosen, the background colour turns red for a set period of time and then returns to neutral colour.
  document.body.style.backgroundColor = "red";
  setTimeout(function () {
    document.body.style.backgroundColor = "";
  }, 700);
  let incorrectSfx = new Audio("assets/sfx/incorrect.wav");
  incorrectSfx.play();
  incorrectSfx.volume = 0.1;
  // Minus points and deduct 10 from timer.
  timer -= 10;
  score -= 10;
}

// When the user has completed the quiz or the timer runs out. Display an alert/prompt to ask user to input in their name
// The score is to be displayed on screen and saved onto an array for the high-scores.

function endQuiz() {
  quizEl.style.display = "none";
  endScreen.style.display = "block";
  endScreen.classList.replace("hide", "show");
  document.getElementById("final-score").textContent = score;
}

// Save the score and the user's initials to local storage upon submission
// Display the data on the Highscores page

function storeHiScores() {
  localStorage.setItem("scores", JSON.stringify(scores));
}

// When the submit button is clicked, push the values of the user input, plus the score onto an array

submit.addEventListener("click", function (event) {
  var buttonEl = event.target;
  if (buttonEl.matches("button")) {
    var parentEl = buttonEl.parentElement;
    var indexOfEl = parentEl.dataset.index;
    var playerData = score + ' - ' + initials.value.trim();
    scores.push(playerData);
    // This locates to the highscores.html webpage and displays its content when the function runs
    document.location.replace('/highscores.html');
    storeHiScores();
  }
});
