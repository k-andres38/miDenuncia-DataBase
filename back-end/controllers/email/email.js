const nodemailer=require('nodemailer');

exports.sendEmail= async (req,res)=>{

  const { google } = require("googleapis");
const { Auth } = require("google-auth-library");

async function generateAppPassword() {
  const auth = new Auth();
  const { credentials } = await auth.getApplicationDefault();

  const oauth2Client = new google.auth.OAuth2(
    credentials.client_id,
    credentials.client_secret,
    credentials.redirect_uris[0]
  );

  const scopes = ["https://mail.google.com/"];

  const accessToken = await auth.getAccessToken();
  oauth2Client.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  const response = await gmail.users.settings.sendAs.create({
    userId: "me",
    requestBody: {
      sendAsEmail: "tu-correo-electronico@gmail.com",
      displayName: "Tu nombre",
      replyToAddress: false,
      signature: "Tu firma",
      isDefault: true,
      smtpMsa: {
        host: "smtp.gmail.com",
        port: 587,
        requireTls: true,
        auth: {
          user: "tu-correo-electronico@gmail.com",
          refreshToken: credentials.refresh_token,
          accessToken: accessToken,
        },
      },
    },
  });

  return response.data.smtpMsa;
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    type: "login",
    user: "tu-correo-electronico@gmail.com",
    pass: await generateAppPassword(),
  },
});

const mailOptions = {
  from: "tu-correo-electronico@gmail.com",
  to: "destinatario@correo.com",
  subject: "Asunto del correo electrónico",
  text: "Contenido del correo electrónico",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Correo electrónico enviado: " + info.response);
  }
});


    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'kandres38@gmail.com',
    //       pass: 'Minerv@1'
    //     }
    //   });

    //   // Configurar el mensaje
    // const message = {
    //     from: 'kandres38@gmail.com',
    //     to: 'kandres38@gmail.com',
    //     subject: 'Asunto del correo',
    //     text: 'esto es el contenido del correo'
    // };

    // transporter.sendMail(message, (err, info) => {
    //     if (err) {
    //       console.log(err);
    //       res.status(500).send('No se pudo enviar el correo electrónico');
    //     } else {
    //       console.log(info);
    //       res.status(200).send('Correo electrónico enviado');
    //     }
    //   });


}