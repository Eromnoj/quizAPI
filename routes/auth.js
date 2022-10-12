const express = require('express')

const router = express.Router()
const authenticationMiddleware = require('../middlewares/authentication')

const {login, register, verifyId} = require('../controllers/auth')

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/verifyid').get(authenticationMiddleware, verifyId)

module.exports = router