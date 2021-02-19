const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const scoreBoard = document.querySelector(".score");
const startButton = document.querySelector(".gamestart-button");
const highScoreBoard = document.querySelector(".highscore");
const punch = document.querySelector(".punch");
const difficulty = document.querySelector(".gamestart-difficulty");
const remainTimeBoard = document.querySelector(".gamestart-remain-time");
const html = document.querySelector("html");
let lastHole;
let lastScore = 0;
let currentScore = 0;
let currentScoreHard = 0;
let highScore = 0;
let highScoreHard = 0;
let min = 300;
let max = 700;
let timeUp = false;
let isHard = false;
let isRunning = false;
let score = 0;
let scoreHard = 0;
let duration = 10000;
let duration2 = duration + 600;
let remainTime;

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
  remainTime = duration / 1000;
  scoreBoard.textContent = score;
  remainTimeBoard.textContent = remainTime;
  peep();
  setTimeout(() => {
    timeUp = true;
    isRunning = !isRunning;
    if (isHard) {
      showHighScoreHard();
    } else {
      showHighScore();
    }
  }, duration);

  setTimeout(() => {
    scoreBoard.textContent = "0";
  }, duration2);

  runShowTime();
}

function runShowTime() {
  setTimeout(function showTimeLeft() {
    if (remainTime === 0) return;
    remainTime--;
    remainTimeBoard.textContent = remainTime;
    if (remainTime > 0) {
      runShowTime();
    }
  }, 1000);
}

function bonk(e) {
  punch.currentTime = 0;
  if (!e.isTrusted) return;
  score++;
  scoreBoard.textContent = score;
  punch.play();
  punch.currentTime = 1;
  if (isHard) {
    saveScoreLsHard(score);
  } else {
    saveScoreLs(score);
  }
  this.parentNode.classList.remove("up");
}

function showHighScoreHard() {
  currentScoreHard = localStorage.getItem("currentScoreHard");
  if (currentScoreHard > highScoreHard) {
    localStorage.setItem("highScoreHard", currentScoreHard);
    highScoreHard = localStorage.getItem("highScoreHard");
    localStorage.setItem("currentScoreHard", 0);
    scoreBoard.textContent = "0";
    highScoreBoard.textContent = highScoreHard;
  }
}

function showHighScore() {
  currentScore = localStorage.getItem("currentScore");
  if (currentScore > highScore) {
    localStorage.setItem("highScore", currentScore);
    highScore = localStorage.getItem("highScore");
    localStorage.setItem("currentScore", 0);
    scoreBoard.textContent = "0";
    highScoreBoard.textContent = highScore;
  }
}

function saveScoreLsHard(score) {
  localStorage.setItem("currentScoreHard", score);
}

function saveScoreLs(score) {
  localStorage.setItem("currentScore", score);
}

function changeDifficulty(e) {
  isHard = !isHard;
  if (!isHard) {
    difficulty.textContent = "Difficulty : Normal";
    difficulty.classList.remove("hard");
    highScoreBoard.classList.remove("hard");
    html.classList.remove("hard");
    if (localStorage.getItem("highScore") === null) {
      highScoreBoard.textContent = 0;
    } else {
      highScoreBoard.textContent = localStorage.getItem("highScore");
    }
    min = 300;
    max = 700;
  } else {
    difficulty.innerHTML = `<i class="fas fa-fire-alt"></i> Difficulty : Hard <i class="fas fa-fire-alt"></i>`;
    difficulty.classList.add("hard");
    highScoreBoard.classList.add("hard");
    html.classList.add("hard");
    if (localStorage.getItem("highScoreHard") === null) {
      highScoreBoard.textContent = 0;
    } else {
      highScoreBoard.textContent = localStorage.getItem("highScoreHard");
    }
    min = 100;
    max = 500;
  }
}

function init() {
  highScoreBoard.textContent = localStorage.getItem("highScore");
  console.log(localStorage.getItem("highScore"));
}

moles.forEach((mole) => mole.addEventListener("click", bonk));
difficulty.addEventListener("click", changeDifficulty);

init();
