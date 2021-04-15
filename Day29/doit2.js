const buttons = document.querySelectorAll("[data-time]");
const timeLeft = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const enterMinute = document.querySelector("form");
const enterMinuteInput = enterMinute.querySelector("input");
let countdown;

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  const startTime = Math.round((then - now) / 1000);

  displayTime(startTime);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondLeft = Math.round((then - Date.now()) / 1000);

    if (secondLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTime(secondLeft);
  }, 1000);
}

function displayTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const second = Math.floor(seconds % 60);
  //   console.log(second);
  timeLeft.innerHTML = `${minutes}:${second < 10 ? "0" : ""}${second}`;
}

function displayEndTime(timestamp) {
  const targetTime = new Date(timestamp);
  console.log(targetTime);
  const hour = targetTime.getHours();
  const minute = targetTime.getMinutes();
  endTime.innerHTML = `${hour}:${minute < 10 ? "0" : ""}${minute} 까지`;
}

function clickTimer() {
  const thisData = parseInt(this.dataset.time);
  timer(thisData);
}

function enterInput(e) {
  e.preventDefault();
  const minutes = parseInt(enterMinuteInput.value) * 60;
  timer(minutes);
  enterMinuteInput.value = "";
}

buttons.forEach((button) => button.addEventListener("click", clickTimer));
enterMinute.addEventListener("submit", enterInput);
