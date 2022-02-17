const mongoose = require('mongoose')

const cuisPatientSchema = new mongoose.Schema({
    nomP: {
        type: String,
        required: true
    },
    prenomP: {
        type: String,
        required: true
    },
    sexeP: {
        type: String,
        required: true
    },
    ageP: {
        type: Number,
        required: true
    },
    CIN: {
        type: String,
        required: true
    },
    Antecedents_Allergies: {
        type: String
    },
    service: {
        type: String,
        enum: ['ORL', 'Cardiologie', 'Endocrinologie',
          'Gastroentérologie', 'Neurologie',
          'Urgences', 'Réanimation'],
        required: [true, 'service est obligatoire'],
      },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('cuisPatient', cuisPatientSchema)