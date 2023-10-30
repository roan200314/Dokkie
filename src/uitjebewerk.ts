import { runQuery } from "./utils/queryutil";
const knopPrijs: HTMLButtonElement = document.getElementById("prijs") as HTMLButtonElement;
knopPrijs.addEventListener("click", bereken);
const betalen: HTMLButtonElement = document.getElementById("bewerk") as HTMLButtonElement;
betalen.addEventListener("click", bewerken);

const currentURL: string = window.location.href;
const IdOphalen: URL = new URL(currentURL);
const id: string | null = IdOphalen.searchParams.get("id");

// runquery oproepen en data ophalen door een const aan te maken die alles kan pakken
const event: any[] = (await runQuery("SELECT * FROM event WHERE eventId = (?)", [id])) as any;
const participant: any[] | undefined = (await runQuery("SELECT * FROM participant WHERE eventId = (?)", [
    id,
])) as any;
const payment: any[] | undefined = (await runQuery("SELECT * FROM payment WHERE eventId = (?)", [id])) as any;

const uitjeDB: any = event[0];
const participantDB: any = participant[0];
const paymentDB: any = payment[0];
const prijsUitje: number = uitjeDB.price;
const aantalDeelnemers: number = participant.length;
const prijsPerDeelnemer: number = prijsUitje / aantalDeelnemers;
// const prijsBetalen: number = prijsUitje - `${paymentDB.amount}`;
// console.log(`${paymentDB.amount}`);
//data opslaan in de div
const data: HTMLElement | null = document.getElementById("uitje");

async function laatZien(): Promise<void> {
    //div maken voor de data
    const div: HTMLElement | null = document.createElement("div");
    div.className = "prijsNaam";

    //paragraaf voor naam van uitje
    const paragraaf: HTMLElement | null = document.createElement("input");
    paragraaf.id = "uitjeNaam";
    //uitje op scherm laten zien
    paragraaf.value = `Naam van uitje: ${uitjeDB.description}`;
    paragraaf.disabled = true;
    //paragraaf voor prijs van uitje
    const paragraaf2: HTMLElement | null = document.createElement("input");
    paragraaf2.id = "prijsUitje";
    paragraaf2.disabled = true;
    paragraaf2.value = `Prijs van uitje: €${uitjeDB.price}`;

    div.appendChild(paragraaf);
    div.appendChild(paragraaf2);
    data?.appendChild(div);

    if (participant && participant.length > 0) {
        participant.forEach((row: any) => {
            // div maken voor de data
            const div: HTMLElement | null = document.createElement("div");
            div.className = "bewerkDiv";

            // paragraaf voor namen van het uitje
            const personenText: HTMLElement | null = document.createElement("p");
            personenText.id = "personenText";

            const persoonNaam: HTMLElement | null = document.createElement("p");
            persoonNaam.id = "persoonNaam";
            persoonNaam.textContent = `${row.name}`;

            const pVoorBedrag: HTMLElement | null = document.createElement("p");
            pVoorBedrag.id = "pVoorBedrag";
            pVoorBedrag.textContent = "Heeft betaald:";

            div.appendChild(personenText);
            div.appendChild(persoonNaam);
            div.appendChild(pVoorBedrag);

            personenText.textContent = "Persoon bij het uitje: ";
            pVoorBedrag.textContent = "Heeft betaald:";
            persoonNaam.id = "persoonNaam";
            persoonNaam.textContent = `${row.name}`;

            const form1: HTMLInputElement | null = document.createElement("input");
            form1.id = `form_${row.userId}`;
            form1.type = "number";
            //form nummer kan niet lager dan 0
            form1.min = "0";

            div.appendChild(form1);
            data?.appendChild(div);
        });
    } else {
        const paragraaf: HTMLElement | null = document.createElement("p");
        paragraaf.id = "voegDeelnemer";
        paragraaf.textContent = "Voeg deelnemers toe aan dit uitje.";

        div.appendChild(paragraaf);
    }
}
async function bereken(): Promise<void> {
    prijsPerDeelnemer;
    //div maken voor de data
    const div: HTMLElement | null = document.createElement("div");
    div.className = "prijsNaam";
    const paragraaf: HTMLElement | null = document.createElement("p");
    // const paragraaf2: HTMLElement | null = document.createElement("p");
    paragraaf.textContent = "Iedereen moet €" + prijsPerDeelnemer.toFixed(2) + " betalen";
    // paragraaf2.textContent = prijsBetalen;

    // if (prijsPerDeelnemer ==)

    div.appendChild(paragraaf);
    // div.appendChild(paragraaf2);
    data?.appendChild(div);
}

async function bewerken(): Promise<void> {
    const invoer: HTMLInputElement | null = document.getElementById("form1") as HTMLInputElement;
    const betaald: any = invoer.value;

    const currentDate: date = new Date().toISOString().slice(0, 19).replace("T", " ");

    console.log(betaald);

    const aantalMensen: any = participant?.length;

    for (let i: any = 1; i <= aantalMensen; i++) {
        await runQuery("INSERT INTO payment (datePaid, description, amount, eventId, name) VALUES (?)", [
            currentDate,
            `${uitjeDB.description}`,
            betaald,
            id,
            `${participantDB.name}`,
        ]);
    }
    alert("Betalingen succesvol toegevoegd.");
}

laatZien();
