const form = document.getElementById('submitQuestion')
const message = document.getElementById('message')
// const axios = require('axios')

message.style.display = 'none'

form.addEventListener('submit', async (e) => {

  e.preventDefault()
  const formData = new FormData(form)

  const question = {
    question: formData.get('question'),
    answer: formData.get('answer'),
    badAnswers: [formData.get('badAnswer1'), formData.get('badAnswer2'), formData.get('badAnswer3')],
    category: formData.get('category'),
    difficulty: formData.get('difficulty')
  }

  console.log(question);

  try {
    const response = await axios.post('/api/v1/create', question)
    console.log(response.data.msg)
   
    message.innerText = response.data.msg
    message.classList.add('bg-green-600')
    message.style.display = 'block'
  } catch (error) {
    console.log(error.response.data.msg)
    message.innerText = error.response.data.msg
    message.style.display = 'block'
    message.classList.add('bg-red-600')
  }
  setTimeout(()=> {
    message.classList.remove('bg-red-600')
    message.classList.remove('bg-green-600')
    message.innerText = ""
    message.style.display = 'none'
  },6000)
})
