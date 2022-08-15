import express from "express";
import nodemailer from "nodemailer";
import util from "../utility/custom";

const router = express.Router();

router.post("/", (req, res) => {
  var type = req.body.type;

  if (type == "callback") {
    let senderEmail = req.body.employerEmail;
    let userName = req.body.name;
    let userPhone = req.body.phone;
    let timimg = req.body.timimg;
    let message = req.body.message;
    let msg = `<!DOCTYPE html><html><body>` +
      `<h2>Visitor with the following details requested for callback:</h2>` +
      `<ul>` +
      `<li>Name: ${userName}</li>` +
      `<li>Phone: ${userPhone}</li>` +
      `<li>Availability: ${timimg}</li>` +
      `<li>Message: ${message}</li>` +
      `</ul>` +
      `</body></html>`;
    sendRegistrationMail(senderEmail, "Callback Request", msg);
    util.makeResponse(res, true, 200, "Success", "1.0.0", [
      {
        msg: "request submitted successfully.",
      },
    ]);
  } else if (type == "requestAppointment") {
    let senderEmail = req.body.employerEmail;
    let userName = req.body.name;
    let userPhone = req.body.phone;
    let userEmail = req.body.email;
    let timimg = req.body.timimg;
    let message = req.body.message;
    let msg = `<!DOCTYPE html><html><body>` +
      `<h2>Visitor with the following details requested for appointment:</h2>` +
      `<ul>` +
      `<li>Name: ${userName}</li>` +
      `<li>Phone: ${userPhone}</li>` +
      `<li>Email: ${userEmail}</li>` +
      `<li>Time Slot: ${timimg}</li>` +
      `<li>Message: ${message}</li>` +
      `</ul>` +
      `</body></html>`;
    sendRegistrationMail(senderEmail, "Book an Appointment", msg);
    util.makeResponse(res, true, 200, "Success", "1.0.0", [
      {
        msg: "request submitted successfully.",
      },
    ]);
  } else if (type == "submitQuote") {
    let senderEmail = req.body.employerEmail;
    let userName = req.body.name;
    let userPhone = req.body.phone;
    let userEmail = req.body.email;
    let city = req.body.city;
    let message = req.body.message;
    let msg = `<!DOCTYPE html><html><body>` +
      `<h2>Visitor with the following details submitted the quote:</h2>` +
      `<ul>` +
      `<li>Name: ${userName}</li>` +
      `<li>Phone: ${userPhone}</li>` +
      `<li>Email: ${userEmail}</li>` +
      `<li>City: ${city}</li>` +
      `<li>Message: ${message}</li>` +
      `</ul>` +
      `</body></html>`;
    sendRegistrationMail(senderEmail, "Quote Submitted", msg);
    util.makeResponse(res, true, 200, "Success", "1.0.0", [
      {
        msg: "request submitted successfully.",
      },
    ]);
  } else {
    util.makeResponse(res, false, 403, "failure", "1.0.0", [
      {
        msg: "bad request",
      },
    ]);
  }
});

function sendRegistrationMail(senderEmail, subject, msg) {

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ultimate.leadswell@gmail.com",
      pass: "xatnzuqmemasrfft",
    },
  });

  let mailOptions = {
    from: "ultimate.leadswell@gmail.com",
    to: senderEmail,
    subject: subject,
    html: msg,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error in sending callback request mail to " + senderEmail);
      console.log("error 1: ", error);
    } else {

    }
  });
}

module.exports = router;
