const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
  question : {
    type: String,
    required: [true, "Une question doit être rentrée"],
    min: [10, "Minimum de 10 caractères"],
  },
  answer : {
    type: String,
    required: [true , "Vous devez entrer la réponse",],
    min: [3, "Minimum de 10 caractères"],
  },
  badAnswers : {
    type : [String],
    required: [true, "Vous devez entrer des mauvaises réponses"],
    min: 3,
    max: 3
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