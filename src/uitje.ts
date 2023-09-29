import { runQuery } from "./utils/queryutil";

const knopUitjeAanmake:HTMLButtonElement = document.getElementById("buttton_uitje") as HTMLButtonElement; 
knopUitjeAanmake.addEventListener("click", zetIn);


async function zetIn(): Promise<void> {
    // Get the form input values
    const emailInput: HTMLElement | null = document.getElementById("email");
    const uitjeInput: HTMLElement | null = document.getElementById("uit");
    const prijsInput: HTMLElement | null = document.getElementById("prijs");
  
    if (emailInput && uitjeInput && prijsInput) {
      const email: string = emailInput;
      const uitje: string = uitjeInput;
      const prijs: string = prijsInput;
  
      // Log the form data to the console
      console.log("Email:", email);
      console.log("Uitje:", uitje);
      console.log("Prijs:", prijs);
    } else {
      console.error("One or more input fields not found");
    }
    
    await runQuery("INSERT INTO event (description) VALUES ('uitje')");
  }
  
  
  

// async function db(params:type) {

//     const query: string = "INSERT INTO payment (name, email, password, salt) VALUES (?)";
//     const values: string[] = [user.username, user.email, user.password, user.salt];

// await runQuery(query, values);
// }

