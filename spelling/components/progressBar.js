const progressBarContainer = document.querySelector(".progress-bar")

export function initializeProgressBar(){

    for(let i = 1;i<=15;i++){
        const circle = document.createElement("div")
        circle.classList.add("circle")
        circle.id=`circle${i}`
        console.log(circle.id)
        circle.textContent = i
        progressBarContainer.appendChild(circle)
    }
}


export function updateProgressBar(round){

    const id = `circle${round}`
    const currentCircle = progressBarContainer.querySelector(`#${id}`)

    
    currentCircle.classList.add("active")

    setTimeout(() => {
        currentCircle.classList.add("complete")
    }, 400); 

}
