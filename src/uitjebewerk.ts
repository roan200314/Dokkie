import { runQuery } from "./utils/queryutil";

// Selecteer de knop om de prijs te berekenen en voeg een click-eventlistener toe.
const knopPrijs: HTMLButtonElement = document.getElementById("prijs") as HTMLButtonElement;
knopPrijs.addEventListener("click", bereken);

// Selecteer de knop om betalingen te bewerken en voeg een click-eventlistener toe.
const betalen: HTMLButtonElement = document.getElementById("bewerk") as HTMLButtonElement;
betalen.addEventListener("click", bewerken);

// Haal het huidige URL op en haal de ID op uit de querystring.
const currentURL: string = window.location.href;
const IdOphalen: URL = new URL(currentURL);
const id: string | null = IdOphalen.searchParams.get("id");

// Haal gegevens op uit de database, zoals het evenement, deelnemers en betalingen.
const event: any[] = (await runQuery("SELECT * FROM event WHERE eventId = (?)", [id])) as any;
const participant: any[] | undefined = (await runQuery("SELECT * FROM participant WHERE eventId = (?)", [
    id,
])) as any;
const payment: any[] | undefined = (await runQuery("SELECT * FROM payment WHERE eventId = (?)", [id])) as any;

// Definieer variabelen voor de evenementgegevens.
const uitjeDB: any = event[0];
const participantDB: any = participant[0];
const paymentDB: any = payment[0];
const prijsUitje: number = uitjeDB.price;
const aantalDeelnemers: number = participant.length;
const prijsPerDeelnemer: number = prijsUitje / aantalDeelnemers;

// Selecteer het HTML-element om gegevens weer te geven.
const data: HTMLElement | null = document.getElementById("uitje");

// Functie om gegevens weer te geven.
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

// Functie om de prijs per deelnemer te berekenen.
async function bereken(): Promise<void> {
    // Bereken de prijs per deelnemer.
    const div: HTMLElement | null = document.createElement("div");
    div.className = "prijsNaam";
    const paragraaf: HTMLElement | null = document.createElement("p");
    paragraaf.textContent = "Iedereen moet €" + prijsPerDeelnemer.toFixed(2) + " betalen";

    div.appendChild(paragraaf);
    data?.appendChild(div);
}

// Functie om betalingen te bewerken.
async function bewerken(): Promise<void> {
    // Selecteer alle inputvelden en namen van deelnemers.
    const inputElements: any = document.getElementsByClassName("input");
    const inputnaamElements: any = document.getElementsByClassName("persoonNaam");

    // Controleer of er inputvelden en namen zijn.
    if (!inputElements.length || !inputnaamElements.length) {
        alert("Geen betalingen ingevuld.");
        return;
    }

    // Haal de huidige datum en tijd op.
    const currentDate: date = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Zorg ervoor dat het aantal inputvelden en namen overeenkomt.
    const inputArray: any = Array.from(inputElements);
    const inputnaamArray: any = Array.from(inputnaamElements);

    if (inputArray.length !== inputnaamArray.length) {
        alert("Ongeldige invoer.");
        return;
    }

    // Loop door de inputvelden en voeg betalingen toe aan de database.
    for (let i: any = 0; i < inputArray.length; i++) {
        const betaald: any = inputArray[i].value;
        const naam: any = inputnaamArray[i].textContent;

        // Voeg de betaling toe aan de database.
        await runQuery("INSERT INTO payment (datePaid, description, amount, eventId, name) VALUES (?)", [
            currentDate,
            `${uitjeDB.description}`,
            betaald,
            id,
            naam,
        ]);
    }

    // Toon een succesbericht.
    alert("Betalingen succesvol toegevoegd.");
}

// Roep de functie aan om gegevens weer te geven.
laatZien();
