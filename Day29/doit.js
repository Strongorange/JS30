let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time");

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000; //끝나는 시간
  const startTime = Math.round((then - now) / 1000);

  displayTime(startTime);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    displayTime(secondsLeft);
  }, 1000);
}

function displayTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const second = seconds % 60;
  timerDisplay.textContent = `${minutes}:${second < 10 ? "0" : ""}${second}`;
}

function displayEndTime(timestamp) {
  const targetTime = new Date(timestamp); //timestamp 를 사용하여 날짜, 시간 구하기
  const hour = targetTime.getHours();
  const minutes = targetTime.getMinutes();
  endTime.textContent = `${hour}:${minutes < 10 ? "0" : ""}${minutes} 까지`;
}

function clickTimer(e) {
  const value = parseInt(this.dataset.time);
  timer(value);
}

function enterMinutes(e) {
  e.preventDefault();
  const minutes = parseInt(this.minutes.value * 60);
  timer(minutes);
}

buttons.forEach((button) => button.addEventListener("click", clickTimer));
document.customForm.addEventListener("submit", enterMinutes);
