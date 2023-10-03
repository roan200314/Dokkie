import { runQuery } from "./utils/queryutil";

const registeer:HTMLButtonElement = document.getElementById("button_registreer") as HTMLButtonElement; 
registeer.addEventListener("click", zetIn);

async function zetIn(): Promise<void> {

    const emailInput: HTMLInputElement | null = document.getElementById("email");
    const passwordInput: HTMLInputElement | null = document.getElementById("password");
    const usernameInput: HTMLInputElement | null = document.getElementById("username");
  
    const email: string = emailInput.value;
    const password: string = passwordInput.value;
    const username: string = usernameInput.value;
    if (emailInput && passwordInput && usernameInput) {
  
      // Log the form data to the console
      console.log("Email:", email);
      console.log("password:", password);
      console.log("username:", username);
    } else {
      console.error("One or more input fields not found");
    }
    
    await runQuery("INSERT INTO user (email, password, username) VALUES (?)", [email, password, username]);


}