import env from "../env";
import jwt from "../utility/jwt";
import chatbotModel from "../models/chatbotModel";
import users from "../controller/usersController";
import util from "../utility/custom";

const chatbotController = {
  updateChatbotTemplate: (req, res) => {
    var ua = req.headers["user-agent"];

    var token = req.body.token ? req.body.token : req.cookies.token;
    var data = req.body;

    if (ua) {
      if (token) {
        jwt
          .verify(token, env.JWT_EXPIRY)
          .then((decrypted) => {
            let user = new users.getOne({ useremail: decrypted.email });

            user
              .then((d) => {
                if (
                  d &&
                  (d.userlevel == "client" || d.userlevel == "manager")
                ) {
                  let client_id = d.client_id;

                  chatbotModel.deleteOne({ client_id: client_id }, (err) => {
                    chatbotModel.updateOne(
                      { client_id: client_id },
                      data,
                      {
                        new: true,
                        upsert: true,
                      },
                      (err, doc) => {
                        if (doc) {
                          util.makeResponse(
                            res,
                            true,
                            200,
                            "Success",
                            "1.0.0",
                            [
                              {
                                msg: "chatbot template updated successfully.",
                              },
                            ]
                          );
                        } else {
                          util.makeResponse(
                            res,
                            false,
                            401,
                            "failure",
                            "1.0.0",
                            [
                              {
                                error:
                                  "Error in updating the chatbot template!",
                              },
                            ]
                          );
                        }
                      }
                    );
                  });
                } else {
                  util.makeResponse(res, false, 401, "failure", "1.0.0", [
                    {
                      error:
                        "you are not a valid user to update the template!!",
                    },
                  ]);
                }
              })
              .catch((err) => {
                util.makeResponse(res, false, 501, "failure", "1.0.0", [
                  {
                    error: "There is datbase internal error!!!",
                  },
                ]);
              });
          })
          .catch((err) => {
            util.makeResponse(res, false, 401, "failure", "1.0.0", [
              {
                error: "Error in validating the token!!!",
              },
            ]);
          });
      } else {
        util.makeResponse(res, false, 401, "failure", "1.0.0", [
          {
            error: "Token not available for validating!!!!",
          },
        ]);
      }
    } else {
      res.sendStatus(403).json({ error: "Request from unknown source..." });
    }
  },
  viewChatbotTemplate: async (req, res) => {
    var ua = req.headers["user-agent"];

    var token = req.body.token ? req.body.token : req.cookies.token;

    if (ua) {
      if (token) {
        jwt
          .verify(token, env.JWT_EXPIRY)
          .then((decrypted) => {
            let user = new users.getOne({ useremail: decrypted.email });

            user
              .then((d) => {
                if (
                  d &&
                  (d.userlevel == "client" || d.userlevel == "manager")
                ) {
                  let client_id = d.client_id;
                  chatbotModel
                    .findOne(
                      { client_id: client_id },
                      {
                        _id: 0,
                      }
                    )
                    .then((doc) => {
                      res.render("chatbot", {
                        info: {
                          client_id: client_id,
                          username: d.username,
                          email: d.useremail,
                          userlevel: d.userlevel ? d.userlevel.toString(): null,
                          company: d.company ? d.company.toString() : null,
                          logo: d.logo ? d.logo.toString() : null,
                          welcome: doc.welcome ? doc.welcome.toString() : null,
                          text: doc.text ? doc.text.toString():  null,
                          image: doc.image ? doc.image.toString() : null,
                          callNow: doc.callNow ? doc.callNow.toString() : null,
                          directions: doc.directions ? doc.directions.toString() : null,
                          callback: doc.callback ? doc.callback.toString() : null,
                          quote: doc.quote ? doc.quote.toString() : null,
                          bookAppointment: doc.bookAppointment ? doc.bookAppointment : false,
                          userOptions: doc.userOptions,
                          linkOptions: doc.linkOptions,
                        },
                      });
                    })
                    .catch((e) => {
                      res.render("chatbot", {
                        info: {
                          client_id: client_id,
                          username: d.username,
                          email: d.useremail,
                          userlevel: d.userlevel.toString(),
                          company: d.company.toString(),
                          logo: d.logo.toString(),
                        },
                      });
                    });
                } else {
                  if (ua.indexOf("ul") >= 0) {
                    util.makeResponse(res, false, 401, "failure", "1.0.0", [
                      {
                        error:
                          "you are not a valid user to update the template!!",
                      },
                    ]);
                  } else {
                    res.clearCookie("token");
                    res.clearCookie("client_id");
                    res.cookie(
                      "error",
                      "you are not a valid user to update the template!!"
                    );
                    res.redirect("/signin");
                  }
                }
              })
              .catch((err) => {
                if (ua.indexOf("ul") >= 0) {
                  util.makeResponse(res, false, 501, "failure", "1.0.0", [
                    {
                      error: "There is datbase internal error!!!",
                    },
                  ]);
                } else {
                  res.clearCookie("token");
                  res.clearCookie("client_id");
                  res.cookie("error", "There is datbase internal error!!!");
                  res.redirect("/signin");
                }
              });
          })
          .catch((err) => {
            if (ua.indexOf("ul") >= 0) {
              util.makeResponse(res, false, 401, "failure", "1.0.0", [
                {
                  error: "Error in validating the token!!!",
                },
              ]);
            } else {
              res.clearCookie("token");
              res.clearCookie("client_id");
              res.cookie("error", "Error in validating the token!!!");
              res.redirect("/signin");
            }
          });
      } else {
        if (ua.indexOf("ul") >= 0) {
          util.makeResponse(res, false, 401, "failure", "1.0.0", [
            {
              error: "Token not available for validation!!!!",
            },
          ]);
        } else {
          res.clearCookie("token");
          res.clearCookie("client_id");
          res.cookie("error", "Token not available for validation");
          res.redirect("/signin");
        }
      }
    } else {
      res.sendStatus(403).json({ error: "Request from unknown source..." });
    }
  },
};

export default chatbotController;
