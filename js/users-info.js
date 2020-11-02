const typesOfGymClimbing = document.getElementById('typesOfGymClimbing')
const infoContents = document.getElementById('infoContents')


typesOfGymClimbing.addEventListener('click', () => {
    displayContents(infoContents)
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
