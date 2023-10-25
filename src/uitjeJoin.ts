import { runQuery } from "./utils/queryutil";
const knopGebruiker: HTMLButtonElement = document.getElementById("submit") as HTMLButtonElement;
knopGebruiker.addEventListener("click", zetIn);

//de id ophalen uit de url
const currentURL: string = window.location.href;
//opslaan in een string
const IdOphalen: URL = new URL(currentURL);
//gelijk zetten aan de searchparams.
const id: string | null = IdOphalen.searchParams.get("id");

// runquery oproepen en data ophalen door een const aan te maken die alles kan pakken
const resultaat: any[] | undefined = await runQuery("SELECT * FROM event WHERE eventId = (?)", [id]);

//alle gebruikers laten zien voor dropdown
const resultaat2: any[] | undefined = await runQuery("SELECT * FROM user");

const link: any = resultaat[0];

async function laatZien(): Promise<void> {
    //data opslaan in de div
    const data: HTMLElement | null = document.getElementById("uitje");

    const data2: HTMLElement | null = document.getElementById("namen");

    //naar wijzig uitje gaan
    const linkAanpas: HTMLAnchorElement = document.createElement("a");
    linkAanpas.id = "wijzig";
    linkAanpas.textContent = "Wijzig uitje";
    linkAanpas.href = `uitjebewerk.html?id=${link.eventId}`;

    const paragraaf: HTMLElement | null = document.createElement("p");
    paragraaf.textContent = `Soort Uitje: ${link.description}`;

    //uitje op scherm laten zien
    if (resultaat && resultaat.length > 0) {
        resultaat.forEach((row: any) => {
            //div maken voor de data
            const div: HTMLElement | null = document.createElement("div");
            div.style.display = "flex";

            //paragraaf voor naam van uitje
            const paragraaf: HTMLElement | null = document.createElement("p");
            paragraaf.id = "uitjeNaam";
            paragraaf.textContent = `Naam van uitje: ${row.description}`;

            //paragraaf voor prijs van uitje
            const paragraaf2: HTMLElement | null = document.createElement("p");
            paragraaf2.id = "uitjePrijs";
            paragraaf2.textContent = `Prijs van uitje: ${row.price}`;

            //namen ophalen voor label vanuit de database
            if (resultaat2 && resultaat2.length > 0) {
                resultaat2.forEach((gebruiker: any) => {
                    const label: HTMLElement | null = document.createElement("option");
                    label.textContent = `${gebruiker.username}`;

                    data2?.appendChild(label);
                });
            }
            div.appendChild(linkAanpas);
            div.appendChild(paragraaf);
            div.appendChild(paragraaf2);
            data?.appendChild(div);
        });
    }
}

//functie om naam in database te zetten aan uitje
async function zetIn(): Promise<void> {
    const naaminput: HTMLInputElement | null = document.getElementById("namen") as HTMLInputElement;

    const naam: string = naaminput.value;

    console.log(naam);

    //inserten in database
    await runQuery("INSERT INTO participant (eventId, name) VALUES (?)", [id, naam]);
    alert(naam + " is succesvol toegevoegd aan het uitje.");
}

laatZien();
