# Technische documentatie

Beschrijf hier wat je geleerd hebt op gebied van de beroepscriteria uit de opdracht(zie de Wiki). Je kunt stukken code toevoegen, maar ook afbeeldingen, diagrammen. Je docent geeft je nog extra informatie over de technische documentatie!

# documentatie

Eerste week heb ik vooral besteed aan de landingspagina. Zo was ik met losse pols begonnen met programmeren. Ik had al eerst een grid container gemaakt om mijn gegevens in te zetten. Daarna was ik verder gegaan met de CSS van de website. Daarna had ik de connectie gemaakt met de database en de database geimporteerd in PHPmyAdmin. Zo was ik klaar met mijn eerste userstory.

Tweede week ben ik bezig geweest met het responisive maken en teksten op het scherm te zetten.
Ook ben ik begonnen met een pagina maken om een uitje op het scherm te zetten.

<!-- KLEUREN PAGINA'S################################################ -->

Ik heb voor mijn pagina's de volgende kleuren vooral gebruikt:

Voor de homepagina heb ik:
<code>
background-color: #e8e8e8;
</code>
en
<code>
color: #5c20a1;
</code>

voor de andere pagina's heb ik background-color:
<code>
background-color: #eddbda;
</code>

voor de form kleur heb ik gekozen voor:
<code>
background-color: #5c20a1;
</code>

en voor de tekst had ik eerst zwart gekozen, vervolgens had ik een contrast test gedaan op de website:

https://dequeuniversity.com/rules/axe/4.7/color-contrast

Hieruit was gebleken dat mijn kleuren combinatie niet gebruiksvriendelijk waren. Hierdoor heb ik gekozen om de tekst wit te maken en de form kleur iets lichter te maken. 


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

hier wordt dus eerst een connectie gemaakt met mijn database door de import.

vervolgens maak ik een asynchronische functie die 2 parameters op kan nemen.'query' en 'params'.
Als het niet succesvol is gegaan gaat de functie door naar de catch en krijg je een console error te zien.



