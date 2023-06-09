const modeloComment = require("../../models").comment;
const modelUser = require("../../models").user;
const modelsRequest = require("../../models").request;

exports.createComment = async (req, res) => {
  try {
    let { description } = req.body;

    await modelUser
      .findByPk(req.params.user)
      .then((user) => {
        if (!user) {
          return res.status(400).json({ message: "usuario no existe" });
        } else {
          modelsRequest
            .findByPk(req.params.request)
            .then((request) => {
              console.log(request);
              if (!request) {
                return res
                  .status(400)
                  .json({ message: "publicacion no existe" });
              } else {
                modeloComment
                  .create({
                    description,
                    status: 1,
                    request_id: request.id,
                    user_id: user.id,
                  })
                  .then((comment) => {
                    res.status(201).json(comment);
                  })
                  .catch((err) => {
                    res.status(400).json({ message: err.message });
                  });
              }
            })
            .catch((msg) =>
              res.status(400).json({
                message: "no se pusdo crear el comentario correctamente",
                msg,
              })
            );
        }
      })
      .catch((msg) =>
        res.status(400).json({ message: "usuario no encontrado", msg })
      );
  } catch (error) {
    res.send(error);
  }
};
