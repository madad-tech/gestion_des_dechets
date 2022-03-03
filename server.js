const path = require('path')
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

/*require("dotenv").config({
    path: path.join(__dirname, "./.env")
   });*/

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const conteneurRouter = require('./routes/conteneurs.js')
const cuisConteneurRouter = require('./routes/cuisConteneurs.js')
const userRouter = require('./routes/users.js')
//const routes = require('./routes/route.js');


const Modif = require('./models/modif.js')
const Article = require('./models/article.js')
const CuisArticle = require('./models/cuisArticle.js')
const User = require('./models/user.js')
const User3 = require('./models/user3.js')
const Prescription = require('./models/prescription.js')
const Conteneur = require('./models/conteneur.js')
const CuisConteneur = require('./models/cuisConteneur.js')
const router = express.Router()
const ArticleLT = require('./models/articleLT.js')
const ArticleCM = require('./models/articleCM.js')
const ArticleFourn = require('./models/articleFourn.js')
const FournMeal = require('./models/fournMeal.js')
const ArticleRet = require('./models/articleRet.js')
const CuisArticleRetour = require('./models/cuisArticleRetour.js')
const Message = require('./models/message.js')
const f = require('./UserRoles')
const CommandeRepasCuisine = require('./models/commandeRepasCuisine.js')


const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const session = require('express-session')
const passport = require('passport')
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const initializePassport = require('./passport-config')
initializePassport(passport)
const Nexmo = require('nexmo')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gestion_des_dechets');

//mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ayoub:S53oJfV3i38n2Jki@cluster0.i52k8.mongodb.net/database?retryWrites=true&w=majority');
/*mongoose.connect(uri, {  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } )
  .then(() => {
    console.log("MongoDB Connected…")
  })
  .catch(err => console.log(err))

*/
app.set('view engine', 'ejs')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))

app.use('/conteneurs', conteneurRouter)
app.use('/cuisConteneurs', cuisConteneurRouter)
app.use('/users', userRouter)

//app.use('/', routes)

app.use(bodyParser.urlencoded({ extended: true }));
/*app.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
     const accessToken = req.headers["x-access-token"];
     console.log(accessToken);
     const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
     // Check if token has expired
     if (exp < Date.now().valueOf() / 1000) { 
      return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
     } 
     res.locals.loggedInUser = await User.findById(userId); next(); 
    } else { 
     next(); 
    } 
   }); */
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())



app.get('/home',  async (req,res) => {
    res.render('home')
})

app.get('/menu', f.checkAuthenticated,  async (req,res) => {
    res.render('menu')
})

app.get('/profile', f.checkAuthenticated,  async (req,res) => {
    const users3 = await User3.find()
    if(users3[users3.length-1].role == "medecin"){
        role = "Médecin"
    }if(users3[users3.length-1].role == "pharmacien"){
        role = "Pharmacien"
    }if(users3[users3.length-1].role == "pharmacienP"){
        role = "Pharmacien préparateur"
    }if(users3[users3.length-1].role == "admin"){
        role = "Administrateur"
    }
    res.render('profile', {nom: users3[users3.length-1].name, role: role, email: users3[users3.length-1].email})
})

app.get('/acceuil',  f.checkAuthenticated, async (req,res) => {
    res.render('acceuil', {alerte : ""})
})

app.post('/acceuil',  async (req,res) => {
    /*const nexmo = new Nexmo({
        apiKey: '20b8c6a9',
        apiSecret: 'q1NKf0wIp9OnFxcL',
      });
      
      const from = 'Vonage APIs';
      const to = req.body.numero;
      const text = req.body.message;
      
      nexmo.message.sendSms(from, to, text); */
      const Vonage = require('@vonage/server-sdk');

      const vonage = new Vonage({
        apiKey: '20b8c6a9',
        apiSecret: 'q1NKf0wIp9OnFxcL'
      })
      text = req.body.message
      number = req.body.numero

      vonage.message.sendSms('DAWA', number, text, {
        type: "unicode"
      }, (err, responseData) => {
        if (err) {
          res.render('acceuil', {alerte : err})
        } else {
          if (responseData.messages[0]['status'] === "0") {
            res.render('acceuil', {alerte : "Message envoyé avec succés."})
          } else {
            res.render('acceuil', {alerte : `Message non envoyé avec erreur: ${responseData.messages[0]['error-text']}`})
          }
        }
      })
      
      
})

