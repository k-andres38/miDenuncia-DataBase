
const app=require('./app')


////aqui hacemos las importaciones y que todo quede dentro de ella
//const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const sgMail=require('./services/sendgrid')
const session = require('express-session');
//const { auth } = require('express-openid-connect');
const morgan = require('morgan')
dotenv.config()

const passport= require('passport');

//FIN
////////////////////////////////////////////////////////////////

///aqui se LLAMAN A A LAS RUTAS las rutas generales y que todo quede dentro de ella
const routes = require('./routes/routeUsers/route')
const routesComment = require('./routes/routeComments/route')
const routeRequest=require('./routes/routeRequest/route')

//FIN
////////////////////////////////////////////////////////////////


/// codigo especial para procesar solicitudes HTTP y expres json lo convierta en json
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors()); //proteccion de cabecera
//app.use(morgan('tiny'));//monitoreo de solicitudes
////////////////////////////////////////////////////////////////

///aqui se configura la ENTRADA  A LAS RUTAS trabajando  solo rutas

app.use('/',routes)
app.use('/',routeRequest)
app.use('/', routesComment)

//FIN
////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////
//INICIO
//codigo especial para los usuarios de GOOGLE
app.use(session({
  secret: 'MIDENUNCIA',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


require('./middleware/auth2UserGoogle')


app.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),(req, res)=> {
 
    res.status(200).json({message: 'success',data:req.user});
    
  });

  
//FIN
////////////////////////////////////////////////////////////////

 

const port= 4000

app.listen(port, () => {
  console.log('El servidor está escuchando en el puerto ' + port);
});
