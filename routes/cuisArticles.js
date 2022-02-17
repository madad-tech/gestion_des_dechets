const express = require('express')
const router = express.Router()
const CuisArticle = require('./../models/cuisArticle.js')

router.get('/new', (req,res) => {
    res.render('cuisArticles/new', { cuisArticle: new CuisArticle() })
})

router.get('/edit/:id', async (req,res) => {
    try{
    const cuisArticle = await CuisArticle.findById(req.params.id)
    res.render('cuisArticles/edit', { cuisArticle: cuisArticle })
    }catch(e){
     res.redirect('/listeStock/tout')   
    }
})

router.get('/:slug', async (req,res) => {
    try{
    const cuisArticle = await CuisArticle.findOne({slug: req.params.slug})
    res.render('cuisArticles/show', { cuisArticle: cuisArticle })
    }catch(e){
        res.redirect('/listeStock/tout') //if (article == null) 
    }
})

router.post('/', async (req,res) => {
    let cuisArticle = new CuisArticle({
        nom: req.body.nom,
        Nlot: req.body.Nlot,
        datePeremption: new Date(req.body.datePeremption),
        prix: Number(req.body.prix),
        codeP: req.body.codeP,
        categorie: req.body.categorie,
        sP: Number(req.body.sP),
    })
    try{
    cuisArticle = await cuisArticle.save()
    res.redirect(`/cuisArticles/${cuisArticle.slug}`)
    }catch(e){
        res.render('cuisArticles/new', { cuisArticle: cuisArticle})
    }
})

router.delete('/:id', async (req,res) => {
    try{
    await CuisArticle.findByIdAndDelete(req.params.id)
    res.redirect('/listeStock/tout')
    }catch(e){
    res.redirect('/listeStock/tout')
    }
})

router.put('/:id', async (req,res) => {
    let cuisArticle = await CuisArticle.findById(req.params.id)
        cuisArticle.nom = req.body.nom
        cuisArticle.Nlot= req.body.Nlot
        cuisArticle.datePeremption= new Date(req.body.datePeremption)
        cuisArticle.prix= Number(req.body.prix)
        cuisArticle.codeP= req.body.codeP
        cuisArticle.categorie= req.body.categorie
        cuisArticle.sP= Number(req.body.sP)
    try{
    cuisArticle = await cuisArticle.save()
    console.log(req.body.datePeremption)
    res.redirect(`/cuisArticles/${cuisArticle.slug}`)
    }catch(e){
        res.render('cuisArticles/edit', { cuisArticle: cuisArticle})
    }
})

router.put('/ajouter/:id', async (req,res) => {
    let cuisArticle = await CuisArticle.findById(req.params.id)
        cuisArticle.sP = cuisArticle.sP + 1
    try{
    cuisArticle = await cuisArticle.save()
    res.redirect('/listeStock/tout')
    }catch(e){
        res.redirect('/listeStock/tout')
    }
})

router.put('/diminuer/:id', async (req,res) => {
    let cuisArticle = await CuisArticle.findById(req.params.id)
        cuisArticle.sP = cuisArticle.sP - 1
    try{
    cuisArticle = await cuisArticle.save()
    res.redirect('/listeStock/tout')
    }catch(e){
        res.redirect('/listeStock/tout')
    }
})


module.exports = router