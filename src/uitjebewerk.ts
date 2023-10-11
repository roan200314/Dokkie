import { runQuery } from "./utils/queryutil";
   

async function laatZien(): Promise<void> {
    
    const currentURL: string = window.location.href;
    const IdOphalen: URL= new URL(currentURL);
    const id: string | null = IdOphalen.searchParams.get("id");



   // runquery oproepen en data ophalen door een const aan te maken die alles kan pakken
   const resultaat: any[] | undefined = await runQuery("SELECT * FROM event WHERE eventId = (?)", [id]);

   console.log(resultaat);

}

laatZien();