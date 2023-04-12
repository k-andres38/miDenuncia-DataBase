//const { request } = require('express');
const { find, findOne } = require("../../modeloMongo/sessionMongodb");
const modelsTypeRequest = require("../../models").types_request;
const modelsDocument = require("../../models").document;
const modelsUser = require("../../models").user;
const modelsRequest = require("../../models").request;
const modelsPhoto = require("../../models").photo;
const modelsReport = require("../../models").report;

exports.request = async (req, res, next) => {
  try {
    let {
      name,
      type,
      number_document,
      place_dispatch,
      address,
      contact_phone,
      location,
      neighborhood,
      subject,
      problem,
      solution,
      url,
      staff_neighborhood,
      type_request_id,
    } = req.body;

    await modelsUser
      .findByPk(req.params.id)
      .then((user) => {
        //modelsTypeRequest.create({ name })

        // modelsDocument.updateOrCreate({
        //   id: number_document,
        //   type,
        //   place_dispatch,
        // });

        modelsDocument
          .findOrCreate({
            where: { id: number_document },
            defaults: {
              id: number_document,
              type,
              place_dispatch,
            },
          })
          .then(([doc, created]) => {
          
            if (created) {
              user.update({
                where: {
                  address,
                  contact_phone,
                  document_id: number_document,
                  staff_neighborhood,
                },
                address,
                contact_phone,
                document_id: number_document,
                staff_neighborhood,
              });
            }

            modelsRequest
              .create({
                location,
                neighborhood,
                subject,
                problem,
                solution,
                type_request_id,
                user_id: req.params.id,
              })
              .then((request) => {
                url = [url, url];
                url = url.join(";");
                modelsPhoto
                  .create({
                    url,
                    request_id: request.id,
                  })
                  .then((photos) => {
                    modelsReport
                      .create({
                        problem,
                      })
                      .then((report) => {
                        report.update({
                          where: { photo_id: photos.id },
                          photo_id: photos.id,
                          request_id: request.id, // no es request_id: request_id ??
                          description: problem,
                        });

                        const data = [user, photos, report];
                        res.status(200).json({ data });
                      });
                  });
              });
          });
      })
      .catch((error) => {
        res
          .status(400)
          .json({ message: "no se pudo completrar la soliciud", error });
      });
  } catch (error) {
    res.send(error);
  }
};

/////OTRO CODIGO
