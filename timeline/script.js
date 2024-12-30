import "./components/hover.js"
import { loadTxt } from "./../content/loadTxt.js"

let timelineData = {};
let isProcessing = false
let mistakes = 0
let currentCard
let rotation = 0
let startGame = true


async function initializeTimeline() {
    timelineData = await loadTxt("timeline");
}

window.onload = function () {
    initializeTimeline()
    setTimeout(() => {
        loadTask()
    }, 500);
}

function enterFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari und Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
}


function flipWrapper() {
    rotation = (rotation === 180) ? 0 : 180;
    const wrapper = document.querySelector(".wrapper");
    wrapper.style.transform = `rotateY(${rotation}deg)`;
}

function loadTask() {
    const ids = ["task", "task-heading"];

    ids.forEach((id) => {
        if (timelineData && timelineData[id]) {
            const element = document.getElementById(id);

            if (element) {
                element.textContent = timelineData[id];
            } else {
                console.warn(`Element mit ID "${id}" wurde nicht gefunden.`);
            }
        } else {
            console.warn(`Keine Daten für "${id}" im timelineData vorhanden.`);
        }
    });
}

const taskSide = document.querySelector(".task")
document.querySelector(".pulse").addEventListener("click", () => {
    enterFullscreen()
    setTimeout(() => {
        flipWrapper()

        isProcessing = true
        setTimeout(() => {
            taskSide.innerHTML = ""
            nextCard()
            startGame = false
        }, 2000);
    }, 1000);
}, { once: true })


// init
let cardNumbers = Array.from({ length: 12 }, (_, i) => i);
let stackSize = cardNumbers.length
const stack = document.querySelector(".stack")
createStack()
// stack of cards
function createStack() {
    stack.innerHTML = ""

    for (let i = 1; i <= stackSize; i++) {
        const newStackCard = document.createElement("div")

        newStackCard.classList.add("stack-card")

        const randomRotation = (Math.random() - .5) * 90;
        newStackCard.style.transform = `rotate(${randomRotation}deg)`;

        stack.appendChild(newStackCard);
    }
}


function moveCard(card) {
    card.classList.add("move")
    currentCardContainer.innerHTML = ""
    setTimeout(() => {
        card.remove()
        createCurrentCard()
    }, 2000);
    setTimeout(() => {
        isProcessing = false

    }, 3000);
}
const currentCardContainer = document.querySelector(".current-card-container")


function createCurrentCard() {
    const newCard = document.createElement("div")

    newCard.classList.add("current-card")
    let cardNumber = getCardNumber(cardNumbers)

    currentCard = cardNumber
    createCurrentCardDesign(newCard, cardNumber)

    currentCardContainer.appendChild(newCard)
}

function getCardNumber(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const number = arr[randomIndex] + 1
    arr.splice(randomIndex, 1)
    return number
}

function createCurrentCardDesign(card, index) {
    card.style.background = `url("/assests/img_timeline/img_${index}.png")`
    card.style.backgroundSize = "cover"
    card.style.backgroundPosition = "center"

    const currentCardDescription = document.createElement("div")
    currentCardDescription.classList.add("current-card-description")
    currentCardDescription.id = `img_${index}`
    card.appendChild(currentCardDescription)

    if (timelineData[`img_${currentCard}`]) {
        currentCardDescription.textContent = timelineData[`img_${currentCard}`];
    }
}




const timeline = document.querySelector(".timeline")

timeline.addEventListener("click", (e) => {
    if (isProcessing) {
        console.warn("blocked")
        return
    }
    if (e.target && (e.target.classList.contains("adder")) || e.target.classList.contains("adder-dot")) {

        isProcessing = true
        const cardID = currentCard

        const newElement = document.createElement("div")
        newElement.classList.add("dates")
        newElement.id = cardID

        newElement.style.background = `url("/assests/img_timeline/img_${cardID}.png")`
        newElement.style.backgroundSize = "cover"
        newElement.style.backgroundPosition = "center"

        const txt = document.createElement("span")
        txt.id = `date_${cardID}`
        newElement.appendChild(txt)

        timeline.insertBefore(newElement, e.target.closest(".adder"))
        e.target.closest(".adder").remove()

        if (timelineData[`date_${cardID}`]) {
            txt.textContent = timelineData[`date_${cardID}`];
        }

        checkOrder(cardID) === true ? nextCard() : wrongCard(cardID)

        setTimeout(() => {
            isProcessing = false
        }, 3000);

    }
})

function checkOrder(id) {
    let cards = Array.from(document.querySelectorAll(".dates"))
    let defaultCards = Array.from(document.querySelectorAll(".default"))

    cards = cards.filter(card => !defaultCards.includes(card));

    let index = cards.findIndex(card => Number(card.id) === id)

    if (index === -1) {
        console.warn(`Card with ID ${id} not found in cards.`);
        return false;
    }

    if (cards.length <= 1) return true

    if (index === 0) {
        let nextId = parseInt(cards[index + 1].id)
        if (id <= nextId) {
            return true
        }
    } else if (index === cards.length - 1) {
        let prevId = parseInt(cards[index - 1].id)
        if (id >= prevId) {
            return true
        }
    } else {
        let prevId = parseInt(cards[index - 1].id)
        let nextId = parseInt(cards[index + 1].id)

        if (id >= prevId && id <= nextId) {
            return true
        }
    }
    return false
}

function createAdder() {
    const timelineDivs = Array.from(timeline.querySelectorAll("div"));
    const lastIndex = timelineDivs.length - 1;
    const adders = document.querySelectorAll(".adder")

    if (startGame === true) return

    adders.forEach((adder) => {

        adder.remove()
    })

    timelineDivs.forEach((div, index) => {
        if (index !== lastIndex) {
            const adder = document.createElement("div");
            adder.classList.add("adder");

            const adderDot = document.createElement("div")
            adderDot.classList.add("adder-dot")
            adderDot.textContent = "close"
            adder.appendChild(adderDot)


            if (div.nextSibling) {
                timeline.insertBefore(adder, div.nextSibling);
            }
        }
    });
}

function nextCard() {
    const cardsLeft = Array.from(document.querySelectorAll(".stack-card"))

    if (cardsLeft.length === 0) {
        gameEnd()
        return
    } else {
        currentCardContainer.innerHTML = ""
        const firstStackCard = stack.querySelector(".stack-card:last-child")
        moveCard(firstStackCard)
        createAdder()
    }

}

function wrongCard(id) {
    const flashOverlay = document.getElementById("flashOverlay");
    flashOverlay.classList.add("active");
    setTimeout(() => {
        flashOverlay.classList.remove("active");
    }, 1100);

    const cards = document.querySelectorAll(".dates")

    cards.forEach(card => {
        if (Number(card.id) === id) {
            card.remove()
        }
    })

    mistakes += 1
}

function gameEnd() {

    const adders = document.querySelectorAll(".adder")
    adders.forEach(adder => {
        adder.remove()
    })

    currentCardContainer.innerHTML = ""

    const mistakesDisplay = document.querySelector(".mistakes")
    mistakesDisplay.classList.add("active")
    mistakesDisplay.textContent = `Fehler: ${mistakes}`

    const mainManuBtn = document.createElement("div")
    mainManuBtn.classList.add("back-to-main-menu-btn")
    mainManuBtn.textContent = "Nächstes Spiel"
    mistakesDisplay.appendChild(mainManuBtn)
    localStorage.setItem("timelineMistakes", mistakes)

    mainManuBtn.addEventListener("click", () => {
        setTimeout(() => {
            window.location.href = "/index.html"
        }, 500);

    })
}

