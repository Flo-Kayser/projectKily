import { userInputs, hidePlayerArea, questionWord, nextBtn, instruction, instructionTxt, instructionBtn } from "./DOMvariables.js"
import { selectIndexImg } from "./resetUI.js"

let mistakes = 0
let showInstruction = true;


export function checkAnswer(userTxt, round, textData, roundIndex) {
    if (showInstruction) {
        instructionTxt.textContent = textData["instruction-txt"]
        instruction.classList.add("show")
        instructionBtn.addEventListener("click", () => {
            instruction.classList.remove("show")
        })
        showInstruction = false
    }


    if (roundIndex > 5) {
        mistakes++
        endRound(round, textData)
    } else {
        const correctAnswers = textData[`answer_${round}`].split(",").map(word => word.trim().toUpperCase())
        const isCorrect = correctAnswers.some(answer => answer === userTxt.toUpperCase())
        if (isCorrect) {
            userInputs.forEach((el) => {
                if (el.children.length > 0) {
                    el.children[0].remove()
                    el.textContent = textData[`round_${round}`]
                    endRound(round, textData)
                }
            })
            hidePlayerArea.style.transform = "scaleY(0)"
        } else {
            hidePlayerArea.style.transform = `scaleY(${1 - roundIndex * 0.2})`
            selectIndexImg(round, roundIndex)
            document.getElementById(`user-input-${roundIndex}`).focus()
        }

    }


}

function endRound(round, textData) {
    showAnswer(round, textData)
    localStorage.setItem("guessTheLocation_mistakes",mistakes)

}

function showAnswer(round, textData) {
    questionWord.textContent = textData[`round_${round}`]
    questionWord.classList.add("active")
    setTimeout(() => {
        questionWord.classList.remove("active")
        nextBtn.classList.remove("hide")
    }, 5000);
}