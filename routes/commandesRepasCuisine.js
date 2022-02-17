const express = require('express')
const router = express.Router()
const CommandeRepasCuisine = require('./../models/commandeRepasCuisine.js')

router.get('/new', (req,res) => {
    res.render('commandesRepasCuisine/new', { commandeRepasCuisine: new CommandeRepasCuisine() })
})

router.get('/edit/:id', async (req,res) => {
    try{
    const commandesRepasCuisine = await CommandeRepasCuisine.findById(req.params.id)
    res.render('commandesRepasCuisine/edit', { commandeRepasCuisine: commandeRepasCuisine })
    }catch(e){
     res.redirect('/listeCmdRepas/tout')   
    }
})

router.get('/:id', async (req,res) => {
    try{
    const commandeRepasCuisine = await CommandeRepasCuisine.findById(req.params.id)
    res.render('commandesRepasCuisine/show', { commandeRepasCuisine : commandeRepasCuisine })
    }catch(e){
        res.redirect('/listeCmdRepas/tout') //if (article == null) 
    }
})

router.post('/', async (req,res) => {     
    let commandeRepasCuisine = new CommandeRepasCuisine({
        service: req.body.service,
        meal : req.body.meal,
        quantité: Number(req.body.quantité) ,
        nomF: req.body.nomF,  
        dateLivraison: req.body.dateLivraison,
        quantitélivrée: req.body.quantitélivrée,
        validationLivraison: req.body.validationLivraison
    })
    try{
    commandeRepasCuisine = await commandeRepasCuisine.save()
    res.redirect(`/commandesRepasCuisine/${commandeRepasCuisine.id}`)
    }catch(e){
        res.render('commandesRepasCuisine/new', { commandeRepasCuisine: commandeRepasCuisine})
    }
})

router.delete('/:id', async (req,res) => {
    try{
    await CommandeRepasCuisine.findByIdAndDelete(req.params.id)
    res.redirect('/listeCmdRepas/tout')
    }catch(e){
    res.redirect('/listeCmdRepas/tout')
    }
})

router.put('/:id', async (req,res) => {
    let commandeRepasCuisine = await CommandeRepasCuisine.findById(req.params.id)
    commandeRepasCuisine.service = req.body.service,
    commandeRepasCuisine.meal = req.body.meal,
    commandeRepasCuisine.quantité = Number(req.body.quantité) ,
    commandeRepasCuisine.nomF = req.body.nomF,  
    commandeRepasCuisine.dateLivraison = req.body.dateLivraison,
    commandeRepasCuisine.quantitélivrée = req.body.quantitélivrée,
    commandeRepasCuisine.validationLivraison = req.body.validationLivraison
    try{
    commandeRepasCuisine = await commandeRepasCuisine.save()
    res.redirect(`/commandesRepasCuisine/${commandeRepasCuisine.id}`)
    }catch(e){
        res.render('commandesRepasCuisine/edit', { commandeRepasCuisine: commandeRepasCuisine})
    }
})

module.exports = router