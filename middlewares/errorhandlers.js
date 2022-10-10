const errorHandlerMiddleware = async (err, req, res, next) => {
  // console.log(err)
  if(err.code === 11000) {
    return res.status(400).json({error : err.code, msg :'Déjà existant'})
  }
  if(err.name === 'ValidationError') {
    return res.status(400).json({error : err.name, msg :'Veuillez faire une entrée valide'})
  }
  if(err.name === 'CastError'){
    return res.status(400).json({error : err.name, msg :`L'id n'est pas valide`})
  }
  return res.status(500).json({ err })
}

module.exports = errorHandlerMiddleware