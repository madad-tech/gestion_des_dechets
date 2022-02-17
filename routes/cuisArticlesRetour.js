const express = require('express')
const router = express.Router()
const CuisArticleRetour = require('./../models/cuisArticleRetour.js')

router.get('/new', (req,res) => {
    res.render('cuisArticlesRetour/new', { cuisArticleRetour: new CuisArticleRetour() })
})

router.get('/edit/:id', async (req,res) => {
    try{
    const cuisArticleRetour = await CuisArticleRetour.findById(req.params.id)
    res.render('cuisArticlesRetour/edit', { cuisArticleRetour: cuisArticleRetour })
    }catch(e){
     res.redirect('/listeRt/tout')   
    }
})

router.get('/:id', async (req,res) => {
    try{
    const cuisArticleRetour = await CuisArticleRetour.findById(req.params.id)
    res.render('cuisArticlesRetour/show', { cuisArticleRetour:cuisArticleRetour })
    }catch(e){
        res.redirect('/listeRt/tout') //if (article == null) 
    }
})
//unitéSoin med quantité  motif validation commentaire
 
router.post('/', async (req,res) => { 
    let cuisArticleRetour = new CuisArticleRetour({  
        TypeRepas: req.body.TypeRepas,
        Poids : Number(req.body.Poids),
        CompositionPl: req.body.CompositionPl,
        TypeTri: req.body.TypeTri,
        TypeRecyclage: req.body.TypeRecyclage
    })
    try{
    cuisArticleRetour = await cuisArticleRetour.save()
    res.redirect(`/cuisArticlesRetour/${cuisArticleRetour.id}`)
    }catch(e){
        res.render('cuisArticlesRetour/new', { cuisArticleRetour: cuisArticleRetour})
    }
})

router.delete('/:id', async (req,res) => {
    try{
    await CuisArticleRetour.findByIdAndDelete(req.params.id)
    res.redirect('/listeRt/tout')
    }catch(e){
    res.redirect('/listeRt/tout')
    }
})

router.put('/:id', async (req,res) => {
    let cuisArticleRetour = await CuisArticleRetour.findById(req.params.id)
        cuisArticleRetour.TypeRepas = req.body.TypeRepas
        cuisArticleRetour.Poids = Number(req.body.Poids)
        cuisArticleRetour.CompositionPl = req.body.CompositionPl
        cuisArticleRetour.TypeTri = req.body.TypeTri
        cuisArticleRetour.TypeRecyclage = req.body.TypeRecyclage
        
    try{
    cuisArticleRetour = await cuisArticleRetour.save()
    res.redirect(`/cuisArticlesRetour/${cuisArticleRetour.id}`)
    }catch(e){
        res.render('cuisArticlesRetour/edit', { cuisArticleRetour: cuisArticleRetour})
    }
})

module.exports = router