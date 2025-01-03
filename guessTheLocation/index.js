import { loadTxt } from "../content/loadTxt.js";
import { loadTask } from "./jsComponents/setupTxt.js";
import { startGame } from "./jsComponents/startGame.js";


// gloabal variables
let textData = {}
let roundCount = 1



document.addEventListener("DOMContentLoaded", () => {
    initializeTxt()
    setTimeout(() => {
        loadTask(textData)
    }, 500);

    setTimeout(()=>startGame(roundCount),5000)
    
})


async function initializeTxt() {
    textData = await loadTxt("guessTheLocation");
}



document.querySelector(".user-container").addEventListener("click", ()=>{
    document.querySelector(".details").classList.toggle("active")
})















