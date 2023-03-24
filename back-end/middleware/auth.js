const jwt = require('jsonwebtoken');
const modeloUser = require('../models').user;
const modeloRol = require('../models').role;


module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'Authorization required' }); 
  } else {
    let token = req.headers.authorization.split(" ")[1];
   

    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.status(500).json({ message: 'Error verificando el token', err }); 
      } else {
       
        modeloUser.findByPk(decoded.user.id, { include: [modeloRol] })
          .then((user) => {
           
            if (!user) {
              return res.status(404).json({ message: 'Usuario no encontrado en la base de datos' }); 
            }
            req.user = { id: user.id, email: user.email, roles: user.roles }; 
            next();
          })
          .catch((err) => {
            return res.status(500).json({ message: 'Error buscando el usuario en la base de datos', err });
          });
      }
    });
  }
};