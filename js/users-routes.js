const addRouteBtn = document.getElementById('addRouteBtn')
const routeCont = document.getElementById('routeCont')

addRouteBtn.addEventListener('click', () => {
    routeCont.style.display = "flex";
})

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



