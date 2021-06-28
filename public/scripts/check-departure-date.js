function checkDate() {
    var departureDate = document.getElementById('departureDate').value,
        arrivalDate = document.getElementById('arrivalDate').value;

    var departureDate = new Date(departureDate),
        arrivalDate = new Date(arrivalDate);

    if (departureDate > arrivalDate) {
        alert("Arrival Date cannot be less than Departure Date.");
        return false;
    }
    return true;
}
