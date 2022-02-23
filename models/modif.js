const mongoose = require('mongoose')

const modifSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    shema: {
        type: String,
        required: true
    },
	c_id : {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    old: {
        type: String,
        required: true
    },
    new: {
        type: String,
        required: true
    },
	date : {
		type: Date,
        default: Date.now
	}
    
})


module.exports = mongoose.model('Modif', modifSchema)