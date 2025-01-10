// DOM - Elements
const wheel = document.querySelector(".wheel");
const spinBtn = document.querySelector(".spin-btn");

const timelineMistakes = localStorage.getItem("timelineMistakes");
console.log(timelineMistakes);

document.addEventListener("DOMContentLoaded", () => {
  createWheel(count);
});

// create wheel of fortune
let count = 6;
let colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "orange",
  "pink",
  "lime",
];
function createWheel(count) {
  wheel.innerHTML = "";
  for (let i = 1; i <= count; i++) {
    newPart = document.createElement("div");
    newPart.classList.add("part");

    let rotation = (360 / count) * (i - 1) + 180;
    newPart.style.background = colors[i - 1];

    const width = getWidth(count);
    newPart.style.width = width + "px";
    newPart.style.transform = `rotate(${rotation}deg)`;
    wheel.appendChild(newPart);
  }
}

function getWidth(E) {
    const angle = ((E - 2) / E * 180) / 2;
    const width = 500 * Math.cos(angle);
    console.log(width)
    return width;
}
