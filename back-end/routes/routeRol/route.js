
const express = require('express')
const router = express.Router()
const infoRolController = require('../../controllers/rol/infoRolController')


router.get('/inforol', infoRolController.infoRoles)


module.exports = router // creado por farit