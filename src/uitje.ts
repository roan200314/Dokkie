import { runQuery } from "./utils/queryutil";

function zetIn(): void {
    // Get the form input values
    const emailInput: HTMLInputElement | null = document.getElementById("email");
    const uitjeInput: HTMLInputElement | null = document.getElementById("uit");
    const prijsInput: HTMLInputElement | null = document.getElementById("prijs");
  
    if (emailInput && uitjeInput && prijsInput) {
      const email: string = emailInput.value;
      const uitje: string = uitjeInput.value;
      const prijs: string = prijsInput.value;
  
      // Log the form data to the console
      console.log("Email:", email);
      console.log("Uitje:", uitje);
      console.log("Prijs:", prijs);
    } else {
      console.error("One or more input fields not found");
    }
  }
  
  
  
  

// async function db(params:type) {

//     const query: string = "INSERT INTO payment (name, email, password, salt) VALUES (?)";
//     const values: string[] = [user.username, user.email, user.password, user.salt];

// await runQuery(query, values);
// }