app.get('/logout',  async (req,res) => {
    res.render('articles/index2')
})



app.get('/Page0', f.checkAuthenticated, async (req,res) => {
    const users3 = await User3.find()
    if(users3[users3.length-1].role == "medecin"){
        role = "Médecin"
    }if(users3[users3.length-1].role == "pharmacien"){
        role = "Pharmacien"
    }if(users3[users3.length-1].role == "pharmacienP"){
        role = "Pharmacien préparateur"
    }if(users3[users3.length-1].role == "admin"){
        role = "Administrateur"
    }
	console.log(users3[users3.length-1].role)
	if(users3[users3.length-1].role == "admin"){
		res.render('Page2', {nom: users3[users3.length-1].name,
                        role: users3[users3.length-1].role
		})
	}else{
		res.render('Page0', {nom: users3[users3.length-1].name,
                        role: users3[users3.length-1].role
		})
	}
    
})
app.get('/Page', f.checkAuthenticated, async (req,res) => {
    const users3 = await User3.find()
    if(users3[users3.length-1].role == "medecin"){
        role = "Médecin"
    }if(users3[users3.length-1].role == "pharmacien"){
        role = "Pharmacien"
    }if(users3[users3.length-1].role == "pharmacienP"){
        role = "Pharmacien préparateur"
    }if(users3[users3.length-1].role == "admin"){
        role = "Administrateur"
    }
    res.render('Page', {nom: users3[users3.length-1].name,
                        role: users3[users3.length-1].role
    })
})

app.get('/Page2', f.checkAuthenticated, async (req,res) => {
    const users3 = await User3.find()
    if(users3[users3.length-1].role == "medecin"){
        role = "Médecin"
    }if(users3[users3.length-1].role == "pharmacien"){
        role = "Pharmacien"
    }if(users3[users3.length-1].role == "pharmacienP"){
        role = "Pharmacien préparateur"
    }if(users3[users3.length-1].role == "admin"){
        role = "Administrateur"
    }
    res.render('Page2', {nom: users3[users3.length-1].name,
                        role: users3[users3.length-1].role
    })
})

app.get('/Regles_hygiene', f.checkAuthenticated, async (req,res) => {
    const users3 = await User3.find()
    if(users3[users3.length-1].role == "medecin"){
        role = "Médecin"
    }if(users3[users3.length-1].role == "pharmacien"){
        role = "Pharmacien"
    }if(users3[users3.length-1].role == "pharmacienP"){
        role = "Pharmacien préparateur"
    }if(users3[users3.length-1].role == "admin"){
        role = "Administrateur"
    }
    res.render('Regles_hygiene', {nom: users3[users3.length-1].name,
                        role: role
    })
})



app.get('/cm',  async (req,res) => {
    res.render('articlesCM/show')
})

/*app.get('/cmd',  async (req,res) => {
    res.render('commandesRepasCuisine/show')
})
*/


app.get('/stats',  f.checkAuthenticated,async (req,res) => {
    const article1  = await Article.find({categorie: "paracétamol"})
    const article2  = await Article.find({categorie: "antiinflammatoires"})
    const article3  = await Article.find({categorie: "neurologie"})
    const article4  = await Article.find({categorie: "rhumatologie"})
    const article5  = await Article.find({categorie: "antibiotiques"})
    const article6  = await Article.find({categorie: "anesthésiques"})
    console.log(article2.length)
    res.render('statistiques',{ cat1 : article1.length,
                                cat2 : article2.length,
                                cat3 : article3.length,
                                cat4 : article4.length,
                                cat5 : article5.length,
                                cat6 : article6.length,
    } )
})

