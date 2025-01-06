import { userInputs, hidePlayerArea } from "./DOMvariables.js"


export function checkAnswer(userTxt, round, textData, roundIndex) {
    if (roundIndex === 5) {
        endRound(round)
    } else {
        const correctAnswers = textData[`answer_${round}`].split(",").map(word => word.trim().toUpperCase())
        console.log(correctAnswers)
        const isCorrect = correctAnswers.some(answer => answer.includes(userTxt.toUpperCase()))
        if (isCorrect) {
            userInputs.forEach((el) => {
                el.innerHTML = ""
                hidePlayerArea.style.transform = "scaleY(0)"
                
            })
        }else{
            return false
        }

    }
}

function endRound(round) {
    console.log("mahc ich noch")
}