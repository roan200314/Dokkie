import { runQuery } from "./utils/queryutil";

const knopUitjeAanmake: HTMLButtonElement = document.getElementById("button_uitje") as HTMLButtonElement;
knopUitjeAanmake.addEventListener("click", zetIn);

const knopUitjeZien: HTMLButtonElement = document.getElementById("uitjeZien") as HTMLButtonElement;
knopUitjeZien.addEventListener("click", laatZien);

async function zetIn(): Promise<void> {
    //een uitje aanmaken
    const uitjeInput: HTMLInputElement | null = document.getElementById("uit") as HTMLInputElement;
    const prijsInput: HTMLInputElement | null = document.getElementById("prijs") as HTMLInputElement;

    // Form input velden opslaan
    const uitje: string = uitjeInput.value;
    const prijs: string = prijsInput.value;
    if (!uitje.trim() || !prijs.trim()) {
        alert("Een of meerdere gegevens niet ingevuld.");
    } else {
        alert("Uitje succesvol toegevoegd.");
    }

    //inserten in database
    await runQuery("INSERT INTO event (description, price) VALUES (?)", [uitje, prijs]);
}

async function laatZien(): Promise<void> {
    //data opslaan in de div
    const data: HTMLElement | null = document.getElementById("uitjeTest");

    // runquery oproepen en data ophalen door een const aan te maken die alles kan pakken
    const resultaat: any[] | undefined = await runQuery("SELECT * FROM event");

    // data uit de database halen met een for statement
    if (resultaat && resultaat.length > 0) {
        resultaat.forEach((row: any) => {
            const div: HTMLElement | null = document.createElement("div");
            div.className = "alleUitjes";
            //knop aanmaken
            const buttonJoin: HTMLElement | null = document.createElement("button");
            buttonJoin.className = "joinUitje";
            //knop om te gaan wijzigen
            const buttonAanpas: HTMLElement | null = document.createElement("button");
            buttonAanpas.className = "bewerkUitje";
            //link voor button aanpassen uitje
            const linkAanpas: HTMLAnchorElement = document.createElement("a");
            linkAanpas.href = `uitjeBewerk.html?id=${row.eventId}`;
            //button om uitje af te sluiten
            const buttonSluiten: HTMLElement | null = document.createElement("button");
            buttonSluiten.className = "sluitUitje";
            buttonSluiten.textContent = "Sluit dit uitje af";

            //link voor button aanpassen uitje
            const linkJoin: HTMLAnchorElement = document.createElement("a");
            linkJoin.href = `uitjeJoin.html?id=${row.eventId}`;

            //paragraaf voor naam
            const paragraaf: HTMLElement | null = document.createElement("p");
            paragraaf.id = "soortUitje";
            paragraaf.textContent = `Soort Uitje: ${row.description}`;
            //text voor de button
            buttonJoin.textContent = "Join dit uitje!";
            //style aan button
            buttonJoin.style.backgroundColor = "#5c20a1";

            //paragraaf voor de prijs
            const paragraaf2: HTMLElement | null = document.createElement("p");
            paragraaf2.id = "prijsUitje";
            paragraaf2.textContent = `Prijs Uitje: €${row.price}`;
            paragraaf2.style.marginLeft = "10px";
            //text voor de button
            buttonAanpas.textContent = "Wijzig dit uitje!";
            //style aan button
            buttonAanpas.style.backgroundColor = "#2eb807";

            linkJoin.appendChild(buttonJoin);
            linkAanpas.appendChild(buttonAanpas);
            div.appendChild(paragraaf);
            div.appendChild(paragraaf2);
            div.appendChild(linkAanpas);
            div.appendChild(linkJoin);
            div.appendChild(buttonSluiten);
            data?.appendChild(div);
        });
    } else {
        // Display a message when no data is found
        data.textContent = "Geen data gevonden";
    }
}
