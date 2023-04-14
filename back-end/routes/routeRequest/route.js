const express=require('express')//toca tener expres para importar router
const router= express.Router();//esto es la ruta para que el endPoint pueda verlo y de aqui en adelnate usamos esa ¿varle?
const createRequestController=require('../../controllers/request/createRequestController');//esto ese estamos importando de los cont
const deleteRequestController=require('../../controllers/request/deleteRequestController');
const updateRequestController=require('../../controllers/request/updateRequestController');
const countRequestController=require('../../controllers/request/countRequestController');


router.post('/createRequest',createRequestController.createRequest)
router.delete('/deleteRequest/:id',deleteRequestController.deleteRequest)
router.put('/updateRequest/:id',updateRequestController.updateRequest)
router.get('/count/',countRequestController.count)

module.exports=router 