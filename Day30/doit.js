const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const scoreBoard = document.querySelector(".score");
const startButton = document.querySelector(".gamestart-button");
const highScoreBoard = document.querySelector(".highscore");
let lastHole;
let lastScore = 0;
let currentScore = 0;
let highScore = 0;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    // console.log("재실행");
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  score = 0;
  timeUp = false;
  scoreBoard.textContent = score;
  peep();
  setTimeout(() => {
    timeUp = true;
    currentScore = localStorage.getItem("currentScore");
    if (currentScore > highScore) {
      localStorage.setItem("highScore", currentScore);
      highScore = localStorage.getItem("highScore");
      localStorage.setItem("currentScore", 0);
      scoreBoard.textContent = "0";
      highScoreBoard.textContent = highScore;
    }
  }, 7000);
}

function bonk(e) {
  if (!e.isTrusted) return;
  score++;
  scoreBoard.textContent = score;
  saveScoreLs(score);
  this.parentNode.classList.remove("up");
}

function saveScoreLs(score) {
  localStorage.setItem("currentScore", score);
}

moles.forEach((mole) => mole.addEventListener("click", bonk));
