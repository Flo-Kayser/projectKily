import {gameContainer, evaluation} from "./DOMvariables.js"


export function triggerGameEnd() {
    gameContainer.style.opacity = "1"
    
    setTimeout(() => {
        gameContainer.classList.add("hide")
        setTimeout(() => {
            gameContainer.style.display="none"
            setTimeout(() => {
                
                evaluation.style.display = ""
                setTimeout(() => {
                    evaluation.classList.remove("hide")
                    updateMistakesDisplay()
                }, 10);
            }, 10);
        }, 600);
    }, 500);
    
}

function updateMistakesDisplay() {
    
    let mistakes = localStorage.getItem("guessTheLocation_mistakes")

    const mistakesCount = document.getElementById("mistakes")
    mistakesCount.textContent = mistakes
    
    const evaluationDisplay = document.querySelector(".evaluation")
    const mainMenuBtn = document.createElement("div")
    mainMenuBtn.classList.add("back-to-main-menu-btn")
    mainMenuBtn.textContent = "Nächstes Spiel"
    evaluationDisplay.appendChild(mainMenuBtn)

    mainMenuBtn.addEventListener("click", () => {
        evaluation.classList.add("hide")
        setTimeout(() => {
            window.location.href = "../index.html"
        }, 500);

    })

}