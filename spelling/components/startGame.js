const taskContainer = document.querySelector(".task-container")
const task = document.getElementById("task")
const taskHeading = document.getElementById("task-heading")
const pulseElement = document.querySelector(".pulse")

const quizContainer = document.querySelector(".quiz-container")
const evaluation = document.querySelector(".evaluation")

quizContainer.classList.add("disappear")
evaluation.classList.add("hide")

pulseElement.addEventListener("click", () => {
    [taskHeading, task].forEach((el, index) => {

        el.style.animationDelay = `${index * 0.3}s`;
        el.classList.add("disappear");
    })
    pulseElement.style.opacity = "0"
    setTimeout(() => {
        taskContainer.remove()
        quizContainer.classList.remove("disappear")
        quizContainer.style.opacity ="0"
        setTimeout(() => {
            quizContainer.style.opacity=""
        }, 500);
    }, 1000);

})