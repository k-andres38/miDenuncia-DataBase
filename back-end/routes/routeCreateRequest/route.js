const express=require('express');
const router= express.Router();

const path = require('path');

const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const requestController=require('../../controllers/createRequest/requestController')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME_AUTH,
    api_key: process.env.API_KEY_AUTH,
    api_secret: process.env.API_SECRET_AUTH
  });
  
  // Configuración de Multer y Cloudinary Storage
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'peticiones',
      allowed_formats: ['jpg', 'png'],
      public_id: (req, file) => `${Date.now()}-${file.originalname}`
    }
  });
  
  const upload = multer({ storage: storage });
  

router.post('/request/:id',upload.array('url[]'), requestController.request)

module.exports = router; // --> creado por farit

