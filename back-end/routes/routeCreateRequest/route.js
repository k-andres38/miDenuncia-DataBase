const express=require('express');
const router= express.Router();

// const multer=require('multer')

// const upload = multer();

const requestController = require('../../controllers/createRequest/requestController');

router.put('/request/:id', requestController.request)

module.exports = router; // --> creado por farit