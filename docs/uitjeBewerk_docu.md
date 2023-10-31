# documentatie uitjebewerk
<details>
<summary>id ophalen</summary>

<code>
// Haal het huidige URL op en haal de ID op uit de querystring.
const currentURL: string = window.location.href;
const IdOphalen: URL = new URL(currentURL);
const id: string | null = IdOphalen.searchParams.get("id");
</code>

Met bovenstaande code haal ik de id op die ik in de url heb dit doet die door mijn URL op te halen en in een string te zetten. Vervolgens zoekt die in de 'currentURL' of het woord 'id' voorkomt. Zo ja maakt die daar een id van. Hierdoor is het simpel om het op te sturen.


</details>

<details>
<summary>data ophalen</summary>
<code>
const event: any[] = (await runQuery("SELECT * FROM event WHERE eventId = (?)", [id])) as any;

const uitjeDB: any = event[0];
</code>

Met bovenstaande code haal je alles op uit de database uit de tabel event, en met 'uitjeDB' wordt de eerste regel opgehaald waar de <code> [id] </code> bij hoort.
</details>

<details>
<summary>LaatZien functie</summary>
<code> 
async function laatZien(): Promise<void> {
    // Maak een div aan voor de gegevens.
    const div: HTMLElement | null = document.createElement("div");
    div.className = "prijsNaam";

    // Paragraaf voor de naam van het evenement.
    const paragraaf: HTMLElement | null = document.createElement("input");
    paragraaf.id = "uitjeNaam";
    // Laat de naam van het evenement zien.
    paragraaf.value = `Naam uitje: ${uitjeDB.description}`;
    paragraaf.disabled = true;

    // Paragraaf voor de prijs van het evenement.
    const paragraaf2: HTMLElement | null = document.createElement("input");
    paragraaf2.id = "prijsUitje";
    paragraaf2.disabled = true;
    paragraaf2.value = `Prijs van het uitje: €${uitjeDB.price}`;

    div.appendChild(paragraaf);
    div.appendChild(paragraaf2);
    data?.appendChild(div);

    if (participant && participant.length > 0) {
        participant.forEach((row: any) => {
            // Maak een div aan voor de gegevens.
            const div: HTMLElement | null = document.createElement("div");
            div.className = "bewerkDiv";

            // Paragraaf voor namen van deelnemers aan het evenement.
            const personenText: HTMLElement | null = document.createElement("p");
            personenText.id = "personenText";
            personenText.textContent = "Deelnemer aan het evenement: ";

            const persoonNaam: HTMLElement | null = document.createElement("p");
            persoonNaam.className = "persoonNaam";
            persoonNaam.id = `persoonNaam_${row.userId}`;
            persoonNaam.textContent = `${row.name}`;

            const pVoorBedrag: HTMLElement | null = document.createElement("p");
            pVoorBedrag.id = "pVoorBedrag";
            pVoorBedrag.textContent = "Heeft betaald:";

            div.appendChild(personenText);
            div.appendChild(persoonNaam);
            div.appendChild(pVoorBedrag);

            // Inputveld voor het bedrag dat is betaald.
            const form1: HTMLInputElement | null = document.createElement("input");
            form1.className = "input";
            form1.id = `form_${row.userId}`;
            form1.type = "number";
            // Bedrag kan niet lager zijn dan 0.
            form1.min = "0";

            div.appendChild(form1);
            data?.appendChild(div);
        });
    } else {
        // Toon een bericht als er geen deelnemers zijn.
        const paragraaf: HTMLElement | null = document.createElement("p");
        paragraaf.id = "voegDeelnemer";
        paragraaf.textContent = "Voeg deelnemers toe aan dit evenement.";

        div.appendChild(paragraaf);
    }
}
laatZien();
</code>

Met bovenstaande code heb ik ervoor gezorgd dat bij het inladen van de pagina de gegevens worden laten zien van het uitje dat is aangeklikt. Zo heb ik een foreach waarin ik alle gegevens oproep die ik nodig heb om de gegevens uit de database op het scherm te zetten. Zo maak ik ook nog paragraven en zet ik daar tekst aan vast en ook bij knoppen.
