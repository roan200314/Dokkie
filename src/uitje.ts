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

  async function laatZien(): Promise<void> {
    
    //data opslaan in de div
    const data: HTMLElement | null = document.getElementById("uitjeTest");
    
    
      const div: HTMLElement | null = document.createElement("div");
      //paragraaf aanmaken
      const paragraph: HTMLElement | null = document.createElement("p");
      const paragraph2: HTMLElement | null = document.createElement("p");
      //knop aanmaken
      const buttonJoin: HTMLElement | null = document.createElement("button");
      
      
      // runquery oproepen en data ophalen door een const aan te maken die alles kan pakken
      const resultaat: any[] | undefined = await runQuery("SELECT * FROM event");


      if (resultaat && resultaat.length > 0) {
        resultaat.forEach((row: any) => {
        paragraph.textContent = `Event Description: ${row.description}`;
        paragraph2.textContent = `Event price: ${row.price}`;
        buttonJoin.textContent = "Join dit uitje!";

        data.appendChild(div);
        data.appendChild(paragraph);
        data.appendChild(paragraph2);
        data.appendChild(buttonJoin);


        });


      console.log(resultaat);
    
    }
  }

  
  

// async function db(params:type) {

//     const query: string = "INSERT INTO payment (name, email, password, salt) VALUES (?)";
//     const values: string[] = [user.username, user.email, user.password, user.salt];

// await runQuery(query, values);
// }

