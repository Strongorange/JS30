const nav = document.querySelector(".top");
const lis = document.querySelectorAll(".cool > li");
const dropdownBackground = document.querySelector(".dropdownBackground");

function handleMouseUp() {
  this.classList.add("trigger-enter");

  setTimeout(() => {
    if (this.classList.contains("trigger-enter")) {
      this.classList.add("trigger-enter-active");
    }
  }, 150);
  dropdownBackground.classList.add("open");
  const dropdown = this.querySelector(".dropdown");
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();
  //   console.log(dropdownCoords);
  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left,
  };
  dropdownBackground.style.width = `${coords.width}px`;
  dropdownBackground.style.height = `${coords.height}px`;
  dropdownBackground.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

function handleMouseLeave() {
  this.classList.remove("trigger-enter");
  dropdownBackground.classList.remove("open");
}

lis.forEach((li) => li.addEventListener("mouseenter", handleMouseUp));
lis.forEach((li) => li.addEventListener("mouseleave", handleMouseLeave));
