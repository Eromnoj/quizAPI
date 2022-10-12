const User = require('../models/user')
const CustomErrorHandler = require('../errors/CustomErrorHandler')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {


  //force the user role to any new subscription
  const registered = {...req.body, role : 'user'}

  const user = await User.create(registered)

  if (!user) {
    throw new CustomErrorHandler(StatusCodes.BAD_REQUEST, `L'utilisateur n'a pas été créé`)
  }
  const token = user.createToken()

  res.status(201).json({ msg: "User created", token })
}

const login = async (req, res) => {

  const { username, password } = req.body

  const user = await User.findOne({ username })

  if (!user) {
    throw new CustomErrorHandler(StatusCodes.UNAUTHORIZED, `L'utilisateur n'existe pas`)
    // res.status(400).json({ msg: "Nope" })

  }

  const isMatch = await user.validatePassword(password)

  if (isMatch) {
    const token = user.createToken()
    res.status(200).json({ msg: "Login Successful", token })
  } else {
    throw new CustomErrorHandler(StatusCodes.UNAUTHORIZED, `Mauvais mot de passe`)

  }


}

const verifyId = async (req, res) => {

  const { userId, username } = req.user

    res.status(200).json({ msg: `Bienvenue ${username}` })
 


}

module.exports = {
  register,
  login,
  verifyId
}

