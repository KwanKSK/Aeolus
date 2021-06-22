var todayDate = new Date(),
    tDay = todayDate.getDate(),
    tMonth = todayDate.getMonth()+1,
    tYear = todayDate.getFullYear(),
    tHour = todayDate.getHours(),
    tMins = todayDate.getMinutes();
    
if(tDay<10) {
    tDay='0'+tDay;
} 
if(tMonth<10){
    tMonth='0'+tMonth;
}
if(tHour<10){
    tHour='0'+tHour;
}
if(tMins<10){
    tMins='0'+tMins;
}

todayDate = tYear+'-'+tMonth+'-'+tDay;

document.querySelector('#departureDateOnly').setAttribute("min", todayDate);
document.querySelector('#arrivalDateOnly').setAttribute("min", todayDate);
