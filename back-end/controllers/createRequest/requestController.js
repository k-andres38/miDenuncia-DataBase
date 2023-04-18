//const { request } = require('express');

///AQUI VAN LAS IMPORTACIONES DE LOS PAQUETES
//AQUI EMPIEZAN LOS SERVICIOS
const cloudinary = require('cloudinary').v2;
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config()
const pdfkit = require('pdfkit');
const fs = require('fs');//con fs podemos leer y escribir

const doc = new pdfkit();
//AQUI TERMINAN LOS SERVICIOS


//AQUI VAN LOS MODELOS

const {
  find,
  findOne
} = require("../../modeloMongo/sessionMongodb");
const modelsTypeRequest = require("../../models").types_request;
const modelsDocument = require("../../models").document;
const modelsUser = require("../../models").user;
const modelsRequest = require("../../models").request;
const modelsPhoto = require("../../models").photo;
const modelsReport = require("../../models").report;

//AQUI TERMINA LOS MODELOS





//AQUI ADJUNTAMOS LAS CONFIGURACIONES DE LOS SERVICIOS
require('../../services/cloudinaryConfig')


//SERVICES GOOGLE EMAIL
const {
  google
} = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oAuth2Client = new google.auth.OAuth2(process.env.EMAIL_AUTH_CLIENT_ID,
  process.env.EMAIL_AUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground");
oAuth2Client.setCredentials({
  refresh_token: process.env.EMAIL_AUTH_CLIENT_REFRESH_TOKEN,
  tls: {
    rejectUnauthorized: false
  }
});


// Configurar el transporter de Nodemailer con la API de Gmail de Google
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_AUTH_USER,
    clientId: process.env.EMAIL_AUTH_CLIENT_ID,
    clientSecret: process.env.EMAIL_AUTH_CLIENT_SECRET,
    refreshToken: process.env.EMAIL_AUTH_CLIENT_REFRESH_TOKEN,
    accessToken: oAuth2Client.getAccessToken(),
  },
});




//AQUI TERMINAMOS LAS CONFIGURACIONES DE LOS SERVICIOS


exports.request = async (req, res, next) => {
  try {

   // console.log(req.body)
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

    doc.pipe(fs.createWriteStream('reporte.pdf')); //pipe para no consumir memoria por si es muy grande el pdf

    doc.text('Reporte de denuncia', { align: 'center' });
    doc.moveDown(0.5);
    
    /*doc.text(`Nombre: ${req.body.name}`);*/
   
    doc.text(`Tipo: ${req.body.type} `);
    doc.text(`Número de documento: ${req.body.number_document}`);
    doc.text(`Lugar de expedición: ${req.body.place_dispatch}`);
    doc.text(`Dirección: ${req.body.address}`);
    doc.text(`Teléfono: ${req.body.contact_phone}`);
    doc.text(`Ubicación: ${req.body.location}`);
    doc.text(`Barrio: ${req.body.neighborhood}`);
    doc.text(`Asunto: ${req.body.subject}`);
    doc.text(`Problema: ${req.body.problem}`);
    doc.text(`Solución: ${req.body.solution}`);
    doc.text(`Url imagen: ${req.body.url}`);
    
    doc.end();

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
            where: {
              id: number_document
            },
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
                //AQUI ENTRA LO DE CLOUDINARY 

                // url = [url];
                // url = url.join(";");
                const cloudPhoto = cloudinary.uploader.upload('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8HK2LbzeGcfVc-_Wei89RK8vcZ3LeFG3xaGGv2leirg&s', {
                  public_id: "calles2",
                  folder: 'peticiones'
                })
                // console.log(__dirname+'Cap');

                cloudPhoto.then((data) => {
                  console.log(data);
                  console.log(data.secure_url);

                  url = cloudinary.image("calles21.jpg", {
                    width: 100,
                    height: 150,
                    Crop: 'fill'
                  });

                
                  modelsPhoto
                    .create({
                      url: data.secure_url,
                      request_id: request.id,
                    })
                    .then((photos) => {
                      modelsReport
                        .create({
                          problem,
                        })
                        .then((report) => {
                          report.update({
                            where: {
                              photo_id: photos.id
                            },
                            photo_id: photos.id,
                            request_id: request.id, // no es request_id: request_id ??
                            description: problem,
                          }, );

                          // const data = [user, photos];


                          //CONFIGURCION DE EMAIL 
                          //DAYANA


                         
                          
                          

                          const mailOptions = {
                            to: "midenunciacoex@gmail.com",
                            subject: `Denuncia por`,
                            text:`\n\n aqui el pie: gracias por usar nuestros servicios <3`,
                            html: `<h1 style="color: #5e9ca0;"><span style="color: #800080;">bienvenido a mi denuncia!</span></h1>
                            <div>
                            <div>
                            <div>
                            <div>&nbsp;</div>
                            </div>
                            </div>
                            </div>
                            <h2 style="color: #2e6c80;">para ver la solicitud abra el archivo a continuacion:</h2>
                            <p>&nbsp;</p>
                            <p><strong>&nbsp;</strong></p>`,

                            attachments: [{
                              filename: 'reporte.pdf',
                              path: './reporte.pdf',
                            }],

                          };

                          transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                              res.status(400).json({
                                message: 'Email no es válido'
                              })
                            } else {
                              res.status(200).json({
                                message: `Correo electrónico enviado!`,
                                message2: "verifica tu bandeja de entrada"
                              })
                            }
                          })




                          //// ESTE ES EL MENJASE DE OK RESPUESTA

                          res.status(200).json({
                            message: 'successfull'
                          });
                        });
                    }).catch((err) => {
                      res.status(400).json({
                        message: err.message
                      });
                    });

                  ///dayana


                  //ESCRIBES EL CODIGO DE ENVIAR CORREO 
                }).catch((err) => {
                  res.status(400).json({
                    message: err.message
                  });
                });




              });
          });
      })
      .catch((error) => {
        res
          .status(400)
          .json({
            message: "no se pudo completrar la soliciud",
            error
          });
      });





  } catch (error) {
    res.send(error);
  }
};

/////OTRO CODIGO