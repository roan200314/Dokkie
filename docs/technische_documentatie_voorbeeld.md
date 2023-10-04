# Technische documentatie

Beschrijf hier wat je geleerd hebt op gebied van de beroepscriteria uit de opdracht(zie de Wiki). Je kunt stukken code toevoegen, maar ook afbeeldingen, diagrammen. Je docent geeft je nog extra informatie over de technische documentatie!

# documentatie

Eerste week heb ik vooral besteed aan de landingspagina. Zo was ik met losse pols begonnen met programmeren. Ik had al eerst een grid container gemaakt om mijn gegevens in te zetten. Daarna was ik verder gegaan met de CSS van de website. Daarna had ik de connectie gemaakt met de database en de database geimporteerd in PHPmyAdmin. Zo was ik klaar met mijn eerste userstory.

Tweede week ben ik bezig geweest met het responisive maken en teksten op het scherm te zetten. 
Ook ben ik begonnen met een pagina maken om een uitje op het scherm te zetten. 

- Begonnen met logica

Ik heb toen de typscript documenten aangemaakt om te gaan beginnen met logica. Dit hbe ik aangepakt door eerst te leren te komen wat voor taal Typescript is. Zo heb ik eerst video's bekeken en online gekeken waar Typescript op lijkt en hoe je basis functies maakt. 

Ik had toen een 'utils' mapje aangemaakt waarin ik een queryutil.ts heb toegevoegd. Met dit als code:

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

<code>
import { runQuery } from "./utils/queryutil";

const knopUitjeAanmake:HTMLButtonElement = document.getElementById("buttton_uitje") as HTMLButtonElement; 
knopUitjeAanmake.addEventListener("click", zetIn);

const knopUitjeZien:HTMLButtonElement = document.getElementById("uitjeZien") as HTMLButtonElement; 
knopUitjeZien.addEventListener("click", laatZien);


async function zetIn(): Promise<void> {
  //een uitje aanmaken
  const emailInput: HTMLInputElement | null = document.getElementById("email");
  const uitjeInput: HTMLInputElement | null = document.getElementById("uit");
  const prijsInput: HTMLInputElement | null = document.getElementById("prijs");

  // Form input velden opslaan
    const email: string = emailInput.value;
    const uitje: string = uitjeInput.value;
    const prijs: string = prijsInput.value;
    if (emailInput && uitjeInput && prijsInput) {
  
      // data in console zetten om te checken
      console.log("Email:", email);
      console.log("Uitje:", uitje);
      console.log("Prijs:", prijs);
    } else {
      console.error("One or more input fields not found");
    }

    //inserten in database
    await runQuery("INSERT INTO event (description, price) VALUES (?)", [uitje, prijs]);   
  }
</code>

Om een uitje in mijn database te zetten. 
