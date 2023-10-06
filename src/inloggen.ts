import { runQuery } from "./utils/queryutil";

const inloggen:HTMLButtonElement = document.getElementById("loginButton") as HTMLButtonElement; 
inloggen.addEventListener("click", ophalen);

async function ophalen(): Promise<void> {
   
    //email en wachtwoord ophalen
    const emailInput: HTMLInputElement = document.getElementById("email") as HTMLInputElement;
    const passwordInput: HTMLInputElement = document.getElementById("password") as HTMLInputElement;

    const email: string = emailInput.value;
    const password: string = passwordInput.value;

    console.log(email, password);
    // const resultaat: any[] | undefined = await runQuery("SELECT * FROM user WHERE email = " + [email] + " LIMIT 1");

    // console.log(resultaat);
 }