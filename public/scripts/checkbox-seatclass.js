function checkTypeSeat(){
    if(!document.getElementById("checkEco").checked) {
        document.querySelector("#uncheckEco").removeAttribute("disabled");
    }

    if(!document.getElementById("checkBus").checked) {
        document.querySelector("#uncheckBus").removeAttribute("disabled");
    }

    if(document.getElementById("checkFirst").checked) {
        document.querySelector("#uncheckFirst").removeAttribute("disabled");
    }
}
