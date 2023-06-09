const modeloUser = require("../../models").user;
const modelsDocument=require("../../models").document;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { where } = require("sequelize");
dotenv.config();

exports.signIn = async (req, res, next) => {
  try {
    let { nickname, password } = req.body;
    
    await modeloUser
      .findOne({
      
        where: { nickname },
       //   attributes: ["id","nickname","password","last_name","staff_neighborhood","token","contact_phone","address","document_id"],
  
          include:[
          {model:modelsDocument,
            attributes: ["type","place_dispatch"]
          }
        ]
      })
      .then((user) => {
       

      // const doc= modelsDocument.findOne({where: {id: user.document_id}})
        if (!user ) {
          res
            .status(400)
            .json({ message: "Usuario con este correo no encontrado" });
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            
            let token = jwt.sign(
              {
                user
              },
              process.env.JWT_SECRET,
              { expiresIn: "1h" }
            );
            user.update(token)
            user.save();

            if(user.document_id==null){
              res.json({
                // user
             
                 id: user.id,
                 nickname: user.nickname,
                 name: user.name,
                 last_name: user.last_name,
                 contact_phone: user.contact_phone,
                  address: user.address,
                  staff_neighborhood: user.staff_neighborhood,
                  document_id: user.document_id,
                 type:null,
                 place_dispatch:null,
                  token,
                 
              })

            }else{
              res.json({
                // user
             
                 id: user.id,
                 nickname: user.nickname,
                 name: user.name,
                 last_name: user.last_name,
                 contact_phone: user.contact_phone,
                  address: user.address,
                  staff_neighborhood: user.staff_neighborhood,
                  document_id: user.document_id,
                 type:user.document.type,
                 place_dispatch:user.document.place_dispatch,
                  token,
                 
              })
            }
          
           
           
               
             
           
          } else {
            res.status(401).json({ message: "contraseña no es correcta" });
          }
        }
      })
      .catch((err) => {
        res.status(400).json({ message: "error de autenticacion" });
      });
  } catch (error) {
    res.status(500).json({ mensaje: error });
  }
};
