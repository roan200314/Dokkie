import { runQuery } from "./utils/queryutil";
   

async function laatZien(): Promise<void> {
    
   // runquery oproepen en data ophalen door een const aan te maken die alles kan pakken
   const resultaat: any[] | undefined = await runQuery("SELECT * FROM event WHERE eventId = (?)", );

   console.log(resultaat);

}