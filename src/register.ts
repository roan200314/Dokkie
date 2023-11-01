import { runQuery } from "./utils/queryutil";

const registreer: HTMLButtonElement = document.getElementById("button_registreer") as HTMLButtonElement;
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
    //met trim kijkt die of de string leeg is 
    if (!email.trim() || !password.trim() || !username.trim()) {
      alert("Een of meerdere gegevens niet ingevuld.");
    } else {
      //insert in de database
        alert("Succesvol registreerd.");
        await runQuery("INSERT INTO user (email, password, username) VALUES (?)", [email, password, username]);
    }

}
