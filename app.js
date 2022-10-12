require('express-async-errors')
require('dotenv').config()

//security Package
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')


const express= require('express')
const app = express()

const quizRoute = require('./routes/quiz')
const authRoute = require('./routes/auth')

const notFoundMw = require('./middlewares/notfound')
const errHandlMw = require('./middlewares/errorhandlers')
const connectDB = require('./util/connectDB')

// extra package Rate limiter
// allow proxies
app.set('trust proxy', 1)
//limite the number of request in a given time (express-limit-rate)
//max 100 every 15 minutes
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes (milliseconds)
    max: 100
  })
)

app.use(express.json());

//extra security packages
app.use(helmet())
app.use(cors())
app.use(xss())

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