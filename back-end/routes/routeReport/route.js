const express=require('express')//toca tener expres para importar router
const router= express.Router();//esto es la ruta para que el endPoint pueda verlo y de aqui en adelnate usamos esa ¿varle?
const createReportController=require('../../controllers/report/createReportController');//esto ese estamos importando de los cont
const infoReportController= require('../../controllers/report/infoReportController')



router.post('/createreport/:user/:request/:typeReport',createReportController.createReport)
router.get('/infoReport/',infoReportController.inforeport)




module.exports=router 