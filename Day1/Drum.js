window.addEventListener("keydown", function (e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); //실제 숫자를 ""로 감싸줘야 작동함
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return; //stopthe function from running all together
  audio.currentTime = 0; //rewind to the start 이거 없으면 계속해서 눌러도 끝날때까지 기다렸다가 재생
  audio.play();
  key.classList.add("playing");
});

function removeTransition(e) {
  if (e.propertyName !== "transform") return; //skip it if it's not transform
  this.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
