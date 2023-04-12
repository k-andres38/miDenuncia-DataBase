const express=require('express');
const router= express.Router();

const requestController = require('../../controllers/createRequest/requestController');

router.put('/request/:id', requestController.request)

module.exports = router; // --> creado por farit