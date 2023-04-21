const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file)
    cb(null, path.join(__dirname, '../public/upload') );
  },
  filename: function (req, file, cb) {
    
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

// const fileFilter = function (req, file, cb) {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('El archivo no es una imagen.'), false);
//   }
// };

// const upload = multer({ storage: storage, fileFilter: fileFilter });

// const requestController = require('../../controllers/createRequest/requestController');

module.exports = storage


