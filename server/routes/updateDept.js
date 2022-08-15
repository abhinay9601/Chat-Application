import express from "express";
import usersModel from "../models/usersModel";
import departmentsModel from "../models/departmentsModel";
import util from "../utility/custom";
import jwt from "../utility/jwt";
import env from "../env";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /update-dept ************************************************************************/
/**
 * @api {post} /update-dept update-dept
 * @apiDescription : API to update departments list about particular client by client himself or by his managers
 * @apiGroup : Users
 * @apiName : update-dept
 * ***************************************************************************************************************************************************************
 * @apiParam {String} dept_list   dept_arr
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
 *          "msg": "Departments list updated successfully."
 *       }
 *   ]
 * }
 * @apiVersion 1.0.0
 */

router.post("/", (req, res) => {
  var ua = req.headers["user-agent"];
  var token = req.body.token ? req.body.token : req.cookies.token;
  var data = req.body;
  if (ua) {
    if (token) {
      jwt
        .verify(token, env.JWT_EXPIRY)
        .then((decrypted) => {
          usersModel.findOne({ useremail: decrypted.email }, async (err, d) => {
            if (err) {
              util.makeResponse(res, false, 401, "failure", "1.0.0", [
                {
                  error:
                    "Error in gathering information about logged in user!!!",
                },
              ]);
            } else {
              let userlevel = d.userlevel.toString();
              let dept_list = data.dept_list;
              let clientEmail;
              if (userlevel == "client") {
                clientEmail = d.useremail;

                departmentsModel.findOneAndUpdate(
                  { email: clientEmail },
                  { $set: { departments: dept_list } },
                  {
                    new: true,
                    upsert: false,
                  },
                  (err, doc) => {
                    if (doc) {
                      util.makeResponse(res, true, 200, "Success", "1.0.0", [
                        {
                          msg: "departments list updated successfully.",
                        },
                      ]);
                    } else {
                      util.makeResponse(res, false, 401, "failure", "1.0.0", [
                        {
                          error: "Error in updating dept. list for client!!!!",
                        },
                      ]);
                    }
                  }
                );
              } else if (userlevel == "manager") {
                usersModel.findOne(
                  {
                    client_id: d.client_id,
                    userlevel: "client",
                  },
                  (err, dd) => {
                    if (err) {
                    } else {
                      clientEmail = dd.useremail;

                      departmentsModel.findOneAndUpdate(
                        { email: clientEmail },
                        { $push: { departments: { $each: dept_list } } },
                        {
                          new: true,
                          upsert: false,
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
                                  msg: "departments list updated successfully.",
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
                                    "Error in updating dept. list for client!!!!!",
                                },
                              ]
                            );
                          }
                        }
                      );
                    }
                  }
                );
              } else {
                util.makeResponse(res, false, 401, "failure", "1.0.0", [
                  {
                    error: "You are not allowed to the this section!!!",
                  },
                ]);
                return;
              }
            }
          });
        })
        .catch((err) => {
          util.makeResponse(res, false, 401, "failure", "1.0.0", [
            {
              error: "Error in validating the token!!!!",
            },
          ]);
        });
    } else {
      util.makeResponse(res, false, 401, "failure", "1.0.0", [
        {
          msg:
            "Authority validation failed. Token not available for authentication.",
        },
      ]);
    }
  } else {
    res.sendStatus(403).json({ error: "Request from unknown source..." });
  }
});

module.exports = router;
