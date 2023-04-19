const modeloUser = require("../../models").user;
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
        //attributes: ["id", "nickname", "name","password"]
      })
      .then((user) => {
        if (!user) {
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
            user.update({token})
            user.save();
            res.json({
               id: user.id,
               nickname: user.nickname,
               name: user.name,
               last_name: user.last_name,
               contact_phone: user.contact_phone,
               address: user.address,
               document_id: user.document_id,
               token
            });
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
