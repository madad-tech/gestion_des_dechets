const mongoose = require('mongoose')

const cuisConteneurSchema = new mongoose.Schema({
    typeC: {
       type: String,
        required: true
    },
    nombreC: {
        type: Number,
        required: true
    },
    dateC: {
        type: Date,
        default: Date.now
    },
    montantC: {
        type: Number,
        required: true
    },
    cautionC: {
        type: String,
        required: true
    },
    poidsC: {
        type: Number,
        required: true
    },
    commentaireC: {
        type: String,
        required: true
     }
   
})


module.exports = mongoose.model('cuisConteneur', cuisConteneurSchema)
