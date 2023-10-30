//Selecting HTML elements
const number = document.querySelector(".number");
const checkbtn = document.querySelector(".check");
const againbtn = document.querySelector(".again");
const message = document.querySelector(".message");
let score = Number(document.querySelector(".score").textContent);

// Create random numbers between 1 and 20
const randomNumber = Math.floor(Math.random() * 20) + 1;

// Set highscore
let highscore = 0;

//If there is a highscore before, get it from local storage
if (localStorage.getItem("highscore")) {
  highscore = parseInt(localStorage.getItem("highscore"));

  updateHighscoreDisplay();
}

//Update highscore
function updateHighscoreDisplay() {
  const highscoreEl = document.querySelector(".highscore");
  highscoreEl.textContent = highscore;
}

//Check the new score and update
function checkAndUpdateHighscore(newScore) {
  if (newScore > highscore) {
    highscore = newScore;
    localStorage.setItem("highscore", highscore); 
    updateHighscoreDisplay();
  }
}

// Adding events
checkbtn.addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    message.textContent = "😐 No number!";
  } else if (guess === randomNumber) {

    number.textContent = randomNumber;
    message.textContent = "🎉 Correct!";
    checkAndUpdateHighscore(score);

    document.body.style.backgroundColor = "#60b347";

  } else if (guess < randomNumber) {
    if (randomNumber - guess <= 2) {
      message.textContent = "😬 Very close, try a slightly larger number.";
    } else {
      message.textContent = "🙂 Try a larger number.";
    }

    score -= 1;

    document.querySelector(".score").textContent = score;
  } else {
    if (guess - randomNumber <= 2) {
      message.textContent = "🤏 Very close, try a slightly smaller number.";
    } else {
      message.textContent = "😏 Try a smaller number.";
    }

    score -= 1;

    document.querySelector(".score").textContent = score;
  }
});

againbtn.addEventListener("click", function () {
  location.reload(); // New game
});
