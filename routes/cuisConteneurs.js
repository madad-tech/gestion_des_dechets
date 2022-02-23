const express = require('express')
const router = express.Router()
const CuisPatient = require('./../models/cuisPatient.js')

router.get('/new', (req,res) => {
    res.render('cuisPatients/new', { cuisPatient: new CuisPatient() })
})

router.get('/edit/:id', async (req,res) => {
    try{
    const cuisPatient = await CuisPatient.findById(req.params.id)
    res.render('cuisPatients/edit', { cuisPatient: cuisPatient })
    }catch(e){
     res.redirect('/listePt/tout')   
    }
})

router.get('/:id', async (req,res) => {
    try{
    const cuisPatient = await CuisPatient.findById(req.params.id)
    res.render('cuisPatients/show', { cuisPatient: cuisPatient })
    }catch(e){
        res.redirect('/listePt/tout') //if (article == null) 
    }
})

router.post('/', async (req,res) => {     
    let cuisPatient = new CuisPatient({
        typeC: req.body.typeC,
        nombreC: req.body.nombreC,
        dateC: req.body.dateC,
        montantC: req.body.montantC,
        coutant : req.body.coutant,
        poids : req.body.poids,
        commentaire : req.body.commentaire
    })
    try{
    cuisPatient = await cuisPatient.save()
    res.redirect(`/cuisPatients/${cuisPatient.id}`)
    }catch(e){
        res.render('cuisPatients/new', { cuisPatient: cuisPatient})
    }
})

router.delete('/:id', async (req,res) => {
    try{
    await CuisPatient.findByIdAndDelete(req.params.id)
    res.redirect('/listePt/tout')
    }catch(e){
    res.redirect('/listePt/tout')
    }
})

router.put('/:id', async (req,res) => {
    let cuisPatient = await CuisPatient.findById(req.params.id)
        cuisPatient.typeC= req.body.typeC
        cuisPatient.nombreC= req.body.nombreC
        cuisPatient.dateC= req.body.dateC
        cuisPatient.montantC= req.body.montantC
        cuisPatient.coutant = req.body.coutant
        cuisPatient.poids = req.body.poids
        cuisPatient.commentaire = req.body.commentaire
    try{
    cuisPatient = await cuisPatient.save()
    res.redirect(`/cuisPatients/${cuisPatient.id}`)
    }catch(e){
        res.render('cuisPatients/edit', { cuisPatient: cuisPatient})
    }
})

module.exports = router