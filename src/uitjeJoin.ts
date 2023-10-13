import { runQuery } from "./utils/queryutil";
   

async function laatZien(): Promise<void> {
    
   //data opslaan in de div
   const data: HTMLElement | null = document.getElementById("uitje");
    
    //de id ophalen uit de url
    const currentURL: string = window.location.href;
    //opslaan in een string
    const IdOphalen: URL= new URL(currentURL);
    //gelijk zetten aan de searchparams.
    const id: string | null = IdOphalen.searchParams.get("id");



   // runquery oproepen en data ophalen door een const aan te maken die alles kan pakken
   const resultaat: any[] | undefined = await runQuery("SELECT * FROM event WHERE eventId = (?)", [id]);

   console.log(resultaat);

   if (resultaat && resultaat.length > 0) {
    resultaat.forEach((row: any) => {

        //div maken voor de data
    const div: HTMLElement | null = document.createElement("div");
    div.style.display = "flex";

    //paragraaf voor naam van uitje
   const paragraaf: HTMLElement | null = document.createElement("p");
   paragraaf.textContent = `Naam van uitje: ${row.description}`;
   paragraaf.style.marginRight = "15px";

   //paragraaf voor prijs van uitje
   const paragraaf2: HTMLElement | null = document.createElement("p");
   paragraaf2.textContent = `Prijs van uitje: ${row.price}`;

   div.appendChild(paragraaf);
   div.appendChild(paragraaf2);
   data.appendChild(div);
    });
}
}
laatZien();