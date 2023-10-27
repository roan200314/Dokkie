# Technische documentatie

Beschrijf hier wat je geleerd hebt op gebied van de beroepscriteria uit de opdracht(zie de Wiki). Je kunt stukken code toevoegen, maar ook afbeeldingen, diagrammen. Je docent geeft je nog extra informatie over de technische documentatie!

# documentatie

Eerste week heb ik vooral besteed aan de landingspagina. Zo was ik met losse pols begonnen met programmeren. Ik had al eerst een grid container gemaakt om mijn gegevens in te zetten. Daarna was ik verder gegaan met de CSS van de website. Daarna had ik de connectie gemaakt met de database en de database geimporteerd in PHPmyAdmin. Zo was ik klaar met mijn eerste userstory.

Tweede week ben ik bezig geweest met het responisive maken en teksten op het scherm te zetten.
Ook ben ik begonnen met een pagina maken om een uitje op het scherm te zetten.


<!-- KLEUREN PAGINA'S################################################ -->
Ik heb voor mijn pagina's de volgende kleuren vooral gebruikt:

<code>
background-color: #e8e8e8;
en
color: #5c20a1;
</code>

Deze kleuren heb ik gekozen, omdat ik ongeveer dezelfde kleuren wilde gebruiken als Tikkie.  

<!-- EINDE KLEUREN PAGINA -->

<!-- FAVICON DOCUMENTATIE -->

Ik heb de FavIcon met een website gemaakt genaamd: https://favicon.io/favicon-generator/
Hierbij heb ik gekozen voor dezelfde kleuren als mijn pagina, en heb ik de letter D erbij gezet van Dokkie.

<!-- EINDE FAVICON -->


-   Begonnen met logica

Ik heb toen de typscript documenten aangemaakt om te gaan beginnen met logica. Dit hbe ik aangepakt door eerst te leren te komen wat voor taal Typescript is. Zo heb ik eerst video's bekeken en online gekeken waar Typescript op lijkt en hoe je basis functies maakt.

Ik had toen een 'utils' mapje aangemaakt waarin ik een queryutil.ts heb toegevoegd. Met dit als code:

////////////////////////////////CONNECTIE DATABASE/////////////////////////////
<code>
import { api } from "@hboictcloud/api";
import "../hboictcloud-config";

export async function runQuery(query: string, params?: Array<any>): Promise<Array<any> | undefined> {
try {
return (await api.queryDatabase(query, params)) as Array<any>;
} catch (error) {
console.error(error);
}

    return undefined;

}
</code>

Met deze code heb ik een manier gemaakt waarin ik alleen de code hoef aan te roepen om een query in mijn database te zetten.

Vervolgens heb ik deze code gebruikt:

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

<!-- ---------------------------------------- -->

<code>
const event: any[] = (await runQuery("SELECT * FROM event WHERE eventId = (?)", [id])) as any;

const uitjeDB: any = event[0];
</code>

Met bovenstaande code haal je alles op uit de database uit de tabel event, en met 'uitjeDB' wordt de eerste regel opgehaald waar de <code> [id] </code> bij hoort.