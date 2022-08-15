import env from "../env";
import nodemailer from "nodemailer";

const mailer = {
  send: async (email, subject, body) => {
    var credentials = env.MAILER_CREDENTIAL;

    var mailerOptions = {
      from: '"Ultimate Leadswell" <' + credentials.user + ">",
      to: email,
      subject: subject,
      html: body
    };

    return new Promise(resolve => {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: credentials
      });

      transporter.sendMail(mailerOptions, (err, info) => {

        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
};

export default mailer;