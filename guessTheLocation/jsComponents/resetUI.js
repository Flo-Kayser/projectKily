import { roundCount, questionWord, userInputs, hidePlayerArea, imgBorder, imgDisplay, imgPlaceholder, indexBtns, nextBtn } from "./DOMvariables.js";

let isProcessing = false

export function resetUI(round, roundIndex) {
    nextBtn.classList.add("hide")

    roundCount.textContent = round;

    questionWord.textContent = (round % 2 === 0) ? "Wer ist gesucht?" : "Was ist gesucht?"

    imgBorder.classList.add("active")

    resetPlayerArea(roundIndex)

    imgDisplay.style.backgroundImage = `url(../assests/img_guessTheLocation/img_${round}-${roundIndex}.png)`

    indexBtns.forEach((indexBtn, index) => {
        if (indexBtn._listener) {
            indexBtn.removeEventListener("click", indexBtn._listener);
        }
    
        indexBtn._listener = () => handleIndexBtns(round, index);
        indexBtn.addEventListener("click", indexBtn._listener);
    });
    
}

function resetPlayerArea(roundIndex) {
    userInputs.forEach((input, index) => {
        input.innerHTML = "";

        const userInput = document.createElement("input")
        userInput.id = `user-input-${index + 1}`
        userInput.type = "text"
        userInput.autocomplete = "off"

        input.appendChild(userInput)
    })
    hidePlayerArea.style.transform = `scaleY(${1 - roundIndex * 0.2})`
}

export function selectIndexImg(round, index) {
    isProcessing = true
    imgBorder.classList.add("active")
    setTimeout(() => {
        imgPlaceholder.classList.remove("hide")
        imgDisplay.classList.remove("show")
    }, 500);
    setTimeout(() => {
        imgDisplay.style.backgroundImage = `url(../assests/img_guessTheLocation/img_${round}-${index}.png)`

    }, 990);

    setTimeout(() => {
        imgPlaceholder.classList.add("hide")
        imgDisplay.classList.add("show")
    }, 1000);

    setTimeout(() => {
        imgBorder.classList.remove("active")
        isProcessing = false
    }, 1500);

}

export function handleIndexBtns(round, index) {
    if (isProcessing === true) return

    const currentImage = imgDisplay.style.backgroundImage
    const currentImageId = currentImage.split(`img_${round}-`)[1]?.split(".")[0] || null

    if (index + 1 !== Number(currentImageId)) {
        selectIndexImg(round, index + 1)
    } else {
        return
    }
}