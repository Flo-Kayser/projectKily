import { loadTxt } from "../content/loadTxt.js";
import { resetUI, selectIndexImg } from "./jsComponents/resetUI.js";
import { loadTask } from "./jsComponents/setupTxt.js";
import { startGame } from "./jsComponents/startGame.js";
import { checkAnswer } from "./jsComponents/checkAnswer.js";
import { triggerGameEnd } from "./jsComponents/endGame.js";

import { imgDisplay, imgBorder, submitBtns, userInputs, hidePlayerArea, nextBtn } from "./jsComponents/DOMvariables.js";

// global variables
let textData = {}
let roundCount = 1
let roundIndex = 1

let isDisabled = false



document.addEventListener("DOMContentLoaded", () => {
    initializeTxt()
    setTimeout(() => {
        loadTask(textData)
        nextRound(roundCount, roundIndex)
    }, 500);

    setTimeout(() => startGame(), 5000)

})


async function initializeTxt() {
    textData = await loadTxt("guessTheLocation");
}

function nextRound(round, roundIndex) {
    resetUI(round, roundIndex)
    setTimeout(submitBtnsListener, 200)

}

function submitBtnsListener() {
    submitBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            handleInput(index);
        });

        const input = document.getElementById(`user-input-${index + 1}`);
        if (input) {
            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    handleInput(index);
                }
            });
        } else {
            console.error(`Input mit ID 'user-input-${index + 1}' nicht gefunden`);
        }
    });
}

function handleInput(index) {
    const input = document.getElementById(`user-input-${index + 1}`);
    if (input) {
        if (input.value !== "") {
            userInputs[index].innerHTML = ""
            userInputs[index].textContent = input.value.charAt(0).toUpperCase() + input.value.slice(1).toLowerCase();

            roundIndex++
            checkAnswer(input.value, roundCount, textData, roundIndex)
        } else return
    } else {
        console.warn(`Input mit ID 'user-input-${index + 1}' nicht gefunden`);
    }
}


nextBtn.addEventListener("click", () => {
    if (isDisabled) {
        console.warn("Button is still disabled")
        return
    }


    if (roundCount !== 9) {
        isDisabled = true
        roundIndex = 1
        roundCount++
        selectIndexImg(roundCount, roundIndex)
        setTimeout(() => {
            nextRound(roundCount, roundIndex)
        }, 1000);
        setTimeout(() => {
            isDisabled = false
        }, 3000);

    } else {
        console.log("ende")
        triggerGameEnd()
    }
})











