import express from "express";
import nodemailer from "nodemailer";
const mongoose = require('mongoose');
var autoIncrement = require("mongoose-auto-increment");

import util from "../utility/custom";
import mailer from '../utility/mailer';

const router = express.Router();

router.post("/", async (req, res) => {
    var topic = req.body.topic;
    var client = req.body.client;
    var email = req.body.email;
    try {
        var messageSchema = new mongoose.Schema(
            {
                payload:
                {
                    type: Object,
                    index: true,
                },
                status:
                {
                    type: String,
                    enum: ['read', 'sent', 'delivered'],
                    default: 'sent'

                },
                type:
                {
                    type: String,
                    enum: ['typing', 'html', 'audio', 'video', 'string'],
                    default: 'typing'
                },
                stage:
                {
                    type: String,
                    enum: ['saved', 'unsaved'],
                    default: 'unsaved'
                },
                scrollHeight:
                {

                    type: String,
                    default: '0'
                },
                created_at:
                {
                    type: Date,
                    default: Date.now
                }

            },
            {
                strict: true
            });

        messageSchema.plugin(
            autoIncrement.plugin,
            {
                model: `${client}msgs`,
                field: 'id',
                startAt: 1

            }
        );

        let payload = await mongoose.model(`${client}msgs`, messageSchema).find(
            {
                'payload.topic': topic
            },
            {
                _id: 0,
                payload: 1
            }
        );
        let body = '<p>Hi</p>' +
            '<p>Please find the transcript for your chat with agent below</p><br>' +
            '<p>=============================================================</p>';
        for (let i = 0; i < payload.length; i++) {
            if (payload[i].payload.profile == 'you') {
                body += `<p> Visitor: ${payload[i].payload.msg}`;
            } else {
                body += `<p> Agent: ${payload[i].payload.msg}`;
            }
        }
        body += '<p>=============================================================</p><br>' +
            '<p>Regards,</p><p>String Cans</p>';
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "ultimate.leadswell@gmail.com",
                  pass: "xatnzuqmemasrfft",
                },
              });
            
              let mailOptions = {
                from: "ultimate.leadswell@gmail.com",
                to: email,
                subject: 'Chat Transcript',
                html: body,
              };
            
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log("Error in sending callback request mail to " + email);
                  console.log("error 1: ", error);
                } else {
            
                }
              });
        util.makeResponse(res, true, 200, "Success", "1.0.0", [
            {
                msg: "request submitted successfully.",
            },
        ]);;
    } catch (error) {
        console.log("Error in chatbot :: " + error);
        util.makeResponse(res, false, 403, "failure", "1.0.0", [
            {
                msg: "bad request",
            },
        ]);
    }
});

module.exports = router;
