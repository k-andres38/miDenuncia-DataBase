const modelsReport = require("../../models").report;
const modelsTypesReport = require("../../models").types_report;
const modelUser = require("../../models").user;
const modelsRequest = require("../../models").request;

exports.createReport = async (req, res) => {
  try {
    let { description } = req.body;

    const typeReport =await modelsTypesReport.findOne({where:{id: req.params.typeReport}})

    await modelUser
      .findByPk(req.params.user)
      .then((user) => {
        if (!user) {
          return res.status(400).json({ message: "usuario no existe" });
        } else {
          modelsRequest
            .findByPk(req.params.request)
            .then((request) => {
                console.log(req.params.typeReport)
              
           
              if (!request) {
                return res
                  .status(400)
                  .json({ message: "publicacion no existe" });
              } else {
                modelsReport
                  .create({
                    description,
                    status: 1,
                    type_report_id: typeReport.id,
                    request_id: request.id,
                    user_id: user.id,
                  })
                  .then((report) => {
                    res.status(201).json({message:"Reporte creado con éxito."});
                  })
                  .catch((err) => {
                    res.status(400).json({ message: err.message });
                  });
              }
            })
            .catch((msg) =>
              res.status(400).json({
                message: "no se pudo hacer el report correctamente",
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
