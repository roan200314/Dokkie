import { runQuery } from "./utils/queryutil";

async function zetIn(): Promise<void> {

    const emailInput: HTMLElement | null = document.getElementById("email");
    const passwordInput: HTMLElement | null = document.getElementById("password");
    const usernameInput: HTMLElement | null = document.getElementById("username");
  
    if (emailInput && passwordInput && usernameInput) {
      const email: string = emailInput;
      const password: string = passwordInput;
      const username: string = usernameInput;
  
      // Log the form data to the console
      console.log("Email:", email);
      console.log("password:", password);
      console.log("username:", username);
    } else {
      console.error("One or more input fields not found");
    }
    
    await runQuery("INSERT INTO event (user) VALUES ('email'), ('password'), ('username')");

}