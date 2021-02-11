const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = [];

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
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
        <li>
            <label for="">${plate.text}</label> 
        </li>
      `;
    })
    .join("");
}
addItems.addEventListener("submit", addItem);
