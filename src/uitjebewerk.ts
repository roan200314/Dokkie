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

            //paragraaf voor namen van het uitje
            const paragraaf: HTMLElement | null = document.createElement("p");
            const paragraaf3: HTMLElement | null = document.createElement("p");
            paragraaf.textContent = "Mensen bij het uitje: ";
            paragraaf3.style.marginRight = "15px";
            paragraaf3.style.bottom = "479px";
            paragraaf3.textContent = `  ${row.name}`;

            div.appendChild(paragraaf);
            div.appendChild(paragraaf3);
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

    div.appendChild(paragraaf);
    data?.appendChild(div);
}
laatZien();
