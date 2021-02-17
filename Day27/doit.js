const items = document.querySelector(".items");
let isDown = false;
let startX;
let scrollLeft;

items.addEventListener("mousedown", (e) => {
  isDown = true;
  items.classList.add("active");
  startX = e.pageX - items.offsetLeft;
  scrollLeft = items.scrollLeft;
});
items.addEventListener("mouseup", () => {
  isDown = false;
  items.classList.remove("active");
});
items.addEventListener("mouseleave", () => {
  isDown = false;
  items.classList.remove("active");
});
items.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  const x = e.pageX - items.offsetLeft;
  const walk = x - startX;
  items.scrollLeft = scrollLeft - walk;
});