app.get('/liste2/:p',  f.checkAuthenticated,async (req,res) => {
    try{
        if(req.params.p ==  "true" || req.params.p == "false"){
    const prescriptions = await Prescription.find({Valid: req.params.p}).sort({createdAt: 'desc' })
    res.render('prescriptions/index', { prescriptions: prescriptions})
        }
        if(req.params.p ==  "tout"){
            const prescriptions = await Prescription.find().sort({createdAt: 'desc' })
            res.render('prescriptions/index', { prescriptions: prescriptions})
                }else{
    const prescriptions = await Prescription.find({ CIN: { $regex: req.params.p }  }).sort({createdAt: 'desc' })
    res.render('prescriptions/index', { prescriptions: prescriptions})    
        }
    }catch(e){
        console.log('chargement impossible')
    }
})

app.post('/liste2',async (req,res) => { 
    try{
        if (req.body.request3 == "true" || req.body.request3 == "false" || req.body.request3 == "tout"){
            res.redirect('/liste2/' + req.body.request3) 
        }else{
            res.redirect('/liste2/' + req.body.request4)  
        }
    }catch(e){
        console.log('chargement impossible')
    }
}) 

app.get('/liste3/:p', f.checkAuthenticated, f.checkNonPharmacienP, async (req,res) => {
    try{
    if ( req.params.p == "tout" ){
        const conteneurs = await Conteneur.find().sort({createdAt: 'desc' })
        res.render('conteneurs/index', { conteneurs: conteneurs })
    }
    else{
        const conteneurs = await Conteneur.find({ nomP: { $regex: req.params.p }  }).sort({createdAt: 'desc' })
        res.render('conteneurs/index', { conteneurs: conteneurs })
    }
    }catch(e){
        console.log('chargement impossible')
    }
})

app.post('/liste3', async (req,res) => {
    try{
        if (req.body.request2 == "tout"){
            res.redirect('/liste3/' + req.body.request2) 
        }else{
            res.redirect('/liste3/' + req.body.request)  
        }
    }catch(e){
        console.log('chargement impossible')
    }
}) 

app.get('/listeCt/:p', f.checkAuthenticated,async (req,res) => {
    try{
    if ( req.params.p == "tout" ){
        const cuisConteneurs = await CuisConteneur.find().sort({dateC: 'desc' })
        res.render('cuisConteneurs/index', { cuisConteneurs: cuisConteneurs })
    }
    else{
        const cuisConteneurs = await CuisConteneur.find({ typeC: { $regex: req.params.p }  }).sort({dateC: 'desc' })
        res.render('cuisConteneurs/index', { cuisConteneurs: cuisConteneurs })
    }
    }catch(e){
        console.log('chargement impossible')
    }
})

app.post('/listeCt', async (req,res) => {
    try{
        if (req.body.request2 == "tout"){
            res.redirect('/listeCt/' + req.body.request2) 
        }else{
            res.redirect('/listeCt/' + req.body.request)  
        }
    }catch(e){
        console.log('chargement impossible')
    }
})

 

/*app.get('/liste5', f.checkAuthenticated,f.checkNonMedecin,f.checkNonPharmacien, async (req,res) => {
    try{
    const articlesCM = await ArticleCM.find().sort({createdAt: 'desc' })
    res.render('articlesCM/index', { articlesCM: articlesCM })
    }catch(e){
        console.log('chargement impossible')
    }
}) 
*/
//, f.checkAuthenticated,f.checkNonPharmacienP, f.checkNonMedecin, f.checkNonPharmacien
app.get('/listeusers', f.checkAuthenticated,f.checkNonEmploye, async (req,res) => {
    try{
		const users = await User.find()
		res.render('users/index', { users: users })
    }catch(e){
        console.log('chargement impossible')
    }
}) 

app.get('/', f.checkNotAuthenticated, (req,res) => {
    res.render('articles/login') })
	



