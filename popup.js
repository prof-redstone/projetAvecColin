var popup = document.getElementById("PopupClick");
var open = false;

function PopupHide() {
    //hide popup click element
    popup.style.transitionDuration = "0.7s";
    popup.style.opacity = 0;
}

function PopupShow() {
    //show popup click element
    popup.style.transitionDuration = "0.1s";
    popup.style.opacity = 1;
}

setTimeout(() => {
    //when page is load wait 3 sec to hide popup
    PopupHide();
}, 3000);

popup.addEventListener("mouseover", () => {
    //show popup when mousse hover
    if (open == false) {
        PopupShow();
    }
});

popup.addEventListener("mouseleave", () => {
    //hide popup when mousse leave hoevr
    PopupHide();
});

popup.addEventListener("click", () => {
    //execute when click on popup
    open = true;
    openSettings();
});

function openSettings() {
    //open a popup menu with settings
    PopupHide();
    SettingsShow();
    //show popup settings menu
}

var settings = document.getElementById("settings");
var selectFPS = document.getElementById("selectFPS");

selectFPS.addEventListener("change", (event) => {
    console.log("FPS : " + event.target.value);
    FPS = event.target.value;
    clearInterval(IntervalTime);
    IntervalTime = setInterval(Frame, 1000 / FPS);
});

function SettingsShow() {
    settings.style.display = "block";
}

function Settingshide() {
    settings.style.display = "none";
}

function btnCloseSettings() {
    Settingshide();
    open = false;
}
