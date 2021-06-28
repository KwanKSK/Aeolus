function checkTime() {
    var departureDate = document.getElementById('departureDate').value,
        arrivalDate = document.getElementById('arrivalDate').value;
        
        departureTime = document.getElementById('departureTime').value,
        arrivalTime = document.getElementById('arrivalTime').value;

    var departureDate = new Date(departureDate),
        arrivalDate = new Date(arrivalDate),

        startTime = new Date().setHours(GetHours(departureTime), GetMinutes(departureTime), 0);
        endTime = new Date(startTime);
        endTime = endTime.setHours(GetHours(arrivalDate), GetMinutes(arrivalDate), 0);

    if (departureDate == arrivalDate) {
        if(startTime > endTime){
            alert("Departure Time cannot be less than Arrival Time.");
            return false;
        }
    }
    return true;
}
