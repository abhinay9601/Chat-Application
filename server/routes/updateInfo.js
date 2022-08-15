import express from "express";
import users from "../controller/usersController";
import util from "../utility/custom";
import jwt from "../utility/jwt";
import env from "../env";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /update-info ************************************************************************/
/**
 * @api {post} /update-info update-info
 * @apiDescription : API to update info about particular user
 * @apiGroup : Users
 * @apiName : update-info
 * ***************************************************************************************************************************************************************
 * @apiParam {String} email       email
 * @apiParam {String} phone       phone
 * @apiParam {String} phone2      phone2
 * @apiParam {String} address     address
 * @apiParam {String} password    password
 * @apiParam {String} token       token
 * ***************************************************************************************************************************************************************
 * @apiSuccess {Boolean=true, false}            Success           response status ( false for error, true for success )
 * @apiSuccess {Number}                         Status             status code
 * @apiSuccess {String}                         Message            response message string
 * @apiSuccess {String}                         AppVersion         APP version
 * @apiSuccess {Object}                         Result             result
 * ***************************************************************************************************************************************************************
 * @apiSuccessExample {json} Success-Response:
 *  {
 *   "Success": true,
 *   "Status": 200,
 *   "Message": "Success",
 *   "AppVersion": "1.0.0",
 *   "Result": [
 *       {
 *          "msg": "Information updated successfully."
 *       }
 *   ]
 * }
 * @apiVersion 1.0.0
 */

