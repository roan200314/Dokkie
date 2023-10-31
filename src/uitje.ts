import { runQuery } from "./utils/queryutil";

// Hier selecteren we de knop om een uitje aan te maken en voegen een click-eventlistener toe.
const knopUitjeAanmaken: HTMLButtonElement = document.getElementById("button_uitje") as HTMLButtonElement;
knopUitjeAanmaken.addEventListener("click", zetIn);

// Hier selecteren we de knop om uitjes te bekijken en voegen een click-eventlistener toe.
const knopUitjeZien: HTMLButtonElement = document.getElementById("uitjeZien") as HTMLButtonElement;
knopUitjeZien.addEventListener("click", laatZien);

const resultaat: any[] | undefined = await runQuery("SELECT * FROM event");
const uitjeDB: any = resultaat[0];

// Deze functie wordt aangeroepen om een uitje aan te maken.
async function zetIn(): Promise<void> {
    // Invoervelden voor het uitje en de prijs selecteren
    const uitjeInput: HTMLInputElement | null = document.getElementById("uit") as HTMLInputElement;
    const prijsInput: HTMLInputElement | null = document.getElementById("prijs") as HTMLInputElement;

    // De ingevoerde gegevens opslaan
    const uitje: string = uitjeInput.value;
    const prijs: string = prijsInput.value;

    // Controleer of de invoervelden niet leeg zijn
    if (!uitje.trim() || !prijs.trim()) {
        alert("Een of meerdere gegevens niet ingevuld.");
    } else {
        alert("Uitje succesvol toegevoegd.");
    }

    // De gegevens in de database invoegen
    await runQuery("INSERT INTO event (description, price) VALUES (?)", [uitje, prijs]);
}

// Deze functie wordt aangeroepen om de uitjes weer te geven
async function laatZien(): Promise<void> {
    // Het element waarin de gegevens worden weergegeven selecteren
    const data: HTMLElement | null = document.getElementById("uitjeTest");

    // De gegevens uit de database ophalen
    const resultaat: any[] | undefined = await runQuery("SELECT * FROM event");
    const uitjeDB: any = resultaat[0];

    // De gegevens weergeven in de div
    if (resultaat && resultaat.length > 0) {
        resultaat.forEach((row: any) => {
            const div: HTMLElement | null = document.createElement("div");
            div.className = "alleUitjes";

            // Een knop aanmaken om aan een uitje deel te nemen
            const buttonJoin: HTMLElement | null = document.createElement("button");
            buttonJoin.className = "joinUitje";

            // Een knop om een uitje aan te passen
            const buttonAanpassen: HTMLElement | null = document.createElement("button");
            buttonAanpassen.className = "bewerkUitje";

            // Een link om een uitje aan te passen
            const linkAanpassen: HTMLAnchorElement = document.createElement("a");
            linkAanpassen.href = `uitjeBewerk.html?id=${row.eventId}`;

            // Een link om aan een uitje deel te nemen
            const linkJoin: HTMLAnchorElement = document.createElement("a");
            linkJoin.href = `uitjeJoin.html?id=${row.eventId}`;

            // Een paragraaf om de naam van het uitje weer te geven
            const paragraaf: HTMLElement | null = document.createElement("p");
            paragraaf.id = "soortUitje";
            paragraaf.textContent = `Soort Uitje: ${row.description}`;

            // De tekst voor de knop om aan een uitje deel te nemen
            buttonJoin.textContent = "Doe mee aan dit uitje!";

            // De stijl van de knop
            buttonJoin.style.backgroundColor = "#5c20a1";

            // Een paragraaf om de prijs van het uitje weer te geven
            const paragraaf2: HTMLElement | null = document.createElement("p");
            paragraaf2.id = "prijsUitje";
            paragraaf2.textContent = `Prijs Uitje: €${row.price}`;
            paragraaf2.style.marginLeft = "10px";

            // De tekst voor de knop om een uitje aan te passen
            buttonAanpassen.textContent = "Pas dit uitje aan!";

            // De stijl van de knop
            buttonAanpassen.style.backgroundColor = "#2eb807";

            // De knoppen en paragrafen aan de div toevoegen
            linkJoin.appendChild(buttonJoin);
            linkAanpassen.appendChild(buttonAanpassen);
            div.appendChild(paragraaf);
            div.appendChild(paragraaf2);
            div.appendChild(linkAanpassen);
            div.appendChild(linkJoin);
            data?.appendChild(div);
        });
    } else {
        // Een bericht weergeven als er geen gegevens zijn
        data.textContent = "Geen gegevens gevonden";
    }
}

