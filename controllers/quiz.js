const Quiz = require('../models/quiz')
const jwt = require('jsonwebtoken')
const CustomErrorHandler = require('../errors/CustomErrorHandler')
const {StatusCodes}  = require('http-status-codes')

const getAllQuiz = async (req, res) => {

  const { authorization } = req.headers
  const { difficulty, category, limit, pending } = req.query

  const objectQuery = {}

  if (difficulty) {
    objectQuery.difficulty = difficulty
  }

  if (category) {
    objectQuery.category = category
  }

  if (!authorization) {
    objectQuery.pending = false
  } else {
    if (!authorization.startsWith('Bearer')) {
      objectQuery.pending = false
    } else {
      const token = authorization.split(' ')[1]
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { role } = payload
        if (role !== 'admin') {
          objectQuery.pending = false
        } else {
          if (pending) {
            objectQuery.pending = pending === "true" ? true : false
          }
        }
      } catch (error) {
        objectQuery.pending = false
      }
    }
  }

  let aggregQuery = [{ $match: objectQuery }]

  if (limit) {
    aggregQuery.push({ $sample: { size: parseInt(limit) } })
  }

  const quizzes = await Quiz.aggregate(aggregQuery)

  res.status(StatusCodes.OK).json({ count: quizzes.length, quizzes: quizzes })
}


const getOneQuiz = async (req, res) => {
  const { id } = req.params

  const quiz = await Quiz.findById(id)

  res.status(StatusCodes.OK).json({ msg: `Get one quiz with id : ${id}`, quiz })

}

const createQuiz = async (req, res) => {

  const { authorization } = req.headers
  let pendingQuiz

  if (!authorization) {
    pendingQuiz = {
      ...req.body,
      pending: true
    }
  } else {
    if (!authorization.startsWith('Bearer')) {
      pendingQuiz = {
        ...req.body,
        pending: true
      }
    } else {
      const token = authorization.split(' ')[1]
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { role } = payload
        if (role !== 'admin') {
          pendingQuiz = {
            ...req.body,
            pending: true
          }
        } else {
          pendingQuiz = req.body

        }
      } catch (error) {
        pendingQuiz = {
          ...req.body,
          pending: true
        }
      }
    }
  }

  console.log(pendingQuiz)
  const quiz = await Quiz.create(pendingQuiz)

  res.status(StatusCodes.CREATED).json({ msg: 'Create', quiz: quiz })

}

const updateQuiz = async (req, res) => {
  const { id } = req.params

  const { role } = req.user

  let quiz
  if (role === 'admin') {

    quiz = await Quiz.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
  }

  
  if(role !=='admin') {
    throw new CustomErrorHandler(StatusCodes.UNAUTHORIZED, `Vous n'avez pas les droits d'accès suffisant pour cette opération`)
  }
  if (!quiz) {
    throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, `L'id n'existe pas : ${id}`)
  }

  res.status(200).json({ msg: 'updated', quiz })

}

const deleteQuiz = async (req, res) => {

  const { id } = req.params

  const { role } = req.user

    let quiz
  if (role === 'admin') {

    quiz = await Quiz.findByIdAndDelete(id)
  }
  
  
  if(role !=='admin') {
    throw new CustomErrorHandler(StatusCodes.UNAUTHORIZED, `Vous n'avez pas les droits d'accès suffisant pour cette opération`)
  }
  if (!quiz) {
    throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, `L'id n'existe pas : ${id}`)
  }


  res.status(200).json({ msg: `Deleted` })

}

module.exports = {
  getAllQuiz,
  getOneQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz
}