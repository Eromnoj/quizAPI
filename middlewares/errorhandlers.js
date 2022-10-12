const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = async (err, req, res, next) => {
  // console.log(err)
  if (err.code === 11000) {
    return res.status(StatusCodes.NOT_MODIFIED).json({ error: err.code, msg: 'Déjà existant' })
  }
  if (err.name === 'ValidationError') {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: err.name, msg: 'Veuillez faire une entrée valide' })
  }
  if (err.name === 'CastError') {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: err.name, msg: `L'id n'est pas valide` })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandlerMiddleware