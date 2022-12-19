const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

const hour = document.getElementById("clock-hour"),
      minutes = document.getElementById("clock-minutes"),
      seconds = document.getElementById("clock-seconds")

const clock = () =>{
    let date = new Date()

    let hh = date.getHours() * 30,
        mm = date.getMinutes() * 6,
        ss = date.getSeconds() * 6

    hour.style.transform = `rotateZ(${hh + mm / 12}deg)`    
    minutes.style.transform = `rotate(${mm}deg)`
    seconds.style.transform = `rotate(${ss}deg)`
}
setInterval(clock, 1000)



const textHour = document.getElementById("text-hour"),
      textMinutes = document.getElementById("text-minutes"),
      textAmPm = document.getElementById("text-ampm"),
      dateDay = document.getElementById("date-day"),
      dateMonth = document.getElementById("date-month"),
      dateYear = document.getElementById("date-year")

const clockText = () => {
    let date = new Date()
    let hh = date.getHours(),
        ampm,
        mm = date.getMinutes(),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear()

    if(hh >= 12){
        hh = hh - 12
        ampm = 'PM'
    }else{
        ampm = 'AM'
    }

    if(hh == 0){hh = 12}

    if(hh < 10){hh = `0${hh}`}


    if(mm < 10){mm = `0${mm}`} 
    textMinutes.innerHTML = mm

    textHour.innerHTML = `${hh}`

    textAmPm.innerHTML = ampm

    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
    dateDay.innerHTML = day
    dateMonth.innerHTML = `${months[month]},`
    dateYear.innerHTML = year
}
setInterval(clockText, 1000)

