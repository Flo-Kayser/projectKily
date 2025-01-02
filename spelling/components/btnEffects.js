let proofBtn = document.getElementById("proof-btn")
let nextBtn = document.getElementById("next-btn")


document.addEventListener("DOMContentLoaded", () => {
    initializeProofBtn(proofBtn)
    initializeProofBtn(nextBtn)
})

function initializeProofBtn(btn) {

    const spans = []

    for (let i = 0; i < 40; i++) {
        let span = document.createElement("span")
        span.style.top = `${i * 2}px`
        spans.push(span)
        btn.appendChild(span)

        let rndmDelay = (Math.random() * .75) + 0
        span.style.transitionDelay = rndmDelay + "s"
    }
}

export function activateProofBtn() {
    proofBtn.classList.add("active");
    proofBtn.setAttribute("data-txt-active","Antwort prüfen?")
}


