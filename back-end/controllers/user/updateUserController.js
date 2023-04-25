const modelUser = require("../../models").user;

exports.updateUser = async (req, res) => {
  try {
    await modelUser.findByPk(req.params.id).then((user) => {
      if (!user) {
        res.json({
          mensaje: "El user no existe",
        });
      }

      modelUser
        .update(req.body, {
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

    //const {nickname,name, last_name, password }=req.body
  } catch (error) {
    res.send(error);
  }
};
