const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
  username: {
    type:String,
    required: true,
    unique : true,
    minlength : [3, "Le nom d'utilisateur doit faire au minimum 3 caratères"],
    maxlength: [50, "Le nom d'utilisateur doit faire au maximum 50 caractères"]
  },
  password : {
    type: String,
    required: true,
    minlenght: 6
  },
  role : {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
})


userSchema.pre('save', async function (){
  const salt =  await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createToken = function(){
  return jwt.sign({id: this._id, username: this.username, role: this.role}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

userSchema.methods.validatePassword =async function(passwordCandidate){
  const isMatch = await bcrypt.compare(passwordCandidate, this.password)
  return isMatch
}

module.exports = mongoose.model('User', userSchema)