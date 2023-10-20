import { runQuery } from "./utils/queryutil";
const knopPrijs: HTMLButtonElement = document.getElementById("prijs") as HTMLButtonElement;
knopPrijs.addEventListener("click", bereken);

const currentURL: string = window.location.href;
const IdOphalen: URL = new URL(currentURL);
const id: string | null = IdOphalen.searchParams.get("id");

// runquery oproepen en data ophalen door een const aan te maken die alles kan pakken
const event: any[] = (await runQuery("SELECT * FROM event WHERE eventId = (?)", [id])) as any;
const participant: any[] | undefined = (await runQuery("SELECT * FROM participant WHERE eventId = (?)", [
    id,
])) as any;



const uitjeDB: any = event[0];
const participantDB: any = participant[0];
const prijsUitje: number = uitjeDB.price;
const aantalDeelnemers: number = participant.length;
const prijsPerDeelnemer: number = prijsUitje / aantalDeelnemers;
//data opslaan in de div
const data: HTMLElement | null = document.getElementById("uitje");

async function laatZien(): Promise<void> {
    //div maken voor de data
    const div: HTMLElement | null = document.createElement("div");
    div.style.display = "flex";

    //paragraaf voor naam van uitje
    const paragraaf: HTMLElement | null = document.createElement("p");
    //uitje op scherm laten zien
    paragraaf.textContent = `Naam van uitje: ${uitjeDB.description}`;
    paragraaf.style.marginRight = "15px";
    paragraaf.style.position = "absolute";
    paragraaf.style.left = "350px";
    paragraaf.style.bottom = "479px";

    //paragraaf voor prijs van uitje
    const paragraaf2: HTMLElement | null = document.createElement("p");
    paragraaf2.textContent = `Prijs van uitje: ${uitjeDB.price}`;
    paragraaf2.style.position = "absolute";
    paragraaf2.style.left = "350px";
    paragraaf.style.bottom = "408px";

    div.appendChild(paragraaf);
    div.appendChild(paragraaf2);
    data?.appendChild(div);

    if (participant && participant.length > 0) {
        participant.forEach((row: any) => {
            //div maken voor de data
            const div: HTMLElement | null = document.createElement("div");
            div.style.display = "flex";
            div.style.marginTop = "25px";
            //paragraaf voor namen van het uitje
            const personenText: HTMLElement | null = document.createElement("p");
            const persoonNaam: HTMLElement | null = document.createElement("p");
            const pVoorBedrag: HTMLElement | null = document.createElement("p");
            const form1: HTMLElement | null = document.createElement("input");
            form1.type = "number";
            form1.min = "0";
            form1.style.width = "55px";
            form1.style.height = "35px";
            form1.style.marginTop = "10px";
            personenText.textContent = "Persoon bij het uitje: ";
            pVoorBedrag.textContent = "Heeft betaald:";
            persoonNaam.style.marginRight = "15px";
            persoonNaam.style.bottom = "479px";
            persoonNaam.textContent = `${row.name}`;

            div.appendChild(personenText);
            div.appendChild(persoonNaam);
            div.appendChild(pVoorBedrag);
            div.appendChild(form1);
            data?.appendChild(div);
        });
    }
}
async function bereken(): Promise<void> {
    prijsPerDeelnemer;
    //div maken voor de data
    const div: HTMLElement | null = document.createElement("div");
    div.style.display = "flex";
    const paragraaf: HTMLElement | null = document.createElement("p");
    paragraaf.textContent = "iedereen moet €" + prijsPerDeelnemer.toFixed(2) + " betalen";
    

    // if (prijsPerDeelnemer ==)

    div.appendChild(paragraaf);
    data?.appendChild(div);
}
laatZien();
