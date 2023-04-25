const modelUser = require("../../models").user;

exports.updateUser = async (req, res) => {
  try {
    await modelUser.findByPk(req.params.id).then((user) => {

      
    const {nickname,name, last_name, password }=req.body

      if (!user) {
        res.json({
          mensaje: "El user no existe",
        });
      }

      modelUser
        .update({nickname,name, last_name, password}, {
          where: {
            id: req.params.id,
          },
        })
        .then((user) => {
          res.json({
            mensaje: "usuario actualizado",
          });
        });
    });












    
  } catch (error) {
    res.send(error);
  }
};
