// Economy
var checkEco = document.querySelector("#checkEco"),
    inputEcoSeatNumber = document.querySelector("#ecoSeatNumber"),
    inputEcoSeatLayout = document.querySelector("#ecoSeatLayout"),
    inputEcoSeatPitch = document.querySelector("#ecoSeatPitch");

var toogleEco = function(eco){
    inputEcoSeatNumber.disabled = !eco.target.checked;
    inputEcoSeatLayout.disabled = !eco.target.checked;
    inputEcoSeatPitch.disabled = !eco.target.checked;
};

toogleEco({target: checkEco});
checkEco.addEventListener("change", toogleEco);

// Business
var checkBus = document.querySelector("#checkBus"),
    inputBusSeatNumber = document.querySelector("#busSeatNumber"),
    inputBusSeatLayout = document.querySelector("#busSeatLayout"),
    inputBusSeatPitch = document.querySelector("#busSeatPitch");

var toogleBus = function(bus){
    inputBusSeatNumber.disabled = !bus.target.checked;
    inputBusSeatLayout.disabled = !bus.target.checked;
    inputBusSeatPitch.disabled = !bus.target.checked;
};

toogleBus({target: checkBus});
checkBus.addEventListener("change", toogleBus);

// First class
var checkFirst = document.querySelector("#checkFirst"),
    inputFirstSeatNumber = document.querySelector("#firstSeatNumber"),
    inputFirstSeatLayout = document.querySelector("#firstSeatLayout"),
    inputFirstSeatPitch = document.querySelector("#firstSeatPitch");

var toogleFirst = function(first){
    inputFirstSeatNumber.disabled = !first.target.checked;
    inputFirstSeatLayout.disabled = !first.target.checked;
    inputFirstSeatPitch.disabled = !first.target.checked;
};

toogleFirst({target: checkFirst});
checkFirst.addEventListener("change", toogleFirst);


