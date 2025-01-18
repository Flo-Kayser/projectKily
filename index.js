import "./index_components/conclusion.js";

// DOM - Elements
const body = document.querySelector("body");
const sections = document.querySelectorAll("section");
const wheel = document.querySelector(".wheel");
const spinBtn = document.querySelector(".spin-btn");
const selectedGameContainer = document.querySelector(
  ".selected-game-container"
);
const selectedGame = document.querySelector(".selected-game");
const playGameBtn = document.querySelector(".play-game-btn");

const overview = document.querySelector(".overview");

// global var
let letters = ["S", "H", "C", "O", "E", "H", "W", "O"];

let degrees = parseInt(localStorage.getItem("degrees")) || 0;

let count = parseInt(localStorage.getItem("gameCount")) || 8;

let letterFields = JSON.parse(localStorage.getItem("letterFields")) || [];

let data = JSON.parse(localStorage.getItem("data")) || [
  {
    keyword: "Karte",
    color: "#819c69",
    icon: "my_location",
    game: "spelling",
  },
  {
    keyword: "Orthographie",
    color: "#d16ba5",
    icon: "spellcheck",
    game: "spelling",
  },
  {
    keyword: "Vergangenheit",
    color: "#264661",
    icon: "history",
    game: "timeline",
  },
  {
    keyword: "Was ist das?",
    color: "#a78bfa",
    icon: "location_city",
    game: "guessTheLocation",
  },
  {
    keyword: "person_pin",
    color: "#d6cdea",
    icon: "person_pin",
    game: "spelling",
  },
  {
    keyword: "quiz",
    color: "#52796f",
    icon: "quiz",
    game: "spelling",
  },
  {
    keyword: "Kopf",
    color: "#f4c7ab",
    icon: "psychology_alt",
    game: "spelling",
  },
  {
    keyword: "swap",
    color: "#b3cde0",
    icon: "swap_vertical_circle",
    game: "spelling",
  },
];

// create wheel of fortune
let sectorAngle = 360 / count;

// Überprüfen, ob es der erste Besuch ist
if (!localStorage.getItem("firstVisit")) {
  localStorage.clear();

  localStorage.setItem("firstVisit", "true");
}

document.addEventListener("DOMContentLoaded", () => {
  console.log(localStorage);
  loadSite();
  updateLetterFields();
});

function loadSite() {
  createWheel(count);

  wheel.style.transition = "none";
  wheel.style.transform = `rotate(${degrees}deg)`;

  setTimeout(() => {
    sections.forEach((section) => {
      section.style.opacity = 1;
      section.style.pointerEvents = "all";
    });
  }, 1500);
}

function createWheel(count) {
  wheel.innerHTML = "";

  for (let i = 1; i <= count; i++) {
    const newPart = document.createElement("div");

    if (count === 1 || count === 2) {
      newPart.style.height = "100%";
      newPart.style.width = "100%";
      newPart.classList.add("bigger-part");
    } else {
      newPart.classList.add("part");

      let rotation = -(360 / count) * (i - 1) - sectorAngle / 2;

      const baseSide = getBaseSide(count);
      newPart.style.height = baseSide + "px";
      newPart.style.transform = `rotate(${rotation}deg)`;
    }

    newPart.style.background = data[i - 1].color;

    const span = document.createElement("span");
    span.textContent = data[i - 1].icon;
    span.classList.add("icon");
    newPart.appendChild(span);

    wheel.appendChild(newPart);
    setTimeout(() => {
      wheel.style.transition = "";
    }, 200);
  }
}

function getBaseSide(n) {
  const angle = Math.PI / n;
  const radius = 235 / Math.cos(angle);
  const a = 2 * radius * Math.sin(angle);
  return a;
}

spinBtn.addEventListener("click", () => {
  spinWheel();
});

function spinWheel() {
  let randomRotation = Math.floor(Math.random() * 720);
  degrees = degrees + 10 * 360 + randomRotation;

  wheel.style.transform = `rotate(${degrees}deg)`;

  setTimeout(calculateWinner, 4000);
}

function calculateWinner() {
  let rotationAngle = degrees % 360;
  let segmentIndex = Math.floor(rotationAngle / sectorAngle);
  let winner = data[segmentIndex];

  localStorage.setItem("degrees", rotationAngle);
  selectedGameContainer.classList.remove("hide");
  spinBtn.classList.add("hide");

  selectedGame.textContent = winner.keyword;

  playGameBtn.addEventListener("click", () => playGame(winner, segmentIndex));
}

function playGame(winner, segmentIndex) {
  const folder = winner.game;
  sections.forEach((section) => {
    section.style.opacity = 0;
    section.style.pointerEvents = "none";
  });
  body.style.cursor = "none";
  setTimeout(() => {
    data.splice(segmentIndex, 1);
    localStorage.setItem("gameCount", data.length);
    localStorage.setItem("data", JSON.stringify(data));

    updatePlayedList(winner);
  }, 2000);

  setTimeout(() => {
    window.location.href = `./${folder}/index.html`;
  }, 3000);
}

// buchstaben logik

function updatePlayedList(game) {
  letterFields.push(game);

  localStorage.setItem("letterFields", JSON.stringify(letterFields));
}

function updateLetterFields() {
  overview.innerHTML = "";

  letterFields.forEach((field) => {
    const newField = document.createElement("div");
    newField.classList.add("letter");
    newField.style.background = `${field.color}`;

    const header = document.createElement("div");
    header.classList.add("header");

    const symbol = document.createElement("span");
    symbol.classList.add("symbol");
    symbol.textContent = field.icon;
    header.appendChild(symbol);

    const headline = document.createElement("span");
    headline.classList.add("headline");
    headline.textContent = field.keyword;
    header.appendChild(headline);

    newField.appendChild(header);

    const mistakesDisplay = document.createElement("div");
    mistakesDisplay.classList.add("mistakesDisplay");
    const mistakes = localStorage.getItem(`${field.game}_mistakes`);
    mistakesDisplay.textContent = `Fehler: ${mistakes}`;
    newField.appendChild(mistakesDisplay);

    const letterDisplay = document.createElement("div");
    letterDisplay.classList.add("letterDisplay");

    if (mistakes > 5) {
      letterDisplay.classList.add("x");
      letters.shift();
    } else {
      letterDisplay.textContent = letters[0];
      letters.shift();
    }

    newField.appendChild(letterDisplay);

    overview.appendChild(newField);
  });

  console.log(letters.length)
}

const conclusionInput = document.getElementById("conclusion-input");

const validInputs = ["echo show", "echoshow"];

conclusionInput.addEventListener("input", () => {
    if (letters.length === 0) {
    const userInput = conclusionInput.value.toLowerCase();
    if (validInputs.includes(userInput)) {
      console.log("ende");
      // window.location.href=""
    }
  }
});
