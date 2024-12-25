// load content from json file
fetch("/content/timeline.txt")
    .then(response => response.text())
    .then(data => {
        const lines = data.split("|")
        lines.forEach(line => {
            const [key, value] = line.split('=');
            const element = document.getElementById(key.trim());
            if (element) {
                element.textContent = value.trim();
            }
        });
    })


let rotation = 0
function flipWrapper() {
    rotation === 180 ? rotation = 0 : rotation = 180;
    const wrapper = document.querySelector(".wrapper");
    wrapper.style.transform = `rotateY(${rotation}deg)`;



}

document.querySelector(".pulse").addEventListener("click", flipWrapper)

// init
let stackSize = 10
const stack = document.querySelector(".stack")
createStack()
// stack of cards
function createStack() {
    stack.innerHTML=""

    for (let i = 1; i <= stackSize; i++) {
        const newStackCard = document.createElement("div")

        newStackCard.classList.add("stack-card")

        const randomRotation = (Math.random() - .5) * 90;
        newStackCard.style.transform = `rotate(${randomRotation}deg)`;

        stack.appendChild(newStackCard);
    }
}
document.querySelector(".current-card").addEventListener("click", ()=>{
    firstStackCard= stack.querySelector(".stack-card:last-child")
    firstStackCard.remove()
})
