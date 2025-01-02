const green = "#008000"
const red = "#cc0000"

export function checkAnswer(round, selectedAnswer, textData) {


    const answerId = `q${round}_${selectedAnswer}`
    const status = textData[answerId].split("&")[1]
    console.log("der status der antwort ist: " + status)

    if (status && status === "t") {
        markCorrectAnswer(round, selectedAnswer, textData)
        return true
    } else if (status === "f") {
        markCorrectAnswer(round, selectedAnswer, textData)
        return false
    } else {
        console.warn("hs")
    }



}

function markCorrectAnswer(round, selectedAnswer, textData) {
    setTimeout(() => {
        [1, 2, 3, 4].forEach((e) => {
            const id = `q${round}_a${e}`
            const status = textData[id].split("&")[1]
            const answerId = `a${e}`
            const answerElement = document.getElementById(answerId)
            const parentElement = answerElement.parentElement

            parentElement.style.pointerEvents = "none"

            if (status === "f" && answerId === selectedAnswer) {
                parentElement.style.background = red
                parentElement.style.color = "#fff"
            } else if (status === "t") {
                parentElement.style.background = green
                parentElement.style.color = "#fff"
            } else { return }
        })
    }, 1000);
}