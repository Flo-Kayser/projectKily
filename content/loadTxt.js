
export async function loadTxt(element) {
    const url = `../content/${element}.txt`;

    try {
        const response = await fetch(url);
        const data = await response.text();
        const elementData = {};

        const lines = data.split("|");
        lines.forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                elementData[key.trim()] = value.trim();
            }
        });
        return elementData;

    } catch (error) {
        console.error("Error loading " + element + "data: ", error);
        throw error;
    }
}