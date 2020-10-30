const passwordInput = document.getElementById('passwordInput')
const confirmPasswordInput = document.getElementById('confirmPasswordInput')
const showPasswordBtn = document.getElementById('showPasswordBtn')
const showConfirmPasswordBtn = document.getElementById('showConfirmPasswordBtn')

showPasswordBtn.addEventListener('click', () => {
    if (passwordInput.type == 'password') {
        passwordInput.type = 'text'
        showPasswordBtn.className = 'fa fa-eye-slash showPasswordBtn'
    } else {
        passwordInput.type = 'password'
        showPasswordBtn.className = 'fa fa-eye showPasswordBtn'
    }
})

showConfirmPasswordBtn.addEventListener('click', () => {
    if (confirmPasswordInput.type == 'password') {
        confirmPasswordInput.type = "text"
        showConfirmPasswordBtn.className = 'fa fa-eye-slash showPasswordBtn'
    } else {
        confirmPasswordInput.type = 'password'
        showConfirmPasswordBtn.className = 'fa fa-eye showPasswordBtn'
    }
})
