import express from "express";
import usersModel from "../models/usersModel";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("query", req.query);
  var id = req.query.id;
  var link = req.query.link;
  try {
    let data = await usersModel.aggregate([
      {
        $lookup: {
          from: "chatbots",
          let: {
            userlevel: "$userlevel",
            client: "$client_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$userlevel", "client"] },
                    { $eq: ["$client_id", "$$client"] },
                    { $eq: ["$client_id", id] }
                  ],
                },
              },
            }
          ],
          as: "chatbotdata",
        }
      },
      { $project: { _id: 0, avtar: 0,logo: 0 } },
      { $unwind: "$chatbotdata" }
    ]);
    
    data = data[0];
    const responseData = {
      id: id,
      company: data.company,
      linkurl: link !== null ? link : "",
      welcomeMsg: data.chatbotdata ? data.chatbotdata.welcome : null,
      image: data.chatbotdata ? data.chatbotdata.image : null,
      callNow: data.chatbotdata ? data.chatbotdata.callNow : null,
      directions: data.chatbotdata ? data.chatbotdata.directions : null,
      callback: data.chatbotdata ? data.chatbotdata.callback : null,
      quote: data.chatbotdata ? data.chatbotdata.quote : null,
      bookAppointment: data.chatbotdata
        ? data.chatbotdata.bookAppointment
        : null,
      text: data.chatbotdata ? data.chatbotdata.text : null,
      userOptions: data.chatbotdata ? data.chatbotdata.userOptions : null,
      linkOptions: data.chatbotdata ? data.chatbotdata.linkOptions : null,
    };

    res.render("chatbox", responseData);
  } catch (error) {
    console.log("Error in chatbot :: " + error);
    usersModel.findOne({ client_id: id, userlevel: "client" }, async (err, d) => {
      res.render("chatbox", {
        id: id,
        company: d.company,
        linkurl: link !== null ? link : "",
        welcomeMsg: null,
        image: null,
        callNow: null,
        directions: null,
        callback: null,
        quote: null,
        bookAppointment: null,
        text: null,
        userOptions: null,
        linkOptions: null
      });
    });
  }
});

module.exports = router;
