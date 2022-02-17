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
        nomP: req.body.nomP,
        prenomP: req.body.prenomP,
        ageP: req.body.ageP,
        sexeP: req.body.sexeP,
        CIN : req.body.CIN,
        Antecedents_Allergies : req.body.Antecedents_Allergies,
        service : req.body.service
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
        cuisPatient.nomP= req.body.nomP
        cuisPatient.prenomP= req.body.prenomP
        cuisPatient.ageP= req.body.ageP
        cuisPatient.sexeP= req.body.sexeP
        cuisPatient.CIN = req.body.CIN
        cuisPatient.Antecedents_Allergies = req.body.Antecedents_Allergies
        cuisPatient.service = req.body.service
    try{
    cuisPatient = await cuisPatient.save()
    res.redirect(`/cuisPatients/${cuisPatient.id}`)
    }catch(e){
        res.render('cuisPatients/edit', { cuisPatient: cuisPatient})
    }
})

module.exports = router