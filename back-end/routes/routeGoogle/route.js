const express = require('express');
const users=require('../../models').user

const router = express.Router()
const passport= require('passport');
const session = require('express-session');
const googleController = require('../../controllers/google/googlePassportController')
const SessionModel=require('../../modeloMongo/sessionMongodb')
const app=require('../../app')
const mongoose=require('mongoose')
const MongoStore = require('connect-mongo');




mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 // useCreateIndex: true
});


app.use(session({
  secret: 'mysecret', // secreto para firmar las cookies de sesión
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI,
  crypto: {
    secret: 'secret'
  },
  collection: 'sessions',
  // expires: 60 * 60 * 24 * 7, // 7 days
  expires: 120, // 2 minutes
  //model: SessionModel,
  
  // ttl: 24 * 60 * 60, // 1 día de vida útil })
})}));

app.use(passport.initialize());


  
    //req.session.email=user.email
  
  
  

router.get('/google', googleController);

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),async(req, res)=> {
  // console.log(req.user.dataValues.email)

  // const user2 = await users.findOne({where:{email}})
  //     if(user2){
  //      // return res.send('email existente')
  //      return cb('email existente','email existente');
  //     }
    
  
  const user1=new SessionModel
    user1.sessionID=req.sessionID
   // user1.session=user.email
   
    user1.save()
  res.redirect('http://localhost:5173/usuarioLog')


  //res.status(200).json({message: 'Success',user:{id:req.user.id,name:req.user.name,email:req.user.email}})
   
 })


module.exports = router