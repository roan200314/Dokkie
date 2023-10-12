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

   const paragraaf: HTMLElement | null = document.createElement("p");
   paragraaf.textContent = `Naam van uitje: ${row.description}`;

   data.appendChild(paragraaf);
    });
}
}
laatZien();