// f.checkAuthenticated, f.checkNonMedecin,f.checkNonPharmacien, f.checkNonPharmacienP,
app.get('/register', (req,res) => {
    res.render('articles/register')
})

app.get('/reclamation', (req,res) => {
    res.render('réclamation')
})

app.post('/register', async (req,res) => {  
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
			active : 0,
        })
        user = await user.save()
        res.redirect('/')
    }catch(e){
        res.redirect('/register') 
    }
    
})

app.post('/l',passport.authenticate('local', {
    successRedirect: '/Page0',
    failureRedirect: '/',
    failureFlash: true
}))
app.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.render('articles/login', { AlerteAuth: info.message })
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/Page0');
    });
  })(req, res, next);
});

app.delete('/logout', async (req,res) => {
    req.logOut()
    try{
        await User3.deleteMany({ email: { $regex: "@" } })
        console.log("réussi")
        }catch(e){
        console.log("échec")
        }
    res.redirect('/')
})



let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
const server = app.listen(port, function () {
    console.log(`Listening on port ${port}`);
    console.log(`http://localhost:${port}`);
  });
//app.listen(port);

/*const users3 = await User3.find()
console.log(users3.length)*/

// CODE DE CHAT
app.use(express.static("public")) // Permettre à l'HTML d'utiliser tous ces fichiers (css, js...)
app.use(express.static("client"))
app.use(express.static("changement2"))

app.get('/changementEMAIL', f.checkAuthenticated, async (req,res)=>{  
    res.render('changementEMAIL', {alerte: ''})
})
app.put('/changementEMAIL', async (req,res) => {
    try{
        const users3 = await User3.find()
        console.log(users3.length)
        let user = await User.findOne({email: users3[users3.length-1].email})
        console.log(req.body.email + '  ' +  typeof req.body.email) 
        if(req.body.email == req.body.email2){
            user.email = req.body.email
            users3[users3.length-1].email = req.body.email
        try{
            user = await user.save()
            users3[users3.length-1] = await users3[users3.length-1].save()
        res.render('changementEMAIL', {alerte: 'Email changé avec succés !'})
        }catch(e){
        res.render('changementEMAIL', {alerte: 'Impossible de changer votre email !'})
        }
       }else{
        res.render('changementEMAIL', {alerte: 'Les deux emails ne sont pas les mêmes !'})
       }
       
        }catch(e){
            console.log('chargement impossible')
        }
})

app.get('/changementNOM', f.checkAuthenticated, async (req,res)=>{  
    res.render('changementNOM', {alerte: ''})
})
app.put('/changementNOM', async (req,res) => {
    try{
        const users3 = await User3.find()
        let user = await User.findOne({email: users3[users3.length-1].email}) 
        console.log(req.body.nom + typeof req.body.nom)
        if(req.body.nom == req.body.nom2){
        user.name = req.body.nom
        users3[users3.length-1].name = req.body.nom
        try{
        user = await user.save()
        users3[users3.length-1] = await users3[users3.length-1].save()
        res.render('changementNOM', {alerte: 'Nom changé avec succés !'})
        }catch(e){
        res.render('changementNOM', {alerte: 'Impossible de changer votre nom !'})
        }
       }else{
        res.render('changementNOM', {alerte: 'Les deux noms ne sont pas les mêmes !'})
       }
       
        }catch(e){
            console.log('chargement impossible')
        }
})

app.get('/changement', f.checkAuthenticated, async (req,res)=>{  
    res.render('index', {alerte: '', alerte2: ''})
})
app.put('/changement', async (req,res) => {
    try{
        const users3 = await User3.find()
        let user = await User.findOne({email: users3[users3.length-1].email}) 
        if(await bcrypt.compare(req.body.password1, user.password)){
        if (req.body.password2 == req.body.password3){
        const hashedPassword = await bcrypt.hash(req.body.password2, 10)
        user.password = hashedPassword
        try{
        user = await user.save()
        res.render('index', {alerte: 'Mot de passe changé avec succés !', alerte2: ''})
        }catch(e){
        res.render('index', {alerte: 'Changement de mot de passe impossible !', alerte2: ''})
        }
       }else{
        res.render('index', {alerte: 'Mots de passe différents !', alerte2: ''}) 
       }
       }else{
        res.render('index', {alerte: 'Ancien mot de passe incorrect !', alerte2: ''}) 
       }
        }catch(e){
            console.log('chargement impossible')
        }
})

