const hourSp = document.getElementById("hour")
const minuteSp = document.getElementById("minute")
const secondSp = document.getElementById("seconds")
const amorpmSp = document.getElementById("amorpm")

function changeTime(){
    const date = new Date()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let amorpm;

    if (hour > 12){
        hour -= 12
    }

    hourSp.textContent = hour
    minuteSp.textContent = minutes
    secondSp.textContent = seconds
    
    

    if (hour >= 0 || hour <= 12) {
        amorpm = "PM"
    }else {
        amorpm = "AM"
    }
    amorpmSp.textContent = amorpm

}
changeTime()

setInterval(changeTime, 1000)