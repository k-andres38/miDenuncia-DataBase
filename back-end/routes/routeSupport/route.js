
const express = require('express')
const router = express.Router()
const supportController = require('../../controllers/support/supportController')


router.post('/support', supportController.support)


module.exports = router // creado por farit


