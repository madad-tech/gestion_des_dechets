const User3 = require('./models/user3.js')



exports.checkAuthenticated = async (req, res, next) =>{
    if (req.isAuthenticated()){
        return next()
    }

    res.redirect('/')
}

exports.checkNotAuthenticated = async (req, res, next) => {
    if (req.isAuthenticated()){
        return res.redirect('/Page0')
    }
    next()
} 

exports.checkNonEmploye = async (req, res, next) => {
    const users3 = await User3.find()
    if (users3[users3.length-1].role != "employe"){
        return next()
    }

    res.redirect('/')
}

exports.checkNonMedecin = async (req, res, next) => {
    const users3 = await User3.find()
    if (users3[users3.length-1].role != "medecin"){
        return next()
    }

    res.redirect('/')
}


exports.checkNonPharmacien = async (req, res, next) =>{
    const users3 = await User3.find()
    if (users3[0].role != "pharmacien"){
        return next()
    }

    res.redirect('/')
}



exports.checkNonPharmacienP = async (req, res, next) =>{
    const users3 = await User3.find()
    if (users3[0].role != "pharmacienP"){
        return next()
    }

    res.redirect('/')
}

