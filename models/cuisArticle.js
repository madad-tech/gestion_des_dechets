const mongoose = require('mongoose')
const slugify = require('slugify')

const cuisArticleSchema = new mongoose.Schema({
    Nlot: {
        type: String,
        required: true
    },
    datePeremption: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    codeP: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    sP: {
        type: Number
    },
    categorie: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

cuisArticleSchema.pre('validate', function(next){
    if (this.nom){
        this.slug = slugify(this.nom, { lower: true,strict: true})
    }
    next()
})

module.exports = mongoose.model('CuisProduit', cuisArticleSchema)