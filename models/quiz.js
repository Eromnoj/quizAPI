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
    enum : ['Art & Littérature',
            'TV & Cinéma',
            'Jeux vidéos',
            'Culture Générale',
            'Sport',
            'Actualités et Politique'          
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
  }
})


module.exports = mongoose.model('Quiz', quizSchema)