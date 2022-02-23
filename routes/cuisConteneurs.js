const express = require('express')
const router = express.Router()

const CuisConteneur = require('./../models/cuisConteneur.js')
const Modif = require('./../models/modif.js')
const User3 = require('./../models/user3.js')
const f = require('./../UserRoles')

router.get('/new', (req,res) => {
    res.render('cuisConteneurs/new', { cuisConteneur: new CuisConteneur() })

})

router.get('/edit/:id', async (req,res) => {
    try{

    const cuisConteneur = await CuisConteneur.findById(req.params.id)
    res.render('cuisConteneurs/edit', { cuisConteneur: cuisConteneur })
    }catch(e){
     res.redirect('/listeCt/tout')   

    }
})

router.get('/:id', async (req,res) => {

	 const users3 = await User3.find()
    
    try{
    const cuisConteneur = await CuisConteneur.findById(req.params.id)
	const modif = await Modif.find({c_id : req.params.id})
		if (users3[users3.length-1].role != "employe"){
			res.render('cuisConteneurs/show', { cuisConteneur: cuisConteneur , modif : modif })
		}else{
			res.render('cuisConteneurs/show', { cuisConteneur: cuisConteneur , modif : ""})
		}
	}catch(e){
        res.redirect('/listeCt/tout') //if (article == null) 
    }
})

router.get('/:id',async (req,res) => {
    try{
    const cuisConteneur = await CuisConteneur.findById(req.params.id)
   
    res.render('cuisConteneurs/show', { cuisConteneur: cuisConteneur})
    }catch(e){
        res.redirect('/listeCt/tout') //if (article == null) 

    }
})

router.post('/', async (req,res) => {     

    let cuisConteneur = new CuisConteneur({
        typeC: req.body.typeC,
        nombreC: req.body.nombreC,
        dateC: req.body.dateC,
        montantC: req.body.montantC,
        coutant : req.body.coutant,
        poids : req.body.poids,
        commentaire : req.body.commentaire
    })
    try{
    cuisConteneur = await cuisConteneur.save()
    res.redirect(`/cuisConteneurs/${cuisConteneur.id}`)
    }catch(e){
        res.render('cuisConteneurs/new', { cuisConteneur: cuisConteneur})
    }
})

router.delete('/:id', async (req,res) => {
    try{
    await CuisConteneur.findByIdAndDelete(req.params.id)
    res.redirect('/listeCt/tout')
    }catch(e){
    res.redirect('/listeCt/tout')
    }
})

router.put('/:id', async (req,res) => {

	const users3 = await User3.find()

	
    let cuisConteneur = await CuisConteneur.findById(req.params.id)
	let modifs=[]
	let conteneur=cuisConteneur["_doc"]
	for(let key of Object.keys(conteneur)) {
		//console.log(conteneur[key],req.body[key],Object.keys(conteneur))
		if(conteneur[key] != req.body[key] & req.body[key]!=undefined){
			let modif = new Modif({
				user : users3[users3.length-1].name,
				shema : "Conteneur",
				c_id : req.params.id,
				key : key,
				old : conteneur[key],
				new : req.body[key]
			})
			modifs.push(modif)
			cuisConteneur[key] = req.body[key]
		
		}
	}
    console.log(cuisConteneur)
		
    try{
		cuisConteneur = await cuisConteneur.save()
		for(let mod of modifs){
			await mod.save()
		}
		res.redirect(`/cuisConteneurs/${cuisConteneur.id}`)
    }catch(e){
        res.render('cuisConteneurs/edit', { cuisConteneur: cuisConteneur})
    }
})

module.exports = router