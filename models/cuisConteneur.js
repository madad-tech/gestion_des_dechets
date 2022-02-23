const mongoose = require('mongoose')


const cuisPatientSchema = new mongoose.Schema({
    typeC: {
        type: Number,
        required: true
    },
    nombreC: {
        type: Number,
        required: true
    },
    dateC: {
        type: Number,
        required: true
    },
    montantC: {
        type: Number,
        required: true
    },
    coutant: {
        type: Number,
        required: true
    },
    poids: {
        type: Number,
        required: true
    },
    commentaire: {
        type: String,
        required: true
      },
})


module.exports = mongoose.model('cuisPatient', cuisPatientSchema)