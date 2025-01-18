import { loader, pulseElement, task, taskContainer, taskHeading,userContainer,gameContainer,imgContainer,imgDisplay,imgPlaceholder, imgBorder} from "./DOMvariables.js";

export function startGame() {
    loader.classList.add("hide")

    let pulseElementAction
    pulseElementAction = () => {
        [taskHeading, task, pulseElement].forEach((element, index) => {
            element.style.transitionDelay = `${index * .5}s`;
            element.classList.add("hide")

        })
        setTimeout(() => {
            taskContainer.style.display = "none"
            gameContainer.style.display = ""
            gameContainer.style.transition = ".5s"
            userContainer.style.transition = ".5s"
            imgContainer.style.transition = ".5s"
            gameContainer.style.display = ""
            
            setTimeout(() => {
                gameContainer.classList.remove("hide")
            }, 400);
            setTimeout(() => {
                userContainer.classList.remove("hide")
                imgContainer.classList.remove("hide")
            }, 500);
        }, 1500);

        setTimeout(() => {
            imgPlaceholder.classList.add("hide")
            imgDisplay.classList.add("show")
            setTimeout(() => {
                
                imgBorder.classList.remove("active")
            }, 500);
        }, 3000);

        pulseElement.removeEventListener("click", pulseElementAction)
    }
    pulseElement.addEventListener("click", pulseElementAction)


}