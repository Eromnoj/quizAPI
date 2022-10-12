const login = document.getElementById('login')


login.addEventListener('submit', async (e) => {
  e.preventDefault()

  const formData = new FormData(login)

  const loginData = {
    username: formData.get('username'),
    password: formData.get('password') 
  }

  console.log(loginData);
  try {
    const response = await axios.post('/auth/login', loginData)
    const token = response.data.token
    localStorage.setItem('token', token)
    window.location.replace("/dashboard")
  } catch (error) {
    console.log(error);
  }


})