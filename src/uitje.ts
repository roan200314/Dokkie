import { api, session, url } from "@hboictcloud/api";

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

uitje();