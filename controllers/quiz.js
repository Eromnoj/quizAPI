const Quiz = require('../models/quiz')
const CustomErrorHandler = require('../errors/CustomErrorHandler')

const getAllQuiz = async (req, res) => {
  const quizzes = await Quiz.find({})

  res.status(200).json({count:quizzes.length, quizzes : quizzes})
}
 

const getOneQuiz = async (req, res) => {
  const { id } = req.params

  const quiz = await Quiz.findById(id)

  res.status(200).json({msg:`Get one quiz with id : ${id}`, quiz})
  
}

const createQuiz = async (req, res) => {

  const quiz = await Quiz.create(req.body)

  res.status(201).json({msg:'Create', quiz: quiz})
  
}

const updateQuiz = async (req, res) => {
  const {id} = req.params

  
  const quiz = await Quiz.findByIdAndUpdate(id, req.body, {new: true, runValidators: true} )
  
  if(!quiz){
    throw new CustomErrorHandler(400, `L'id n'existe pas : ${id}`)
  }
  
  res.status(200).json({msg:'updated', quiz})
  
}

const deleteQuiz = async (req, res) => {

  const {id} = req.params
  
  const quiz = await Quiz.findByIdAndDelete(id)
  
  if(!quiz){
    throw new CustomErrorHandler(400, `L'id n'existe pas : ${id}`)
  }
  

  res.status(200).json({msg:'Deleted'})
  
}

module.exports = {
  getAllQuiz,
  getOneQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz
}