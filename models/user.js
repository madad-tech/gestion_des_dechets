const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["employe", "admin"]
       },
	 active :{
		type: Boolean,
        required: true
	 }
})

module.exports = mongoose.model('Utilisateur', userSchema)