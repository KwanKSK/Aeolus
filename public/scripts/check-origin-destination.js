function checkLocation() {
    var origin = document.getElementById('origin').value,
        destination = document.getElementById('destination').value;

    if (origin == destination) {
        alert("Origin cannot be same as Destination.");
        return false;
    }
    return true;
}
