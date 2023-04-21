//const { request } = require('express');

///AQUI VAN LAS IMPORTACIONES DE LOS PAQUETES
//AQUI EMPIEZAN LOS SERVICIOS
const cloudinary = require("cloudinary").v2;
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const pdfkit = require("pdfkit");
const fs = require("fs"); //con fs podemos leer y escribir
const axios = require("axios");
const doc = new pdfkit();
//AQUI TERMINAN LOS SERVICIOS

//AQUI VAN LOS MODELOS

const { find, findOne } = require("../../modeloMongo/sessionMongodb");
const modelsTypeRequest = require("../../models").types_request;
const modelsDocument = require("../../models").document;
const modelsUser = require("../../models").user;
const modelsRequest = require("../../models").request;
const modelsPhoto = require("../../models").photo;
const modelsReport = require("../../models").report;

//AQUI TERMINA LOS MODELOS

//AQUI ADJUNTAMOS LAS CONFIGURACIONES DE LOS SERVICIOS
require("../../services/cloudinaryConfig");

//SERVICES GOOGLE EMAIL
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oAuth2Client = new google.auth.OAuth2(
  process.env.EMAIL_AUTH_CLIENT_ID,
  process.env.EMAIL_AUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oAuth2Client.setCredentials({
  refresh_token: process.env.EMAIL_AUTH_CLIENT_REFRESH_TOKEN,
  tls: {
    rejectUnauthorized: false,
  },
});

// Configurar el transporter de Nodemailer con la API de Gmail de Google
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
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
    //console.log(req.files)

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
    //console.log(url)

    doc.pipe(fs.createWriteStream("reporte.pdf")); //pipe para no consumir memoria por si es muy grande el pdf

    doc.text("Reporte de denuncia", { align: "center" });
    doc.moveDown(0.5);

    /*doc.text(`Nombre: ${req.body.name}`);*/

    doc.fontSize(12).text("Señores:", { color: "#000000" });

    doc.fontSize(16).text("Alcaldía de Bucaramanga", {
      align: "left",
      width: 410,
      lineGap: 2,

      lineHeight: 1.2,
    });

    doc.fontSize(12).text("E. S. D.", {
      align: "left",
      lineHeight: 1.2,
      color: "black",
    });

    doc.fontSize(12).text("\n");

    doc.fontSize(12).text("Ref.: (tipo de petición)  ", {
      align: "left",
      lineGap: 1.2,
      characterSpacing: 1,
    });

    doc.fontSize(12).text("\n");

    doc
      .fontSize(16)
      .text("ANDRES FELIPE LEON PLATA, ", { continued: true })
      .fontSize(12)
      .text(
        "mayor de edad, vecino de esta ciudad, identificado con cédula de ciudadanía número 1.098.741.421 expedida en Bucaramanga, me permito instaurar en nombre propio ante su despacho este Derecho de Petición, con fundamento en los siguientes:",
        {
          continued: false,
        }
      );

    doc.fontSize(12).text("\n");

    doc.fontSize(16).text("PROBLEMA", { align: "center" });

    doc.fontSize(12).text("\n");

    doc
      .fontSize(16)
      .text("PRIMERO: ", { continued: true })
      .fontSize(12)
      .text(
        "Para el mes de Julio del año en curso me acerque a las instalaciones de BANCOLOMBIA sucursal las palmas de Bucaramanga para adquirir una cuenta bancaria..."
      );

    doc.fontSize(12).text("\n");

    doc.fontSize(16).text("PETICIÓN (solución)", { align: "center" });

    doc.fontSize(12).text("\n");

    doc
      .fontSize(16)
      .text("PRIMERO: ", { continued: true })
      .fontSize(12)
      .text("Hacer efectiva la solicitud de cancelación de seguro ");

    doc.fontSize(12).text("\n");

    doc.fontSize(16).text("FUNDAMENTOS DE DERECHO", { align: "center" });

    doc.fontSize(12).text("\n");

    doc.list(
      [
        "La Constitución colombiana, artículo 23, sobre Derecho de petición",
        "Esperar más información…",
      ],
      {
        align: "justify",
        fontSize: 12,
        listItemGap: 6,
        TextIndent: 30,
        /*bulletRadius: 8*/
        listType: "numbered",
      }
    );

    doc.fontSize(12).text("\n");

    doc.fontSize(16).text("ANEXOS", { align: "center" });

    doc.fontSize(12).text("\n");

    doc
      .text(
        "La petición que elevo mediante este escrito se fundamenta en las razones de hecho y de derecho anteriormente expuestas, que se dejan debidamente comprobadas con los siguientes anexos y documentos:",
        {
          align: "justify",
          fontSize: 12,
        }
      )
      .text("\n");

    doc.fontSize(16).text("PRUEBAS", { align: "center" });
    doc.fontSize(12).text("\n");

    doc
      .text(
        "Para la resolución favorable de mi petición, solicito tener como pruebas los anexos que relacioné antes y practicar, en caso de que lo encuentre viable cualquier otro medio de prueba que, a su juicio, sea necesario para la resolución favorable de mi petición.",
        {
          align: "justify",
          fontSize: 12,
        }
      )
      .text("\n");

    doc.fontSize(16).text("Fotos de la petición", {
      align: "justify",
      lineGap: 12,
    });

    //necesito una url funcional para probar la url que llega del body y cambiar a 68
    /*

axios.get(cloudPhoto, { responseType: 'arraybuffer' })
.then(response => {

  const imageBuffer = Buffer.from(response.data, 'binary');

  // Carga la imagen en el PDF
  doc.image(imageBuffer,  {

    fit: [250, 300], 
    align: 'center',
    valign: 'center' 

  });

 
})
.catch(error => {
  console.error(error);
});


/*
const urrl = fs.readFileSync('/ruta/de/la/imagen.jpg');

   doc.image(url, {
    fit: [250, 300], 
    align: 'center',
    valign: 'center' 
  });*/

    /*

  const imageUrl = 'https://res.cloudinary.com/your-cloud-name/image/upload/v1626680727/your-image.jpg';
const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
const imageBuffer = Buffer.from(response.data, 'binary');
doc.image(imageBuffer, { width: 300 });*/

    doc.fontSize(12).text("\n");
    doc.fontSize(16).text("NOTIFICACIONES", { align: "center" });
    doc.fontSize(12).text("\n");

    doc
      .fontSize(12)
      .text(
        "Recibiré notificaciones personales preferiblemente en la Calle 43 # 7-57 Edificio Palermo 2 Apartamento 508, Barrio Alfonso López, Bucaramanga y al correo electrónico ",
        { align: "justify", continued: true }
      )
      .fontSize(16)
      .text("ing.andresleon@hotmail.com", {
        link: "ing.andresleon@hotmail.com",
        color: "blue",
        underline: false,
      });

    doc.fontSize(12).text("\n");
    doc.fontSize(12).text("Atentamente,", { align: "justify" });

    doc.fontSize(12).text("\n");

    doc.fontSize(16).text("ANDRES FELIPE LEON PLATA ", { align: "left" });
    doc.fontSize(12).text("1.454.999.222 Bucaramanga", { align: "justify" });

    doc.fontSize(12).text("\n");

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
      .findByPk(req.params.id, {
        attributes: [
          "id",
          "name",
          "last_name",
          "contact_phone",
          "address",
          "staff_neighborhood",
          "document_id",
        ],
      })
      .then((user) => {
        //modelsTypeRequest.create({ name })

        // modelsDocument.updateOrCreate({
        //   id: number_document,
        //   type,
        //   place_dispatch,
        // });

        modelsDocument
          .findOrCreate({
            attributes: ["type", "place_dispatch"],
            where: {
              id: number_document,
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

                    let imagen = req.files.map((e) => e.path);
                  

                    modelsPhoto
                      .create({
                        url: imagen[0],
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
                                photo_id: photos.id,
                              },
                              photo_id: photos.id,
                              request_id: request.id, // no es request_id: request_id ??
                              description: problem,
                            });

                         
                            const mailOptions = {
                              to: "midenunciacoex@gmail.com",
                              subject: `Denuncia por`,
                              text: `\n\n aqui el pie: gracias por usar nuestros servicios <3`,
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

                              attachments: [
                                {
                                  filename: "reporte.pdf",
                                  path: "./reporte.pdf",
                                },
                              ],
                            };

                            transporter.sendMail(mailOptions, (error, info) => {
                              if (error) {
                                res.status(400).json({
                                  message: "Email no es válido",
                                });
                              } else {
                                res.status(200).json({
                                  message: `Correo electrónico enviado!`,
                                  message2: "verifica tu bandeja de entrada",
                                });
                              }
                            });

                            //// ESTE ES EL MENJASE DE OK RESPUESTA

                            res.status(200).json({
                              data: { user, doc },
                            });
                          });
                      })
                      .catch((err) => {
                        res.status(400).json({
                          message: err.message,
                        });
                      });

                    ///dayana

                    //ESCRIBES EL CODIGO DE ENVIAR CORREO
                 
              });
          });
      })
      .catch((error) => {
        res.status(400).json({
          message: "no se pudo completrar la soliciud",
          error,
        });
      });
  } catch (error) {
    res.send(error);
  }
};

/////OTRO CODIGO
