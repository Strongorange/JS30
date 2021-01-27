const inputs = document.querySelectorAll(".controls input");

function handleUpdate(e) {
  // ||은 data.sizing이 없는것도 있으니 undefined를 피하기 위해서 사용
  const suffix = this.dataset.sizing || ""; //data 속성의 세부값? dataset 오늘의 공부
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  );
  //style.setProperty 오늘의 공부
}

inputs.forEach((input) => input.addEventListener("input", handleUpdate));
