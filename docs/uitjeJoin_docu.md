# documentatie

<details>
<summary>Id ophalen</summary>
<code>
// Haal de ID op uit de URL.
const currentURL: string = window.location.href;
const IdOphalen: URL = new URL(currentURL);
const id: string | null = IdOphalen.searchParams.get("id");
</code>
Met bovenstaande code haal ik de id op die ik in de url heb dit doet die door mijn URL op te halen en in een string te zetten. Vervolgens zoekt die in de 'currentURL' of het woord 'id' voorkomt. Zo ja maakt die daar een id van. Hierdoor is het simpel om het op te sturen.
</details>

<details>
<summary>Gegevens van de database</summary>
<code>
// Haal gegevens op uit de database voor het specifieke uitje.
const resultaat: any[] | undefined = await runQuery("SELECT * FROM event WHERE eventId = (?)", [id]);

// Haal alle gebruikers op om weer te geven in een dropdown.
const resultaat2: any[] | undefined = await runQuery("SELECT * FROM user");

// Definieer variabelen voor het uitje en de gebruikers.
const link: any = resultaat[0];
const user: any = resultaat2[0];
</code>

Met bovenstaande code haal ik alle gegevens op van de tabel:
event en user.
Vervolgens Maak ik een variabel om de resultaten in te zetten hierdoor kan ik ze simpeler oproepen in het vervolg.
</details>


<details>
<summary>Functie LaatZien()</summary>
<details>
<summary>Link aanmaken</summary>
<code>
   const linkAanpas: HTMLAnchorElement = document.createElement("a");
    linkAanpas.id = "wijzig";
    linkAanpas.textContent = "Wijzig uitje";
    linkAanpas.href = `uitjebewerk.html?id=${link.eventId}`;
</code>
Met bovenstaande code maak ik een 'a href' element aan waar ik vervolgens text in plaats, en ten slotte een a href in zet. aan het einde van me a href zet ik een id vast zodat die op de volgende pagina opgehaald kan worden.
</details>



<details>
<summary>ForEach statement</summary>
<code>   
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
    </code>

Met bovenstaande code heb ik ervoor gezorgd dat bij het inladen van de pagina de gegevens worden laten zien van het uitje dat is aangeklikt. Zo heb ik een foreach waarin ik alle gegevens oproep die ik nodig heb om de gegevens uit de database op het scherm te zetten. Zo maak ik ook nog paragraven en zet ik daar tekst aan vast en ook bij knoppen.
</details>
</details>

<details>
<summary>Functie ZetIn()</summary>
<code>  
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
</code>

Met bovenstaande functie zet ik de gegevens in de database.
Zo bij het inzetten de eventId kunnen ophalen door de URL link, de name door de dropdown tabel, en de userid door het ophalen van alle gegevens van user. Als dat succesvol is gelukt krijg je een alert dat 'gebruiker' is toegevoegdaan het uitje.
</details>
