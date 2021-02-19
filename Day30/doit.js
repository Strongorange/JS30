const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const scoreBoard = document.querySelector(".score");
const startButton = document.querySelector(".gamestart-button");
const highScoreBoard = document.querySelector(".highscore");
const punch = document.querySelector(".punch");
const difficulty = document.querySelector(".gamestart-difficulty");
let lastHole;
let lastScore = 0;
let currentScore = 0;
let highScore = 0;
let min = 300;
let max = 700;
let timeUp = false;
let isHard = false;
let isRunning = false;
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
  const time = randomTime(min, max);
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  if (isRunning) return;
  isRunning = !isRunning;
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
  }, 10000);
  setTimeout(() => {
    scoreBoard.textContent = "0";
  }, 10600);
}

function bonk(e) {
  punch.currentTime = 0;
  if (!e.isTrusted) return;
  score++;
  scoreBoard.textContent = score;
  punch.play();
  punch.currentTime = 1;
  saveScoreLs(score);
  this.parentNode.classList.remove("up");
}

function saveScoreLs(score) {
  localStorage.setItem("currentScore", score);
}

function changeDifficulty(e) {
  isHard = !isHard;
  if (!isHard) {
    difficulty.textContent = "Difficulty : Normal";
    min = 300;
    max = 700;
  } else {
    difficulty.textContent = "Difficulty : Hard";
    min = 100;
    max = 500;
  }
}

moles.forEach((mole) => mole.addEventListener("click", bonk));
difficulty.addEventListener("click", changeDifficulty);

function init() {
  highScoreBoard.textContent = localStorage.getItem("highScore");
  console.log(localStorage.getItem("highScore"));
}

init();