router.post("/", (req, res) => {
  var email = req.body.email;
  var ua = req.headers["user-agent"];
  var token = req.body.token ? req.body.token : req.cookies.token;
  if (ua) {
    if (token) {
      let info_to_update = {};

      if (req.body.password) {
        info_to_update.userpassword = req.body.password;
      }

      if (req.body.address) {
        info_to_update.address = req.body.address;
      }

      if (req.body.phone) {
        info_to_update.phone = req.body.phone;
      }

      if (req.body.phone) {
        info_to_update.phone2 = req.body.phone2;
      }

      console.log("DATA : " + JSON.stringify(info_to_update));
      
      var user_data = new users.getOne({
        useremail: email
      });

      user_data
        .then(async user_data => {
          jwt
            .verify(token, env.JWT_EXPIRY)
            .then(decrypted => {
              var authority_data = new users.getOne({
                useremail: decrypted.email
              });

              authority_data
                .then(async function(d) {
                  if (d) {
                    if (d.userlevel.toString() == "superAdmin") {
                      let updateInfo = new users.findOneAndUpdate(
                        { useremail: email },
                        info_to_update
                      );

                      updateInfo
                        .then(data => {
                          if (data) {
                            util.makeResponse(
                              res,
                              true,
                              200,
                              "Success",
                              "1.0.0",
                              [
                                {
                                  msg: "Information updated successfully."
                                }
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
                                  msg: "User doesn't exist."
                                }
                              ]
                            );
                          }
                        })
                        .catch(err => {
                          console.log("ERROR7 : " + err);
                          
                          util.makeResponse(
                            res,
                            false,
                            500,
                            "failure",
                            "1.0.0",
                            [
                              {
                                msg: err
                              }
                            ]
                          );
                        });
                    } else if (d.userlevel.toString() == "admin") {
                      if (
                        env.USER_LEVEL.indexOf(user_data.userlevel.toString()) >
                        1
                      ) {
                        let updateInfo = new users.findOneAndUpdate(
                          { useremail: email },
                          info_to_update
                        );

                        updateInfo
                          .then(data => {
                            if (data) {
                              util.makeResponse(
                                res,
                                true,
                                200,
                                "Success",
                                "1.0.0",
                                [
                                  {
                                    msg: "Information updated successfully."
                                  }
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
                                    msg: "User doesn't exist."
                                  }
                                ]
                              );
                            }
                          })
                          .catch(err => {
                            console.log("ERROR6: " + err);
                            
                            util.makeResponse(
                              res,
                              false,
                              500,
                              "failure",
                              "1.0.0",
                              [
                                {
                                  msg: err
                                }
                              ]
                            );
                          });
                      } else {
                        util.makeResponse(res, false, 401, "failure", "1.0.0", [
                          {
                            msg:
                              "Not an authorised user to update the user info."
                          }
                        ]);
                      }
                    } else if (d.userlevel.toString() == "client") {
                      if (
                        env.USER_LEVEL.indexOf(user_data.userlevel.toString()) >
                        2
                      ) {
                        if (
                          user_data.client_id.toString() ==
                          d.client_id.toString()
                        ) {
                          let updateInfo = new users.findOneAndUpdate(
                            { useremail: email },
                            info_to_update
                          );

                          updateInfo
                            .then(data => {
                              if (data) {
                                util.makeResponse(
                                  res,
                                  true,
                                  200,
                                  "Success",
                                  "1.0.0",
                                  [
                                    {
                                      msg: "Information updated successfully."
                                    }
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
                                      msg: "User doesn't exist."
                                    }
                                  ]
                                );
                              }
                            })
                            .catch(err => {
                              console.log("ERROR5 : " + err);
                              
                              util.makeResponse(
                                res,
                                false,
                                500,
                                "failure",
                                "1.0.0",
                                [
                                  {
                                    msg: err
                                  }
                                ]
                              );
                            });
                        } else {
                          util.makeResponse(
                            res,
                            false,
                            401,
                            "failure",
                            "1.0.0",
                            [
                              {
                                msg:
                                  "This user is not from your organisation, so you have no right to update his/her info."
                              }
                            ]
                          );
                        }
                      } else {
                        util.makeResponse(res, false, 401, "failure", "1.0.0", [
                          {
                            msg:
                              "Not an authorised user to update the user info."
                          }
                        ]);
                      }
                    } else if (d.userlevel.toString() == "managers") {
                      if (
                        env.USER_LEVEL.indexOf(user_data.userlevel.toString()) >
                        3
                      ) {
                        if (
                          user_data.client_id.toString() ==
                          d.client_id.toString()
                        ) {
                          let updateInfo = new users.findOneAndUpdate(
                            { useremail: email },
                            info_to_update
                          );

                          updateInfo
                            .then(data => {
                              if (data) {
                                util.makeResponse(
                                  res,
                                  true,
                                  200,
                                  "Success",
                                  "1.0.0",
                                  [
                                    {
                                      msg: "Information updated successfully."
                                    }
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
                                      msg: "User doesn't exist."
                                    }
                                  ]
                                );
                              }
                            })
                            .catch(err => {
                              console.log("ERR4 : " + err);
                              
                              util.makeResponse(
                                res,
                                false,
                                500,
                                "failure",
                                "1.0.0",
                                [
                                  {
                                    msg: err
                                  }
                                ]
                              );
                            });
                        } else {
                          util.makeResponse(
                            res,
                            false,
                            401,
                            "failure",
                            "1.0.0",
                            [
                              {
                                msg:
                                  "This user is not from your organisation, so you have no right to update his/her info."
                              }
                            ]
                          );
                        }
                      } else {
                        util.makeResponse(res, false, 401, "failure", "1.0.0", [
                          {
                            msg: "Not an authorised user to update the user info."
                          }
                        ]);
                      }
                    } else {
                      util.makeResponse(res, false, 401, "failure", "1.0.0", [
                        {
                          msg: "Not an authorised user to update the user info."
                        }
                      ]);
                    }
                  }
                })
                .catch(err => {
                  console.log("ERROR3 : " + err);
                  
                  util.makeResponse(res, false, 500, "failure", "1.0.0", [
                    {
                      msg: err
                    }
                  ]);
                });
            })
            .catch(err => {
              console.log("ERROR2 : " + err);
              
              util.makeResponse(res, false, 500, "failure", "1.0.0", [
                {
                  msg: "Token validation failed. hence, authorisation failed."
                }
              ]);
            });
        })
        .catch(err => {
          console.log("ERROR1 : " + err);
          
          util.makeResponse(res, false, 500, "failure", "1.0.0", [
            {
              msg: err
            }
          ]);
        });
    } else {
      util.makeResponse(res, false, 401, "failure", "1.0.0", [
        {
          msg: "Authority validation failed."
        }
      ]);
    }
  } else {
    res.sendStatus(403).json({ error: "Request from unknown source..." });
  }
});

module.exports = router;
