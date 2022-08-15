import express from "express";
import usersModel from "../models/usersModel";
import util from "../utility/custom";
import jwt from "../utility/jwt";
import env from "../env";
import notesModel from "../models/notesModel";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /user-notes ************************************************************************/
/**
 * @api {post} /user-notes user-notes
 * @apiDescription : API to get existing notes as well as update the notes.
 * @apiGroup : Users
 * @apiName : user-notes
 * ***************************************************************************************************************************************************************
 * @apiParam {String} type        "getNotes" | "updateNotes"
 * @apiParam {String} token       token
 * @apiParam {Array}  notes       notes_content(in case of "updateNotes" only)
 * @apiParam {String} email       email
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
 *          "msg": "Departments list updated successfully.",
 *          "notes": $notes
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
        .then(async (decrypted) => {
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
              let req_email = data.email;
              let type = data.type;
              if (userlevel == "agent") {
                if (req_email == decrypted.email) {
                  if (type == "getNotes") {
                    retrieveNotes(req_email, res);
                  } else if (type == "updateNotes") {
                    util.makeResponse(res, false, 401, "failure", "1.0.0", [
                      {
                        error:
                          "You are not allowed to update the notes of yours!!!",
                      },
                    ]);
                  }
                } else {
                  util.makeResponse(res, false, 401, "failure", "1.0.0", [
                    {
                      error:
                        "You are not allowed to view or update the notes of anyone!!!",
                    },
                  ]);
                }
              } else if (userlevel == "client") {
                if (req_email == decrypted.email) {
                  if (type == "getNotes") {
                    retrieveNotes(req_email, res);
                  } else if (type == "updateNotes") {
                    util.makeResponse(res, false, 401, "failure", "1.0.0", [
                      {
                        error:
                          "You are not allowed to update the notes of yours!!!",
                      },
                    ]);
                  }
                } else {
                  let requestedUser = await usersModel.aggregate([
                    { $match: { useremail: decrypted.email } },
                    {
                      $lookup: {
                        from: "users",
                        let: { client_id: "$client_id" },

                        pipeline: [
                          {
                            $match: {
                              $expr: {
                                $and: [
                                  { $eq: ["$client_id", "$$client_id"] },
                                  { $eq: ["$useremail", req_email] },
                                ],
                              },
                            },
                          },
                        ],
                        as: "reqUser",
                      },
                    },
                  ]);

                  if (requestedUser && requestedUser[0].reqUser.length > 0) {
                    if (type == "getNotes") {
                      retrieveNotes(req_email, res);
                    } else if (type == "updateNotes") {
                      updateNotes(req_email, data.notes, res);
                    } else {
                      util.makeResponse(res, false, 401, "failure", "1.0.0", [
                        {
                          error: "Bad request!!!",
                        },
                      ]);
                    }
                  } else {
                    util.makeResponse(res, false, 401, "failure", "1.0.0", [
                      {
                        error: "Data mapping failed with client!!!",
                      },
                    ]);
                  }
                }
              } else if (userlevel == "manager") {
                if (req_email == decrypted.email) {
                  if (type == "getNotes") {
                    retrieveNotes(req_email, res);
                  } else if (type == "updateNotes") {
                    util.makeResponse(res, false, 401, "failure", "1.0.0", [
                      {
                        error:
                          "You are not allowed to update the notes of yours!!!",
                      },
                    ]);
                  }
                } else {
                  let requestedUser = await usersModel.aggregate([
                    { $match: { useremail: decrypted.email } },
                    {
                      $lookup: {
                        from: "users",
                        let: { client_id: "$client_id" },

                        pipeline: [
                          {
                            $match: {
                              $expr: {
                                $and: [
                                  { $eq: ["$client_id", "$$client_id"] },
                                  { $eq: ["$useremail", req_email] },
                                  { $eq: ["$userlevel", "agent"] },
                                ],
                              },
                            },
                          },
                        ],
                        as: "reqUser",
                      },
                    },
                  ]);

                  if (requestedUser && requestedUser[0].reqUser.length > 0) {
                    if (type == "getNotes") {
                      retrieveNotes(req_email, res);
                    } else if (type == "updateNotes") {
                      updateNotes(req_email, data.notes, res);
                    } else {
                      util.makeResponse(res, false, 401, "failure", "1.0.0", [
                        {
                          error: "Bad request!!!",
                        },
                      ]);
                    }
                  } else {
                    util.makeResponse(res, false, 401, "failure", "1.0.0", [
                      {
                        error: "Data mapping failed with manager!!!",
                      },
                    ]);
                  }
                }
              } else if (userlevel == "admin") {
                if (req_email == decrypted.email) {
                  if (type == "getNotes") {
                    retrieveNotes(req_email, res);
                  } else if (type == "updateNotes") {
                    util.makeResponse(res, false, 401, "failure", "1.0.0", [
                      {
                        error:
                          "You are not allowed to update the notes of yours!!!",
                      },
                    ]);
                  }
                } else {
                  usersModel.findOne(
                    { useremail: req_email },
                    (err, reqUserDetails) => {
                      if (err) {
                      } else {
                        if (
                          env.USER_LEVEL.indexOf(
                            reqUserDetails.userlevel.toString()
                          ) > 1
                        ) {
                          if (type == "getNotes") {
                            retrieveNotes(req_email, res);
                          } else if (type == "updateNotes") {
                            updateNotes(req_email, data.notes, res);
                          } else {
                            util.makeResponse(
                              res,
                              false,
                              401,
                              "failure",
                              "1.0.0",
                              [
                                {
                                  error: "Bad request!!!",
                                },
                              ]
                            );
                          }
                        }
                      }
                    }
                  );
                }
              } else if (userlevel == "superAdmin") {
                if (type == "getNotes") {
                  retrieveNotes(req_email, res);
                } else if (type == "updateNotes") {
                  updateNotes(req_email, data.notes, res);
                } else {
                  util.makeResponse(res, false, 401, "failure", "1.0.0", [
                    {
                      error: "Bad request!!!",
                    },
                  ]);
                }
              } else {
                util.makeResponse(res, false, 401, "failure", "1.0.0", [
                  {
                    error: "Not an authorised person for this operations!!!!",
                  },
                ]);
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
          error:
            "Authority validation failed. Token not available for authentication.",
        },
      ]);
    }
  } else {
    res.sendStatus(403).json({ error: "Request from unknown source..." });
  }
});

function retrieveNotes(req_email, res) {
  notesModel.findOne({ email: req_email }, (err, notes) => {
    if (err) {
      util.makeResponse(res, false, 401, "failure", "1.0.0", [
        {
          error: "Error in retrieveing the notes!!!",
        },
      ]);
    } else {
      util.makeResponse(res, true, 200, "Success", "1.0.0", [
        {
          msg: "Notes retrieved.",
          notes: notes ? notes.notes : "",
        },
      ]);
    }
  });
}

function updateNotes(email, notes, res) {
  notesModel.findOneAndUpdate(
    { email: email },
    { notes: notes },
    {
      new: true,
      upsert: true,
    },
    (err, doc) => {
      if (err) {
        util.makeResponse(res, false, 401, "failure", "1.0.0", [
          {
            error: "Error in updating the notes!!!",
          },
        ]);
      } else {
        util.makeResponse(res, true, 200, "Success", "1.0.0", [
          {
            msg: "Notes updated.",
          },
        ]);
      }
    }
  );
}

module.exports = router;
