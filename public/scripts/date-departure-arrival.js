function checkDate() {
    var departureDate = document.getElementById('departureDate').value,
        arrivalDate = document.getElementById('arrivalDate').value;

    var departureDate = new Date(departureDate),
        arrivalDate = new Date(arrivalDate),
        todayDate   = new Date();

    if (departureDate.getTime() <= todayDate.getTime()) {
        alert("Departure time must be Greater than Today time.");
        return false;
    }

    if (arrivalDate.getTime() <= todayDate.getTime()) {
        alert("Arrival time must be Greater than Today time.");
        return false;
    }

    if (departureDate > arrivalDate) {
        alert("Arrival time cannot be less than Departure time.");
        return false;
    }
    return true;
}
