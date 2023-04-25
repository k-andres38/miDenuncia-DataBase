const modeloUser = require("../../models").user;
const modelsRole =require("../../models").role;
const { Op } = require('sequelize');
exports.infoUser = async (req, res, next) => {
  try {
    //console.log(req.query.filtro)
    if (req.query.filtro) {
       // console.log(req.body)
       await modeloUser.findAll({paranoid: false,where:{
        [Op.or]: [
            { nickname: req.query.filtro },
            { name: req.query.filtro },
            { staff_neighborhood: req.query.filtro },
            
            { role_id: req.query.filtro },
          ],
          
       },include:[
        {model:modelsRole}
      ],  
      
    
    }).then(data=>{
      //  console.log(data)
        res.status(200).json(data)
       }).catch(msg=>res.status(400).json({message:"No hay Infomación"}))
    } else {
        await  modeloUser.findAll({
          paranoid: false,
          include:[
            {model:modelsRole}
          ],
         
        }).then((data)=>{
              res.status(200).json(data)
          }).catch((err) => next(err))
    }
  } catch (error) {
    res.send(error);
  }
};
