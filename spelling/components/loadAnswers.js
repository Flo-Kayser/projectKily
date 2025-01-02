export function loadTask(textData) {
    const ids = ["task", "task-heading", "question"];

    ids.forEach((id) => {
        if (textData && textData[id]) {
            const element = document.getElementById(id);

            if (element) {
                element.textContent = textData[id];
            } else {
                console.warn(`Element mit ID "${id}" wurde nicht gefunden.`);
            }
        } else {
            console.warn(`Keine Daten für "${id}" im timelineData vorhanden.`);
        }
    });
}
export function loadQuestion(round, textData) {
    const ids = ["a1", "a2", "a3", "a4"]

    ids.forEach(id => {
        const answerId = `q${round}_${id}`
        if (textData && textData[answerId]) {
            const element = document.getElementById(id)

            if (element) {
                const txt = textData[answerId]
                element.textContent = txt.split("&")[0]

            } else {
                console.warn("element mit id:" + id + " nicht gefunden")
            }
        } else {
            console.warn("textData von", answerId, "nicht gefunden")
        }
    })
}

export function setRound(round){
    const roundCounter = document.getElementById("question-number")

    roundCounter.textContent = `${round}.`
}