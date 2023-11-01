# documentatie Registreren

<details>
<summary>functie ZetIn()</summary>
<details>
<summary>Input velden</summary>
<code>
    const emailInput: HTMLInputElement = document.getElementById("email") as HTMLInputElement;
    const passwordInput: HTMLInputElement | null = document.getElementById("password") as HTMLInputElement;
    const usernameInput: HTMLInputElement | null = document.getElementById("username") as HTMLInputElement;
</code>

Met bovenstaande code maak ik drie variabelen aan. Deze variabelen maak ik gelijk aan de Id in het HTML element.

</details>

<details>
<summary>variabelen gelijk zetten</summary>
<code>
    //variabelen gelijk zetten
    const email: string = emailInput.value;
    const password: string = passwordInput.value;
    const username: string = usernameInput.value;
</code>

Met bovenstaande code maak ik een nieuwe variable waar de input gelijk staat aan de nieuwe variabelen.

</details>
<details>
<summary>Kijken of input leeg is</summary>
<code>
  //met trim kijkt die of de string leeg is 
    if (!email.trim() || !password.trim() || !username.trim()) {
      alert("Een of meerdere gegevens niet ingevuld.");
    } else {
        alert("Succesvol registreerd.");
    }
    </code>

Met deze code kijk ik of een van de input velden leeg zijn. Als dat zo het geval is krijg je een alert dat een paar gegevens niet zijn ingevuld. Zo niet gaat die naar de else statement en krijg je een alert dat het succesvol is gelukt.

</details>
