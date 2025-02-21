const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const emailError = document.getElementById('email-error')
const passwordError = document.getElementById('password-error')
const passwordRequirements = document.getElementById('password-requirements')
const apiError = document.getElementById('api-error')
let emailFocused = false, passwordFocused = false
const emailRegex = /^\S+@\S+\.\S+$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/

emailInput.addEventListener('focus', () => { emailFocused = true })
passwordInput.addEventListener('focus', () => {
  passwordFocused = true
  passwordRequirements.style.display = 'block'
})

emailInput.addEventListener('blur', () => {
  if (!emailRegex.test(emailInput.value)) {
    emailInput.classList.add('input-invalid')
    emailInput.classList.remove('input-valid')
    emailError.textContent = 'Enter a valid email address'
    emailError.style.display = 'block'
  } else {
    emailInput.classList.remove('input-invalid')
    emailInput.classList.add('input-valid')
    emailError.style.display = 'none'
  }
})

passwordInput.addEventListener('blur', () => {
  passwordRequirements.style.display = 'none'
  if (!passwordRegex.test(passwordInput.value)) {
    passwordInput.classList.add('input-invalid')
    passwordInput.classList.remove('input-valid')
    passwordError.textContent =
      'Password must be 8-16 characters long, with lowercase, uppercase, special char, and number'
    passwordError.style.display = 'block'
  } else {
    passwordInput.classList.remove('input-invalid')
    passwordInput.classList.add('input-valid')
    passwordError.style.display = 'none'
  }
})

passwordInput.addEventListener('input', () => {
  if (passwordFocused) {
    if (!passwordRegex.test(passwordInput.value)) {
      passwordInput.classList.add('input-invalid')
      passwordInput.classList.remove('input-valid')
      passwordError.textContent =
        'Password must be 8-16 characters long, with lowercase, uppercase, special char, and number'
      passwordError.style.display = 'block'
    } else {
      passwordInput.classList.remove('input-invalid')
      passwordInput.classList.add('input-valid')
      passwordError.style.display = 'none'
    }
  }
})

document.querySelector('.toggle-password').addEventListener('click', function () {
  const field = passwordInput
  if (field && field.type === 'password') {
    field.type = 'text'
    this.querySelector('div').innerHTML = `<svg width="24" height="24" fill="white" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 45.701 45.7" xml:space="preserve"><g><g><path d="M20.687,38.332c-2.072,2.072-5.434,2.072-7.505,0L1.554,26.704c-2.072-2.071-2.072-5.433,0-7.504 c2.071-2.072,5.433-2.072,7.505,0l6.928,6.927c0.523,0.522,1.372,0.522,1.896,0L36.642,7.368c2.071-2.072,5.433-2.072,7.505,0 c0.995,0.995,1.554,2.345,1.554,3.752c0,1.407-0.559,2.757-1.554,3.752L20.687,38.332z"/></g></g></svg>`
  } else if (field) {
    field.type = 'password'
    this.querySelector('div').innerHTML = `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 8C7.5 14.5 16.5 14.5 19.5 8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.8162 11.3175L19.5 15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 12.875V16.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.18383 11.3175L4.5 15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  }
})

document.querySelector('.register-form').addEventListener('submit', async e => {
  e.preventDefault()
  apiError.style.display = 'none'
  apiError.textContent = ''
  const form = e.target
  const username = form.username.value.trim()
  const email = form.email.value.trim()
  const password = form.password.value.trim()

  if (!emailRegex.test(email)) {
    emailError.textContent = 'Enter a valid email address'
    emailError.style.display = 'block'
    return
  }
  if (!passwordRegex.test(password)) {
    passwordError.textContent = 'Password must be 8-16 characters long, with lowercase, uppercase, special char, and number'
    passwordError.style.display = 'block'
    return
  }
  
  document.querySelector('.register-button').innerHTML = `
    <svg width="24" fill="white" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <style>.spinner_5nOS{transform-origin:center;animation:spinner_sEAn .75s infinite linear}@keyframes spinner_sEAn{100%{transform:rotate(360deg)}}</style>
      <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
      <path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z" class="spinner_5nOS"/>
    </svg>
  `
  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })
    const result = await response.json()
    if(result.success) {
      window.location.href = '/'
    } else {
      apiError.textContent = result.message || 'Error occurred'
      apiError.style.display = 'block'
      document.querySelector('.register-button').innerHTML = 'Register'
    }
  } catch(err) {
    apiError.textContent = 'Internal server error'
    apiError.style.display = 'block'
    document.querySelector('.register-button').innerHTML = 'Register'
  }
})
