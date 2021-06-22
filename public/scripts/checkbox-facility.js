function checkFacility(){
    if(!document.getElementById("ecoMeal").checked) {
        document.querySelector("#ecoNoMeal").removeAttribute("disabled");
    }
    if(!document.getElementById("ecoEntertain").checked) {
        document.querySelector("#ecoNoEntertain").removeAttribute("disabled");
    }
    if(document.getElementById("ecoWifi").checked) {
        document.querySelector("#ecoNoWifi").removeAttribute("disabled");
    }
    if(document.getElementById("ecoUsb").checked) {
        document.querySelector("#ecoNoUsb").removeAttribute("disabled");
    }

    if(!document.getElementById("busMeal").checked) {
        document.querySelector("#busNoMeal").removeAttribute("disabled");
    }
    if(!document.getElementById("busEntertain").checked) {
        document.querySelector("#busNoEntertain").removeAttribute("disabled");
    }
    if(document.getElementById("busWifi").checked) {
        document.querySelector("#busNoWifi").removeAttribute("disabled");
    }
    if(document.getElementById("busUsb").checked) {
        document.querySelector("#busNoUsb").removeAttribute("disabled");
    }

    if(!document.getElementById("firstMeal").checked) {
        document.querySelector("#firstNoMeal").removeAttribute("disabled");
    }
    if(!document.getElementById("firstEntertain").checked) {
        document.querySelector("#firstNoEntertain").removeAttribute("disabled");
    }
    if(document.getElementById("firstWifi").checked) {
        document.querySelector("#firstNoWifi").removeAttribute("disabled");
    }
    if(document.getElementById("firstUsb").checked) {
        document.querySelector("#firstNoUsb").removeAttribute("disabled");
    }
}
