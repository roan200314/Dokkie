import { runQuery } from "./utils/queryutil";

const knopUitjeAanmake:HTMLButtonElement = document.getElementById("buttton_uitje") as HTMLButtonElement; 
knopUitjeAanmake.addEventListener("click", zetIn);

const knopUitjeZien:HTMLButtonElement = document.getElementById("uitjeZien") as HTMLButtonElement; 
knopUitjeZien.addEventListener("click", laatZien);


async function zetIn(): Promise<void> {
  const emailInput: HTMLInputElement | null = document.getElementById("email");
  const uitjeInput: HTMLInputElement | null = document.getElementById("uit");
  const prijsInput: HTMLInputElement | null = document.getElementById("prijs");
  // Get the form input values
  
    const email: string = emailInput.value;
    const uitje: string = uitjeInput.value;
    const prijs: string = prijsInput.value;
    if (emailInput && uitjeInput && prijsInput) {
  
      // Log the form data to the console
      console.log("Email:", email);
      console.log("Uitje:", uitje);
      console.log("Prijs:", prijs);
    } else {
      console.error("One or more input fields not found");
    }
    
    await runQuery("INSERT INTO event (description) VALUES (?)", [uitje]);

    
  }


  async function laatZien(): Promise<void> {

    await runQuery("SELECT * FROM event");

      console.log();
   }
  
  

// async function db(params:type) {

//     const query: string = "INSERT INTO payment (name, email, password, salt) VALUES (?)";
//     const values: string[] = [user.username, user.email, user.password, user.salt];

// await runQuery(query, values);
// }

