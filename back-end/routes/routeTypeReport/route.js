const express = require('express')
const router = express.Router()
const typeReportController = require('../../controllers/typeReport/typeReportController')

router.post('/typeReport', typeReportController.typeReport)

module.exports = router // creado por farit