# documentatie uitje

<details>
<summary>Uitje in db zetten</summary>
<code>
import { runQuery } from "./utils/queryutil";

const knopUitjeAanmake:HTMLButtonElement = document.getElementById("buttton_uitje") as HTMLButtonElement;
knopUitjeAanmake.addEventListener("click", zetIn);

const knopUitjeZien:HTMLButtonElement = document.getElementById("uitjeZien") as HTMLButtonElement;
knopUitjeZien.addEventListener("click", laatZien);

async function zetIn(): Promise<void> {
//een uitje aanmaken
const uitjeInput: HTMLInputElement | null = document.getElementById("uit");
const prijsInput: HTMLInputElement | null = document.getElementById("prijs");

// Form input velden opslaan
const uitje: string = uitjeInput.value;
const prijs: string = prijsInput.value;
if (uitjeInput && prijsInput) {

      // data in console zetten om te checken
      console.log("Uitje:", uitje);
      console.log("Prijs:", prijs);
    } else {
      console.error("One or more input fields not found");
    }

    //inserten in database
    await runQuery("INSERT INTO event (description, price) VALUES (?)", [uitje, prijs]);

}
</code>

Om een uitje in mijn database te zetten. Dit heb ik gedaan coor een knop aan te maken die hij dan ophaald met de ID van de knop in de HTML. Vervolgens zit er dan een event op "click", met de naam zetIn().

Vervolgens is er een functie zetIn(); hierin heb ik de inputs gedefinieerd en een constante eraan vast gezet. vervolgens heb ik de query: await runQuery("INSERT INTO event (description, price) VALUES (?)", [uitje, prijs]);

Met deze query inject hij de bovenstaande data in de database.
</details>


<details>
<summary>laatZien functie</summary>
<code>
async function laatZien(): Promise<void> {

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
</code>

Met bovenstaande functie naam heb ik ervoor gezorgd dat met een knopje alle uitjes worden laten zien.
vervolgens is er een forEach statement die ervoor zorgt dat die door alle uitjes loopt. Daarbij heb ik een div, waarin 2 buttons, 2 paragrafen zitten. hij kijkt dan of resultaat en waarde heeft. Als dat zo is voert die de functie uit, zo niet krijg je een "Geen gegevens gevonden" tekst te zien.

</details>
