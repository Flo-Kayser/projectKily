import { loadTxt } from "../content/loadTxt.js"
import "./components/background.js"
import "./components/startGame.js"
import { activateProofBtn } from "./components/btnEffects.js"
import { checkAnswer } from "./components/checkAnswer.js"

import { loadTask, loadQuestion, setRound } from "./components/loadAnswers.js"
import { isGameFinished } from "./components/gameEnd.js"
import { updateProgressBar, initializeProgressBar } from "./components/progressBar.js"

// global variables
let textData = {}
let handleAnswerSelection
let selectedAnswer
let roundCount = 1

let mistakes = 0

const green = "#008000"
const red = "#cc0000"

const answerContainer = document.querySelector(".answer-container");
const proofBtn = document.getElementById("proof-btn")
const nextBtn = document.getElementById("next-btn")

document.addEventListener("DOMContentLoaded", () => {
    initializeTxt()
    initializeProgressBar()
    setTimeout(() => {
        loadTask(textData)
        loadQuestion(roundCount, textData)
        setRound(roundCount)
        updateProgressBar(roundCount)
    }, 500);
    setupAnswerSelection()

    setTimeout(() => {
        const loader = document.querySelector(".loader")
        loader.classList.add("hide")
    }, 9000);

})

async function initializeTxt() {
    textData = await loadTxt("spelling");
}

function setupAnswerSelection() {
    if (!answerContainer) {
        console.warn('Element mit der Klasse "answers-container" wurde nicht gefunden.');
        return;
    }

    handleAnswerSelection = (e) => {
        const answerElement = e.target.closest(".answer")
        if (!answerElement) return

        answerContainer.querySelectorAll(".answer").forEach((answer) => {
            answer.classList.remove("active");
        });
        answerElement.classList.add("active");

        const selection = answerElement.querySelector("div")
        selectedAnswer = selection.id
        activateProofBtn()
    };
    answerContainer.addEventListener("click", handleAnswerSelection);
}

proofBtn.addEventListener("click", () => {
    answerContainer.removeEventListener("click", handleAnswerSelection)


    if (checkAnswer(roundCount, selectedAnswer, textData)) {
        proofBtn.style.background = green
        setTimeout(() => {
            proofBtn.setAttribute("data-txt", "Absolut Korrekt")
        }, 500);
    } else {
        proofBtn.style.background = red
        mistakes++
        setTimeout(() => {
            proofBtn.setAttribute("data-txt", "Leider falsch")
        }, 500);
    }
    proofBtn.classList.remove("active")

    if (isGameFinished(roundCount,mistakes)) return
    setTimeout(() => {
        nextBtn.style.opacity = "1"
        nextBtn.classList.add("active")
    }, 2000);
})

nextBtn.addEventListener("click", () => {
    nextRound()
})


function nextRound() {
    roundCount++
    updateProgressBar(roundCount)
    resetUI()
    setTimeout(() => {
        loadQuestion(roundCount, textData)
    }, 500);



}

function resetUI() {
    fadeQuizContainer("out")
    setTimeout(() => {

        const spans = proofBtn.querySelectorAll("span")

        spans.forEach(span => {
            span.style.background = ""
        })
        proofBtn.setAttribute("data-txt-active", "")
        proofBtn.setAttribute("data-txt", "")
        proofBtn.style.background = ""
        setRound(roundCount)
        setupAnswerSelection()

        for (let i = 1; i <= 4; i++) {
            const element = document.getElementById(`a${i}`)
            element.style.color = ""

            const parentElement = element.parentElement
            parentElement.classList.remove("active")
            parentElement.style.color = ""
            parentElement.style.background = ""
            parentElement.style.pointerEvents = ""
        }



        nextBtn.style.opacity = "0"
        nextBtn.classList.remove("active")


    }, 200);
    setTimeout(() => {
        fadeQuizContainer("switchSide")
    }, 500);
    setTimeout(() => {
        fadeQuizContainer("in")
    }, 1000);
}

function fadeQuizContainer(direction) {
    const quizContainer = document.querySelector(".quiz-container")
    const elements = quizContainer.querySelectorAll(".question , .answer-container")

    if (direction === "out") {
        elements.forEach((element, index) => {
            element.style.transitionDelay = `${index * 0.3}s`
            element.classList.add("fade-out")

        })


    } else if (direction === "switchSide") {
        elements.forEach(element => {

            element.classList.remove("fade-out")
            element.classList.add("fade-in")

        })

    } else if (direction === "in")
        elements.forEach(element => {

            element.style.transform = ""
            element.classList.remove("fade-in")
        })
}

