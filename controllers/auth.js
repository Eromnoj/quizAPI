const User = require('../models/user')
const CustomErrorHandler = require('../errors/CustomErrorHandler')

const register = async (req, res) => {

  const user = await User.create(req.body)

  if (!user) {
    throw new CustomErrorHandler(400, `L'utilisateur n'a pas été créé`)
  }
  const token = user.createToken()

  res.status(201).json({ msg: "User created", token })
}



const login = async (req, res) => {

  const { username, password } = req.body

  const user = await User.findOne({ username })

  if(!user){
    throw new CustomErrorHandler(400, `L'utilisateur n'existe pas`)
  // res.status(400).json({ msg: "Nope" })

  }

  const isMatch = await user.validatePassword(password)

  if(isMatch){
    const token = user.createToken()
    res.status(200).json({ msg: "Login Successful", token })
  } else {
    throw new CustomErrorHandler(400, `Mauvais mot de passe`)

  }




}

module.exports = {
  register,
  login
}

