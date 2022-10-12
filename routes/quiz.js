const express = require('express')
const router = express.Router()

const authenticationMiddleware = require('../middlewares/authentication')

const {
  getAllQuiz,
  getOneQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz
} = require('../controllers/quiz')

router.route('/quiz').get(getAllQuiz)
router.route('/create').post(createQuiz)
router.route('/quiz/:id').get(getOneQuiz).patch(authenticationMiddleware, updateQuiz).delete(authenticationMiddleware, deleteQuiz)

module.exports = router