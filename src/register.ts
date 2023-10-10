import { runQuery } from "./utils/queryutil";

const registreer:HTMLButtonElement = document.getElementById("button_registreer") as HTMLButtonElement; 
registreer.addEventListener("click", zetIn);

async function zetIn(): Promise<void> {

    //email wachtwoord en gebruikersnaam ophalen uit de form
    const emailInput: HTMLInputElement = document.getElementById("email") as HTMLInputElement;
    const passwordInput: HTMLInputElement | null = document.getElementById("password") as HTMLInputElement;
    const usernameInput: HTMLInputElement | null = document.getElementById("username") as HTMLInputElement;
  
    //variabelen gelijk zetten
    const email: string = emailInput.value;
    const password: string = passwordInput.value;
    const username: string = usernameInput.value;
    if (emailInput && passwordInput && usernameInput) {
  
      // de form in console log zetten om te checken of het werkt
      console.log("Email:", email);
      console.log("password:", password);
      console.log("username:", username);
    } else {
      console.error("One or more input fields not found");
    }
    
    //insert in de database
    await runQuery("INSERT INTO user (email, password, username) VALUES (?)", [email, password, username]);


}