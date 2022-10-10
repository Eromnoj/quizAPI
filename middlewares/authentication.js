const jwt = require('jsonwebtoken')
const CustomErrorHandler = require('../errors/CustomErrorHandler')

const authenticationMiddleware = async (req, res, next) => {

  const authheader = req.headers.authorization

  if(!authheader || !authheader.startsWith('Bearer ')){
    throw new CustomErrorHandler(500, `Vous n'avez pas accès à cette route`)
  }

  const token = authheader.split(' ')[1]

  try {
    const isValid = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {id: isValid.id, username: isValid.username, role: isValid.role}    
    next()
  } catch (error) {
    
    throw new CustomErrorHandler(500, `Vous n'avez pas accès à cette route`)
  }


}

module.exports = authenticationMiddleware
