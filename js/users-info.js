const typesOfGymClimbing = document.getElementById('typesOfGymClimbing')
const infoContentsStyle = document.getElementById('infoContentsStyle')

typesOfGymClimbing.addEventListener('click', () => {
    displayContents(infoContentsStyle)
})

const routeGrades = document.getElementById('routeGrades')
const infoContentsGrade = document.getElementById('infoContentsGrade')

routeGrades.addEventListener('click', () => {
    displayContents(infoContentsGrade)
})

const gear = document.getElementById("gear")
const infoContentsGear = document.getElementById('infoContentsGear')

gear.addEventListener('click', () => {
    displayContents(infoContentsGear)
})

const terminology = document.getElementById("terminology")
const infoContentsTerminology = document.getElementById("infoContentsTerminology")

terminology.addEventListener('click', () => {
    displayContents(infoContentsTerminology)
})

const holds = document.getElementById('holds')
const infoContentsHolds = document.getElementById('infoContentsHolds')

holds.addEventListener('click', () => {
    displayContents(infoContentsHolds)
})

const techniques = document.getElementById("techniques")
const infoContentsTechniques = document.getElementById('infoContentsTechniques')

techniques.addEventListener('click', () => {
    displayContents(infoContentsTechniques)
})




function displayContents(contentsContainer) {
    if (contentsContainer.className === 'infoContents hidden') {
        contentsContainer.style.display = 'block'
        contentsContainer.className = 'infoContents shown'
    } else {
        contentsContainer.style.display = "none"
        contentsContainer.className = 'infoContents hidden'
    }
}
