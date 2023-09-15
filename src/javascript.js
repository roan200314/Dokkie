// import "./hboictcloud-config";

// /**
//  * Entry point
//  */
// function app() {
//     console.log("Hello world from JavaScript!");
// }
function myFunction() {
    const x = document.getElementById("mynavbar");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}

app();
