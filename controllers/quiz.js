const Quiz = require('../models/quiz')


const getAllQuiz = async (req, res) => {
  const quizzes = await Quiz.find({})

  if(!quizzes){
    throw new Error(`La requête n'a pu aboutir`)
  }

  res.status(200).json({count:quizzes.length, quizzes : quizzes})
}
 

const getOneQuiz = async (req, res) => {
  const { id } = req.params

  const quiz = await Quiz.findById(id)

  if(!quiz){
    throw new Error(`Le quiz n'a pas été trouvé`)
  }

  res.status(200).json({msg:`Get one quiz with id : ${id}`, quiz})
  
}

const createQuiz = async (req, res) => {

  const quiz = await Quiz.create(req.body)

  if(!quiz){
    throw new Error(`Le quiz n'a pas été créé`)
  }

  res.status(201).json({msg:'Create', quiz: quiz})
  
}

const updateQuiz = async (req, res) => {
  const {id} = req.params
  const quiz = await Quiz.findByIdAndUpdate(id, req.body, {new: true, runValidators: true} )
  if(!quiz){
    throw new Error(`Le quiz n'a pas été modifié`)
  }
  res.status(200).json({msg:'updated', quiz})
  
}

const deleteQuiz = async (req, res) => {

  const {id} = req.params
  
  const quiz = await Quiz.findByIdAndDelete(id)
  if(!quiz){
    throw new Error(`Le quiz n'a pas été supprimé`)
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