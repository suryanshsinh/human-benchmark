document.querySelectorAll('.toggle-password').forEach(button => {
  button.addEventListener('click', function () {
    const passwordField = this.previousElementSibling
    if (passwordField && passwordField.type === 'password') {
      passwordField.type = 'text'
      button.querySelector(
        'div'
      ).innerHTML = `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 12.5C7.5 6 16.5 6 19.5 12.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 16C10.8954 16 10 15.1046 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 15.1046 13.1046 16 12 16Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    } else if (passwordField) {
      passwordField.type = 'password'
      button.querySelector(
        'div'
      ).innerHTML = `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 8C7.5 14.5 16.5 14.5 19.5 8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.8162 11.3175L19.5 15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 12.875V16.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.18383 11.3175L4.5 15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    }
  })
})

document.querySelector('.login-form').addEventListener('submit', async e => {
  e.preventDefault()
  const apiError = document.getElementById('api-error')
  apiError.style.display = 'none'
  apiError.textContent = ''
  const form = e.target
  const username = form.email.value
  const password = form.password.value
  document.querySelector('.sign-in-button').innerHTML = `
      <svg width="24" fill="white" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <style>.spinner_5nOS{transform-origin:center;animation:spinner_sEAn .75s infinite linear}@keyframes spinner_sEAn{100%{transform:rotate(360deg)}}</style>
        <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
        <path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z" class="spinner_5nOS"/>
      </svg>
    `
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const result = await response.json()
    if (result.success) {
      window.location.href = '/'
    } else {
      apiError.textContent = result.message || 'Error occurred'
      apiError.style.display = 'block'
      document.querySelector('.sign-in-button').innerHTML = 'Sign in'
    }
  } catch (err) {
    apiError.textContent = 'Internal server error'
    apiError.style.display = 'block'
    document.querySelector('.sign-in-button').innerHTML = 'Sign in'
  }
})
