const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value;
  this.querySelector("[name=item]").value = "";
  this.reset(); //위 의 코드와 동일한 의미 이 reset()을 알아두자
  const item = {
    text, //text: text 와 동일한 의미
    done: false,
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.parse(JSON.stringify(items)));
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? "checked" : ""
      } />
        <label for="item${i}">${plate.text}</label>
      </li>
      `;
    })
    .join("");
}
addItems.addEventListener("submit", addItem);
populateList(items, itemsList);
