import { runQuery } from "./utils/queryutil";

async function laatZien(): Promise<void> {
    const currentURL: string = window.location.href;
    const IdOphalen: URL = new URL(currentURL);
    const id: string | null = IdOphalen.searchParams.get("id");

    // runquery oproepen en data ophalen door een const aan te maken die alles kan pakken
    const resultaat: any[] | undefined = await runQuery("SELECT * FROM event WHERE eventId = (?)", [id]);
    const resultaat2: any[] | undefined = await runQuery("SELECT * FROM participant WHERE eventId = (?)", [
        id,
    ]);

    //data opslaan in de div
    const data: HTMLElement | null = document.getElementById("uitje");

    //uitje op scherm laten zien
    if (resultaat && resultaat.length > 0) {
        resultaat.forEach((row: any) => {
            //div maken voor de data
            const div: HTMLElement | null = document.createElement("div");
            div.style.display = "flex";

            //paragraaf voor naam van uitje
            const paragraaf: HTMLElement | null = document.createElement("p");
            paragraaf.textContent = `Naam van uitje: ${row.description}`;
            paragraaf.style.marginRight = "15px";
            paragraaf.style.position = "absolute";
            paragraaf.style.left = "350px";
            paragraaf.style.bottom = "479px";

            //paragraaf voor prijs van uitje
            const paragraaf2: HTMLElement | null = document.createElement("p");
            paragraaf2.textContent = `Prijs van uitje: ${row.price}`;
            paragraaf2.style.position = "absolute";
            paragraaf2.style.left = "350px";
            paragraaf.style.bottom = "408px";

            div.appendChild(paragraaf);
            div.appendChild(paragraaf2);
            data?.appendChild(div);
        });
    }
    if (resultaat2 && resultaat2.length > 0) {
        resultaat2.forEach((row: any) => {
            //div maken voor de data
            const div: HTMLElement | null = document.createElement("div");
            div.style.display = "flex";

            //paragraaf voor namen van het uitje
            const paragraaf: HTMLElement | null = document.createElement("p");
            paragraaf.textContent = `Mensen bij het uitje: ${row.name}`;
            paragraaf.style.marginRight = "15px";
            paragraaf.style.position = "absolute";
            paragraaf.style.left = "350px";
            paragraaf.style.bottom = "479px";

            div.appendChild(paragraaf);
            data?.appendChild(div);
        });
    }
}
laatZien();
