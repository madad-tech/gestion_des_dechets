const mongoose = require('mongoose')

const cuisArticleRetourSchema = new mongoose.Schema({

  TypeRepas: {
    type: String,
    required:true
  },

  Poids: {
    type: Number,
  },

  CompositionPl: {
    type: String,
    required:true
  },

  TypeTri: {
    type:String,
    required:true
  },
  TypeRecyclage: {
    type: String,
    required:true
  },
 
  createdAt: {
    type: Date,
    default: Date.now
}
  
}) 

module.exports = mongoose.model('ReturnMeal', cuisArticleRetourSchema);