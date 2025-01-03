export function isGameFinished(round, mistakes) {
    if (round === 15) {
        updateMistakesDisplay(mistakes)
        setTimeout(triggerGameEnd, 2000);
        return true

    } else {
        return false
    }

}

const quizContainer = document.querySelector(".quiz-container")
const evaluation = document.querySelector(".evaluation")

function triggerGameEnd() {
    quizContainer.style.opacity = "1"
    evaluation.style.opacity = "0"

    setTimeout(() => {
        quizContainer.style.opacity = "0"
        setTimeout(() => {
            quizContainer.classList.add("disappear")
            setTimeout(() => {
                evaluation.classList.remove("hide")

                setTimeout(() => {
                    evaluation.style.opacity = 1
                }, 10);
            }, 10);
        }, 400);
    }, 500);

}

function updateMistakesDisplay(mistakes) {


    const mistakesCount = document.getElementById("mistakes")
    mistakesCount.textContent = mistakes
    
    const evaluationDisplay = document.querySelector(".evaluation")
    const mainMenuBtn = document.createElement("div")
    mainMenuBtn.classList.add("back-to-main-menu-btn")
    mainMenuBtn.textContent = "Nächstes Spiel"
    evaluationDisplay.appendChild(mainMenuBtn)
    localStorage.setItem("spellingMistakes", mistakes)

    mainMenuBtn.addEventListener("click", () => {
        setTimeout(() => {
            window.location.href = "../index.html"
        }, 500);

    })


    console.log("Anzahl Fehler: " + mistakes)
}