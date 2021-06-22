function checkPassenger() {
    var adult = document.getElementById('adult').value,
        infant = document.getElementById('infant').value;

    if (infant > adult) {
        alert("Infants cannot more than adults.");
        return false;
    }
    return true;
}
