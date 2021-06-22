const returnDate = document.querySelector("#arrivalDateOnly")

const tabs = document.querySelectorAll(".flight-tab")
tabs.forEach((tab) => {
        tab.addEventListener("click", tabswap)
});


function tabswap() {
    tabs.forEach((tab) => {
        tab.classList.toggle("notactive");
       
    });
     returnDate.toggleAttribute("Disabled")
     returnDate.toggleAttribute("required")
}
