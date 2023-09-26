import { runQuery } from "./utils/queryutil";

function uitje() :void {
    
    const uitje: HTMLFormElement = document.getElementById("formUitje") as HTMLFormElement;
    uitje.addEventListener("submit", async (event) => { 

        // Remove error message if exists
        document.getElementById("error")?.remove();

        // Get form data
        const formData: FormData = new FormData(uitje);
        const formDataObject: { [key: string]: string } = {};

        // Convert formData to a JavaScript object
        formData.forEach((value, key) => {
            formDataObject[key] = value as string;
    });

    const email: string = formDataObject["email"];
    const uit: string = formDataObject["uit"];
    const prijs: string = formDataObject["prijs"];




});

}

// async function db(params:type) {

//     const query: string = "INSERT INTO payment (name, email, password, salt) VALUES (?)";
//     const values: string[] = [user.username, user.email, user.password, user.salt];

// await runQuery(query, values);
// }


uitje();