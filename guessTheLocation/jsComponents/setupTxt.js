export function loadTask(textData) {
    const ids = ["task", "task-heading"];

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