import { loadTxt } from "../content/loadTxt.js";
import { resetUI, selectIndexImg } from "./jsComponents/resetUI.js";
import { loadTask } from "./jsComponents/setupTxt.js";
import { startGame } from "./jsComponents/startGame.js";
import { checkAnswer } from "./jsComponents/checkAnswer.js";

import { imgDisplay, imgBorder, submitBtns, userInputs, hidePlayerArea } from "./jsComponents/DOMvariables.js";


// gloabal variables
let textData = {}
let roundCount = 4
let roundIndex = 1



document.addEventListener("DOMContentLoaded", () => {
    initializeTxt()
    setTimeout(() => {
        loadTask(textData)
        nextRound(roundCount, roundIndex)
    }, 500);

    setTimeout(() => startGame(), 1000)

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
            userInputs[index].textContent = input.value.trim().toUpperCase()

            if (!checkAnswer(input.value, roundCount, textData,roundIndex)) {
                if (roundIndex !== 5) {
                    roundIndex++
                    hidePlayerArea.style.transform = `scaleY(${1 - roundIndex * 0.2})`
                    selectIndexImg(roundCount, roundIndex)
                    // setTimeout(() => {
                    //     document.getElementById(`user-input-${roundIndex}`).focus();
                    // }, 1000);
                } else {
                    console.log("neeee")
                }
            }
        } else return
    } else {
        console.error(`Input mit ID 'user-input-${index + 1}' nicht gefunden`);
    }
}














