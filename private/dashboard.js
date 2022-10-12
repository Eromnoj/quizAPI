const token = localStorage.getItem('token')
const show = document.getElementById('show')
const message = document.getElementById('message')

const questionPending = document.getElementById('questionPending')
const count = document.getElementById('count')

const logout = document.getElementById('logout')

show.style.display = 'none'


const validateQuestion = async (id) => {
  try {
    const response = await axios.patch(`/api/v1/quiz/${id}`,{pending: false}, {
      headers: {
        authorization : `Bearer ${token}`
      }
    })
    console.log(response)
    window.location.replace("/dashboard")
  } catch (error) {
    
  }
  
}

const deleteQuestion = async (id) => {
  try {
    const response = await axios.delete(`/api/v1/quiz/${id}`, {
      headers: {
        authorization : `Bearer ${token}`
      }
    })
    console.log(response)
    window.location.replace("/dashboard")
  } catch (error) {
    
  }
  
}

const getPendingQuestions = async () => {
  
  try {
    const response = await axios.get('/api/v1/quiz?pending=true',{
      headers: {
        authorization : `Bearer ${token}`
      }
      
      
    })
    count.innerText = response.data.count
    
    const quizzes = response.data.quizzes
    
    quizzes.forEach(quizz => {
      const quizDiv = document.createElement('div')
      const questionDiv = document.createElement('div')
      questionDiv.innerText = quizz.question
      const answerDiv = document.createElement('div')
      answerDiv.innerText = quizz.answer
      const badAnsDiv = document.createElement('div')
      const buttonValidate = document.createElement('button')
      buttonValidate.innerText = 'Valider'
      buttonValidate.classList.add('m-auto', 'border-teal-300', 'border', 'rounded-md', 'bg-slate-400', 'text-teal-900', 'text-teal-300', 'p-2', 'text-lg', 'font-bold')
      
      const buttonDelete = document.createElement('button')
      buttonDelete.innerText = 'Supprimer'
      buttonDelete.classList.add('m-auto', 'border-teal-300', 'border', 'rounded-md', 'bg-red-400', 'text-teal-900', 'text-teal-300', 'p-2', 'text-lg', 'font-bold')
      
      buttonValidate.addEventListener('click', () => validateQuestion(quizz._id))
      buttonDelete.addEventListener('click', () => deleteQuestion(quizz._id))
      
      quizz.badAnswers.forEach(badAnswer => {
        const answer = document.createElement('div')
        answer.innerText = badAnswer
        badAnsDiv.appendChild(answer)
      })
      
      quizDiv.classList.add('border-teal-300', 'border', 'rounded-md', 'bg-slate-900', 'text-teal-300', 'flex', 'flex-col', 'justify-center', 'items-center', 'py-5', 'px-9', 'w-5/6', 'my-5')
      quizDiv.appendChild(questionDiv)
      quizDiv.appendChild(answerDiv)
      quizDiv.appendChild(badAnsDiv)
      quizDiv.appendChild(buttonValidate)
      quizDiv.appendChild(buttonDelete)
      
      
      questionPending.appendChild(quizDiv)        
    });
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
  
}

const verifyID = async() => {
  
  try {
    const response = await axios.get('/auth/verifyid', {
      headers: {
        authorization : `Bearer ${token}`
      }
    })
    show.style.display ='block'
    message.innerText = response.data.msg
    
    
    getPendingQuestions()
    
    

  } catch (error) {
    window.location.replace("/login.html")
  }
}

verifyID()
logout.addEventListener('click',() => {
 localStorage.removeItem('token')
 window.location.replace("/login.html")
})