const modeloUser = require("../../models").user;
const modelsRole = require("../../models").role;
const { Op } = require("sequelize");
exports.infoUser = async (req, res, next) => {
  try {
    //filtrar por filtro de nombres
    if (req.query.filtro) {
      await modeloUser
        .findAll({
          paranoid: false,
          where: {
            [Op.or]: [
              { nickname: req.query.filtro },
              { name: req.query.filtro },
              { staff_neighborhood: req.query.filtro },

              { role_id: req.query.filtro },
            ],
          },
          include: [{ model: modelsRole }],
        })
        .then((data) => {
          //  console.log(data)
          if (data) {
            res.status(200).json(data);
          } else {
            res.status(200).json({ message: `${req.query.filtro} no existe` });
          }
        })
        .catch((msg) => res.status(400).json({ message: "No hay Infomación" }));
    }
    //filtrar por rol

    if (req.query.rol) {
      await modeloUser
        .findAll({
          where: {
            role_id: req.query.rol,
          },
          include: [{ model: modelsRole }],
        })
        .then((data) => {
          if (data.length === 0) {
          return  res
              .status(200)
              .json({ message: "No hay ningún usuario con este rol" });
          } else {
           return res.status(200).json(data);
          }
        })
        .catch((err) => next(err));
    }

    ///estado que son inactivos
    if (req.query.estado === "0" || req.query.estado === "1"  ) {

      //estado que son inactivos
      if(req.query.estado === "0"){
        console.log(req.query.estado)
        await modeloUser
        .findAll({
          paranoid:false,
          where: {
            deletedAt: {
              [Op.not]: null,
            }
          },
        })
        .then((data) => {
       
          if (data.length===0) {
           
            return  res
              .status(200)
              .json({ message: "No hay ningún usuario con este estado"});
          } else {
            return res.status(200).json(data);
          }
        })
        

      }
      

      //estado activos
      if(req.query.estado === "1"){
        await modeloUser
        .findAll({
          where: {
            deletedAt: {
              [Op.is]: null,
            },
          },
        })
        .then((data) => {
          if (data.length === 0) {
            res
              .status(200)
              .json({message: "No hay ningún usuario con este estado" });
          } else {
            res.status(200).json(data);
          }
        })
        .catch((err) =>{
          res.status(200).json(err);
        });

      }     
    } else {
      await modeloUser
        .findAll({
          paranoid: false,
          include: [{ model: modelsRole }],
        })
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => next(err));
    }
  } catch (error) {
    res.send(error);
  }
};
