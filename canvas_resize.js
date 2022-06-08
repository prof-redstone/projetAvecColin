var canvas = document.getElementById("PongGame");
var ctx = canvas.getContext("2d");

window.addEventListener("resize", Resize);

let screenH = window.innerHeight;
let screenW = window.innerWidth;

let ratioCanvas = canvas.width / canvas.height;
let ratioScreen = screenW / screenH;

function Resize() {
    screenH = window.innerHeight;
    screenW = window.innerWidth;
    ratioScreen = screenW / screenH;

    if (ratioCanvas > ratioScreen) {
        //marge en haut et en bas, canvas 100% de la longueur de la fenettre
        canvas.style.height = "auto";
        canvas.style.left = "0";
        canvas.style.transform = "unset";
        canvas.style.width = "100%";
        canvas.style.top = "50%";
        canvas.style.transform = "translateY(-50%)";
    }
    if (ratioCanvas < ratioScreen) {
        //marge à gauche et à droite, canvas 100% de la hauteur de la fenettre
        canvas.style.width = "auto";
        canvas.style.top = "0";
        canvas.style.transform = "unset";
        canvas.style.height = "100%";
        canvas.style.left = "50%";
        canvas.style.transform = "translateX(-50%)";
    }
}

Resize();
