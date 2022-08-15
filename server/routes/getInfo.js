import express from "express";
import users from "../controller/usersController";
import util from "../utility/custom";
import env from "../env";
import jwt from "../utility/jwt";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /get-info ************************************************************************/
/**
 * @api {post} /get-info get-info
 * @apiDescription : API to get info about particular user
 * @apiGroup : Users
 * @apiName : get-info
 * ***************************************************************************************************************************************************************
 * @apiParam {String} email       email
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
 *          "msg": "user info retrieved",
 *          "userData": $userData
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
      var user_data = new users.getOne({
        useremail: email,
      });

      user_data
        .then(async (userData) => {
          jwt
            .verify(token, env.JWT_EXPIRY)
            .then((decrypted) => {
              var authority_data = new users.getOne({
                useremail: decrypted.email,
              });

              authority_data
                .then(async function (d) {
                  if (d) {
                    if (d.userlevel.toString() == "superAdmin") {
                      util.makeResponse(res, true, 200, "Success", "1.0.0", [
                        {
                          msg: "user info retrieved",
                          userData: userData,
                        },
                      ]);
                    } else if (d.userlevel.toString() == "admin") {
                      if (
                        env.USER_LEVEL.indexOf(userData.userlevel.toString()) >
                        1
                      ) {
                        util.makeResponse(res, true, 200, "Success", "1.0.0", [
                          {
                            msg: "user info retrieved",
                            userData: userData,
                          },
                        ]);
                      } else {
                        util.makeResponse(res, false, 401, "failure", "1.0.0", [
                          {
                            msg: "Not an authorised user to get the user info.",
                          },
                        ]);
                      }
                    } else if (d.userlevel.toString() == "client") {
                      if (
                        env.USER_LEVEL.indexOf(userData.userlevel.toString()) >
                        2
                      ) {
                        if (
                          userData.client_id.toString() ==
                          d.client_id.toString()
                        ) {
                          util.makeResponse(
                            res,
                            true,
                            200,
                            "Success",
                            "1.0.0",
                            [
                              {
                                msg: "user info retrieved",
                                userData: userData,
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
                                msg:
                                  "This user is not from your organisation, so you have no right to gather his/her info.",
                              },
                            ]
                          );
                        }
                      } else {
                        util.makeResponse(res, false, 401, "failure", "1.0.0", [
                          {
                            msg: "Not an authorised user to get the user info.",
                          },
                        ]);
                      }
                    } else if (d.userlevel.toString() == "manager") {
                      if (
                        env.USER_LEVEL.indexOf(userData.userlevel.toString()) >
                        3
                      ) {
                        if (
                          userData.client_id.toString() ==
                          d.client_id.toString()
                        ) {
                          util.makeResponse(
                            res,
                            true,
                            200,
                            "Success",
                            "1.0.0",
                            [
                              {
                                msg: "user info retrieved",
                                userData: userData,
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
                                msg:
                                  "This user is not from your organisation, so you have no right to gather his/her info.",
                              },
                            ]
                          );
                        }
                      } else {
                        util.makeResponse(res, false, 401, "failure", "1.0.0", [
                          {
                            msg: "Not an authorised user to get the user info.",
                          },
                        ]);
                      }
                    } else {
                      util.makeResponse(res, false, 401, "failure", "1.0.0", [
                        {
                          msg: "Not an authorised user to get the user info.",
                        },
                      ]);
                    }
                  }
                })
                .catch((err) => {
                  console.log("Test1 : " + err);
                  
                  util.makeResponse(res, false, 500, "failure", "1.0.0", [
                    {
                      msg: err,
                    },
                  ]);
                });
            })
            .catch((err) => {
              util.makeResponse(res, false, 401, "failure", "1.0.0", [
                {
                  msg: "Token validation failed. hence, authorisation failed.",
                },
              ]);
            });
        })
        .catch((err) => {
          console.log("Test2 : " + err);
          
          util.makeResponse(res, false, 500, "failure", "1.0.0", [
            {
              msg: err,
            },
          ]);
        });
    } else {
      util.makeResponse(res, false, 401, "failure", "1.0.0", [
        {
          msg: "Authority validation failed.",
        },
      ]);
    }
  } else {
    res.sendStatus(403).json({ error: "Request from unknown source..." });
  }
});

module.exports = router;
