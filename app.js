require('express-async-errors')
require('dotenv').config()

const express= require('express')
const app = express()

const quizRoute = require('./routes/quiz')
const authRoute = require('./routes/auth')

const notFoundMw = require('./middlewares/notfound')
const errHandlMw = require('./middlewares/errorhandlers')
const connectDB = require('./util/connectDB')


app.use(express.json())

app.use('/api/v1', quizRoute)

app.use('/auth', authRoute)
app.use(notFoundMw)
app.use(errHandlMw)


const PORT = process.env.PORT || 5000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    })
  } catch (error) {
    console.log(error);
  }
}

start()