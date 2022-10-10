require('dotenv').config()

const connectDB = require('./util/connectDB')
const Quiz = require('./models/quiz')

const jsonQuizz = require('./quiz.json')


const start = async ()=>{
  try {
    await connectDB(process.env.MONGO_URI)
    await Quiz.deleteMany()
    await Quiz.create(jsonQuizz)  
    console.log('Success!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
