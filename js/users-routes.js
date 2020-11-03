const addRouteBtn = document.getElementById('addRouteBtn')
const routeCont = document.getElementById('routeCont')
const submitRouteBtn = document.getElementById('submitRouteBtn')

addRouteBtn.addEventListener('click', () => {
    routeCont.style.display = "flex";
    startTimer()
})

// ATTEMPTS INPUT BUTTONS
const plusAttempt = document.getElementById('plusAttempt')
const minusAttempt = document.getElementById('minusAttempt')
const attemptsInput = document.getElementById('attemptsInput')

plusAttempt.addEventListener('click', () => {
    attemptsInputInt = parseInt(attemptsInput.value)
    attemptsInputInt += 1
    attemptsInput.value = attemptsInputInt
})

minusAttempt.addEventListener('click', () => {
    if (attemptsInput.value != "1") {
        attemptsInputInt = parseInt(attemptsInput.value)
        attemptsInputInt -= 1
        attemptsInput.value = attemptsInputInt
    } 
})

// --------- SESSION TIMER -----------
const sessionTimeDisplay = document.getElementById('sessionTimeDisplay')
const totalSecondsValue = document.getElementById('totalSecondsValue')

function startTimer() {
    let hours = 0
    let minutes = 0
    let seconds = 0
    let totalSeconds = 0
 
    setInterval(timer, 1000)

    function timer() {
        totalSeconds++
        totalSecondsValue.value = totalSeconds

        hours = Math.floor(totalSeconds / 3600)
        minutes = Math.floor((totalSeconds - hours * 3600) / 60)
        seconds = totalSeconds - (hours * 3600 + minutes * 60)

        if (hours == 0) {
            if (minutes < 10 && seconds < 10) {
                sessionTimeDisplay.innerHTML = `0${minutes}:0${seconds}`
            } else if (minutes < 10 && seconds >= 10) {
                sessionTimeDisplay.innerHTML = `0${minutes}:${seconds}`
            } else if (minutes >= 10 && seconds < 10) {
                sessionTimeDisplay.innerHTML = `${minutes}:0${seconds}`
            } else if (minutes >= 10 && seconds >= 10) {
                sessionTimeDisplay.innerHTML = `${minutes}:${seconds}`
            }
        } else {
            if (minutes < 10 && seconds < 10) {
                sessionTimeDisplay.innerHTML = `${hours}:0${minutes}:0${seconds}`
            } else if (minutes < 10 && seconds >= 10) {
                sessionTimeDisplay.innerHTML = `${hours}:0${minutes}:${seconds}`
            } else if (minutes >= 10 && seconds < 10) {
                sessionTimeDisplay.innerHTML = `${hours}:${minutes}:0${seconds}`
            } else if (minutes >= 10 && seconds >= 10) {
                sessionTimeDisplay.innerHTML = `${hours}:${minutes}:${seconds}`
            }
        }
    }
}

