const slider = document.querySelector(".items");
let isDown = false; //클릭했는지 안 했는지 저장하는 플래그
let startX; //처음 내가 클릭한 지점, 마우스를 클릭하고 수 없이 왔다갔다해도 중요한건 처음 내가 찍은 지점에서 얼마나 많이 벌어졌냐.
let scrollLeft; //초기화 (새로고침) 할때 다시 초기로 돌아가야하기에 움직인 거리를 저장

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mous (eleave", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});
