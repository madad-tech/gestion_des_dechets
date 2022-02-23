const express = require('express')
const router = express.Router()
const Conteneur = require('./../models/conteneur.js')
const Modif = require('./../models/modif.js')

router.get('/new', (req,res) => {
    res.render('conteneurs/new', { conteneur: new Conteneur() })
})

router.get('/edit/:id', async (req,res) => {
    try{
    const conteneur = await Conteneur.findById(req.params.id)
    res.render('conteneurs/edit', { conteneur: conteneur })
    }catch(e){
     res.redirect('/liste3/tout')   
    }
})

router.get('/:id', async (req,res) => {
    try{
    const conteneur = await Conteneur.findById(req.params.id)
    res.render('conteneurs/show', { conteneur: conteneur })
    }catch(e){
        res.redirect('/liste3/tout') //if (article == null) 
    }
})

router.post('/', async (req,res) => {     
    let conteneur = new Conteneur({
        nomP: req.body.nomP,
        prenomP: req.body.prenomP,
        ageP: req.body.ageP,
        sexeP: req.body.sexeP,
        CIN : req.body.CIN,
        traitementAnterieur : req.body.traitementAnterieur,
        traitementenCours : req.body.traitementenCours,
        Antecedents_Allergies : req.body.Antecedents_Allergies,
        donnees_physio_bio : req.body.donnees_physio_bio
    })
    try{
    conteneur = await conteneur.save()
    res.redirect(`/conteneurs/${conteneur.id}`)
    }catch(e){
        res.render('conteneurs/new', { conteneur: conteneur})
    }
})

router.delete('/:id', async (req,res) => {
    try{
    await Conteneur.findByIdAndDelete(req.params.id)
    res.redirect('/liste3/tout')
    }catch(e){
    res.redirect('/liste3/tout')
    }
})

router.put('/:id', async (req,res) => {
    let conteneur = await Conteneur.findById(req.params.id)
	
        conteneur.nomP= req.body.nomP
        conteneur.prenomP= req.body.prenomP
        conteneur.ageP= req.body.ageP
        conteneur.sexeP= req.body.sexeP
        conteneur.CIN = req.body.CIN
        conteneur.traitementAnterieur = req.body.traitementAnterieur
        conteneur.traitementenCours = req.body.traitementenCours
        conteneur.Antecedents_Allergies = req.body.Antecedents_Allergies
        conteneur.donnees_physio_bio = req.body.donnees_physio_bio
    try{
    conteneur = await conteneur.save()
    res.redirect(`/conteneurs/${conteneur.id}`)
    }catch(e){
        res.render('conteneurs/edit', { conteneur: conteneur})
    }
})

module.exports = router