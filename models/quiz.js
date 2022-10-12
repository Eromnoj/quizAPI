const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
  question : {
    type: String,
    required: [true, "Une question doit être rentrée"],
    minlength: [10, "Minimum de 10 caractères"],
  },
  answer : {
    type: String,
    required: [true , "Vous devez entrer la réponse",],
    minlength: [3, "Minimum de 3 caractères"],
  },
  badAnswers : {
    type : [
      {
        type:String,
        minlength: [3, "Minimum de 3 caractères"]
      }
    ],
    required: [true, "Vous devez entrer des mauvaises réponses"]

  },
  category : {
    type : String,
    enum : ['art_litterature',
            'tv_cinema',
            'jeux_videos',
            'culture_generale',
            'sport',
            'actu_politique',
            'musique'          
            ],
    required : [true, "Vous devez choisir une catégorie"]
  },
  difficulty : {
    type: String,
    enum : [
            'facile',
            'normal',
            'difficile'
    ],
    required: [true, "Vous devez choisir une difficultée"]
  },
  pending : {
    type: Boolean,
    default: true
  }
})


module.exports = mongoose.model('Quiz', quizSchema)