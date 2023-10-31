# documentatie uitje

/////////////////////////////////////////////UITJE IN DATABASE ZETTEN/////////////////////////////////////////////////
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

<details>
<summary>laatZien functie</summary>
#uitjes laten zien

async function laatZien(): Promise<void> {}

Met bovenstaande functie

</details>