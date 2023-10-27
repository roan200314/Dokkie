// import "./hboictcloud-config";

// /**
//  * Entry point
//  */
// function app() {
//     console.log("Hello world from JavaScript!");
// }
function navbarResponsive() {
    const x = document.getElementById("mynavbar");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}

function navbarOnly() {
    const nav = document.getElementById("mynavbar");
    const h1 = document.getElementById("onderwerp"); 
    if (nav.className === "navbar responsive") {
        h1.style.display = "none";
    }
}
// app();
