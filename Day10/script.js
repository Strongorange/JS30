const checkBoxes = document.querySelectorAll("input");
let lastChecked;

function handleClick(e) {
  let isChecked = false;
  if (e.shiftKey && this.checked) {
    checkBoxes.forEach((checkBox) => {
      console.log(checkBox);
      if (checkBox === lastChecked || checkBox === this) {
        console.log("플래그 바뀜");
        isChecked = !isChecked;
        console.log(isChecked);
      }
      if (isChecked) {
        checkBox.checked = true;
      }
    });
  }
  lastChecked = this;
  console.log(`This is  ${lastChecked}`);
}

checkBoxes.forEach((input) => input.addEventListener("click", handleClick));
