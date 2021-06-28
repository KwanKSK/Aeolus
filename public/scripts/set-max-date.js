var todayDate = new Date(),
    tDay = todayDate.getDate(),
    tMonth = todayDate.getMonth()+1,
    tYear = todayDate.getFullYear();
    
if(tDay<10) {
    tDay='0'+tDay;
} 
if(tMonth<10){
    tMonth='0'+tMonth;
}

todayDate = tYear+'-'+tMonth+'-'+tDay;

document.querySelector('#birthDate').setAttribute("max", todayDate);