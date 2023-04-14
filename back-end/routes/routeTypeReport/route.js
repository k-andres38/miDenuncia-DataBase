const express = require('express')
const router = express.Router()
const typeReportController = require('../../controllers/typeReport/typeReportController')
const infoTypeReport = require('../../controllers/typeReport/infoRepoertController')

router.post('/typeReport', typeReportController.typeReport)
router.get('/infotypeReport', infoTypeReport.inforeport)

module.exports = router // creado por farit