app.get('/chat', async (req,res)=>{  
    res.sendFile(__dirname + '/client/index.html')
});

const io = require("socket.io")(server)
let randomColor = require('randomcolor')
const uuid = require('uuid')

const users = [];
const connnections = [];
//à chaque connexion voici ce qui va se passer:
io.on('connection', (socket) => {
    connnections.push(socket)

    //on initialise la couleur, le nom d'utilisateur et la couleur qui sera associé à chaque utilisateur connecté à travers son socket
    socket.username = 'Anonyme'
    socket.color = randomColor()

    //écouter le changement d'utilisateur
    socket.on('change_username', async data => {
        const users3 = await User3.find()
        let id = uuid.v4(); // on crée un id aléatoire
        socket.id = id; // on l'attribue au socket
        //data.nickname (au lieu de user3(0) si on a envie d'entrer le pseudonyme manuellement)
        socket.username = users3[users3.length-1].name; // le nicknamle sera crée lors du socket.emit pr l'instant on l'attribue au username du socket
        users.push({id, username: socket.username, color: socket.color}); // on remplie le tableau users avec un objet user (id, usernale, color)
        updateUsernames(); //on émet le users
    })

    //on met à jour les usernames pr le client
    const updateUsernames = () => {
        io.sockets.emit('get users',users)
    }

    //réception d'un message lors de son émission par le socket
    socket.on('new_message', async (data) => {
        //on émet le message dès sa réception tout en ajoutant le username et la couleur
           let message = new Message({
              content: data.message,
              username : socket.username,
              color: socket.color
              })
        try{
            message = await message.save()
        }catch(e){
            console.log("sauvegarde message échouée")
        }
        const messages = await Message.find()
        console.log("Le nombre de messages stockés: "+ messages.length)
        var todayDate = new Date(message.createdAt); //Today Date
        
        date = todayDate.getFullYear()+ '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate() +  ' ' +todayDate.getHours() + 'h' + todayDate.getMinutes() + 'min' + todayDate.getSeconds() + 's'
        io.sockets.emit('new_message', {message : data.message, username : socket.username,color: socket.color, createdAt: date});
       })

       //lister les messages existants
   
            const fonction = async () => { 
                messages = await Message.find({}).sort({ createdAt: +1 })            
                messages.forEach(message => {
                    var todayDate = new Date(message.createdAt); //Today Date
        
                    date = todayDate.getFullYear()+ '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate() +  ' ' +todayDate.getHours() + 'h' + todayDate.getMinutes() + 'min' + todayDate.getSeconds() + 's'
                    socket.emit("new_message", {message : message.content, username : message.username,color: message.color, createdAt: date}) 
                })
                  
                }
        fonction()
       
    //écouter l'écriture d'un message
    socket.on('typing', data => {
        socket.broadcast.emit('typing',{username: socket.username})
    })

    //Déconnexion
    socket.on('disconnect', data => {

        if(!socket.username)
            return;
        //si le username du socket est introuvable trouver le dans la table users puis splicer le (supprimer)
        let user = undefined;
        for(let i= 0;i<users.length;i++){
            if(users[i].id === socket.id){
                user = users[i];
                break;
            }
        }
        users.splice(user,1);
        //on émet la liste des utilisateurs encore une fois, après l'opération de suppression
        updateUsernames();
        connnections.splice(connnections.indexOf(socket),1);// on enlève la connection du dit socket du tableau connections
    })
})



//  https://02cbeda8b6b5.ngrok.io





