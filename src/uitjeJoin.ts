import { runQuery } from "./utils/queryutil";

// Selecteer de knop om een gebruiker toe te voegen aan een uitje en voeg een click-eventlistener toe.
const knopGebruiker: HTMLButtonElement = document.getElementById("submit") as HTMLButtonElement;
knopGebruiker.addEventListener("click", zetIn);

// Haal de ID op uit de URL.
const currentURL: string = window.location.href;
const IdOphalen: URL = new URL(currentURL);
const id: string | null = IdOphalen.searchParams.get("id");

// Haal gegevens op uit de database voor het specifieke uitje.
const resultaat: any[] | undefined = await runQuery("SELECT * FROM event WHERE eventId = (?)", [id]);

// Haal alle gebruikers op om weer te geven in een dropdown.
const resultaat2: any[] | undefined = await runQuery("SELECT * FROM user");

// Definieer variabelen voor het uitje en de gebruikers.
const link: any = resultaat[0];
const user: any = resultaat2[0];

// Functie om gegevens weer te geven.
async function laatZien(): Promise<void> {
    // Data opslaan in de div voor het uitje.
    const data: HTMLElement | null = document.getElementById("uitje");

    // Data opslaan in de div voor de namen.
    const data2: HTMLElement | null = document.getElementById("namen");

    // Link om het uitje te wijzigen.
    const linkAanpas: HTMLAnchorElement = document.createElement("a");
    linkAanpas.id = "wijzig";
    linkAanpas.textContent = "Wijzig uitje";
    linkAanpas.href = `uitjebewerk.html?id=${link.eventId}`;

    // Paragraaf om de naam van het uitje weer te geven.
    const paragraaf: HTMLElement | null = document.createElement("input");
    paragraaf.textContent = `Soort Uitje: ${link.description}`;
    paragraaf.disabled = true;

    if (resultaat && resultaat.length > 0) {
        resultaat.forEach((row: any) => {
            // Div aanmaken voor de gegevens.
            const div: HTMLElement | null = document.createElement("div");
            div.style.display = "flex";

            // Paragraaf voor de naam van het uitje.
            const paragraaf: HTMLElement | null = document.createElement("input");
            paragraaf.id = "uitjeNaam";
            paragraaf.disabled = true;
            paragraaf.value = `Naam van uitje: ${row.description}`;

            // Paragraaf voor de prijs van het uitje.
            const paragraaf2: HTMLElement | null = document.createElement("input");
            paragraaf2.id = "uitjePrijs";
            paragraaf2.disabled = true;
            paragraaf2.value = `Prijs van uitje: ${row.price}`;

            // Namen ophalen uit de database voor het label.
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

// Functie om een naam aan het uitje toe te voegen in de database.
async function zetIn(): Promise<void> {
    const naaminput: HTMLInputElement | null = document.getElementById("namen") as HTMLInputElement;

    const naam: string = naaminput.value;

    // Toevoegen aan de database.
    await runQuery("INSERT INTO participant (eventId, name, userId) VALUES (?)", [
        id,
        naam,
        `${user.userId}`,
    ]);
    alert(naam + " is succesvol toegevoegd aan het uitje.");
}

// Roep de functie aan om gegevens weer te geven.
laatZien();
