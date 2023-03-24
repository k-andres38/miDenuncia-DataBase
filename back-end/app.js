const dotenv = require('dotenv');
const express = require('express')
const cors = require('cors')
const sgMail=require('./services/sendgrid')
const { auth } = require('express-openid-connect');
const morgan = require('morgan')
const app = express()
const routes = require('./routes/routeUsers/route')
const routesComment = require('./routes/routeComments/route')
const routeRequest=require('./routes/routeRequest/route')
const handleError = require('./handlers/handlerError')
const userAuth0 = require('./routes/routeUsers/routeUSerAuth0')
dotenv.config()

const config=require('./middleware/authUser')
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


app.use(cors());

app.use(morgan('tiny'));


app.use('/',auth(config),userAuth0 )
app.use('/',routes)
app.use('/',routeRequest)
app.use('/', routesComment)





app.use(handleError)

const port = process.env.PORT || 4000;
if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
  config.baseURL = `http://localhost:${port}`;
}

app.listen(port, console.log('el server escuchando por el puerto ' + port))

module.exports = {
    app
};
