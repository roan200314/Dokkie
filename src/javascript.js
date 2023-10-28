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
        navbarOnly();
    } else {
        x.className = "navbar";
        navbarOnly();
    }
}

function navbarOnly() {
    const nav = document.getElementById("mynavbar");
    const h1 = document.getElementById("container");

    if (nav.classList.contains("responsive")) {
        h1.style.display = "none";
        console.log("hi");
    } else {
        h1.style.display = "block";
    }
}


// app();
