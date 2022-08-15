import express from "express";
import usersModel from "../models/usersModel";
import departmentsModel from "../models/departmentsModel";
import util from "../utility/custom";
import jwt from "../utility/jwt";
import env from "../env";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /agent-dept ************************************************************************/
/**
 * @api {post} /agent-dept agent-dept
 * @apiDescription : API to get the list of dept. available for agent as well as update the allot dept. for agent.
 * @apiGroup : Users
 * @apiName : agent-dept
 * ***************************************************************************************************************************************************************
 * @apiParam {String} type        "getList" | "updateList"
 * @apiParam {String} token       token
 * @apiParam {Array}  dept_list   dept_list(in case of "updateList" only)
 * @apiParam {String} agent_email agent_email
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
 *          "agentDept": $agentDept,
 *          "clientDept": $clientDept
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
              let agent_email = data.agent_email;
              let type = data.type;
              if (userlevel == "agent") {
              } else if (userlevel == "client") {
                if (type && type.toString() == "getList") {
                  retrieveAgentDept(d.client_id, d.useremail, agent_email, res);
                } else if (type && type == "updateList") {
                  if (data.dept_list)
                    updateAgentDept(
                      d.client_id,
                      d.useremail,
                      agent_email,
                      data.dept_list,
                      res
                    );
                }
              } else if (userlevel == "manager") {
                usersModel.findOne(
                  { client_id: d.client_id, userlevel: "client" },
                  (err, dd) => {
                    if (err) {
                      util.makeResponse(res, false, 401, "failure", "1.0.0", [
                        {
                          error:
                            "Error in gathering information about client from manager info!!!",
                        },
                      ]);
                    } else {
                      if (type && type.toString() == "getList") {
                        retrieveAgentDept(
                          dd.client_id,
                          dd.useremail,
                          agent_email,
                          res
                        );
                      } else if (type && type == "updateList") {
                        if (data.dept_list)
                          updateAgentDept(
                            dd.client_id,
                            dd.useremail,
                            agent_email,
                            data.dept_list,
                            res
                          );
                      }
                    }
                  }
                );
              } else if (userlevel == "superAdmin" || userlevel == "admin") {
                let clientDetails = await usersModel.aggregate([
                  { $match: { useremail: agent_email } },
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
                                { $eq: ["$userlevel", "client"] },
                              ],
                            },
                          },
                        },
                      ],
                      as: "clientDetails",
                    },
                  },
                  {
                    $project: {
                      _id: 0,
                      username: 0,
                      userpassword: 0,
                      id: 0,
                      passwordChangeNeeded: 0,
                      time: 0,
                      __v: 0,
                      company: 0,
                      phone: 0,
                      phone2: 0,
                      logo: 0,
                      status: 0,
                      passwordChangeNeeded: 0,
                      industry: 0,
                      verification: {
                        _id: 0,
                        username: 0,
                        userpassword: 0,
                        id: 0,
                        passwordChangeNeeded: 0,
                        time: 0,
                        __v: 0,
                        company: 0,
                        phone: 0,
                        phone2: 0,
                        logo: 0,
                        status: 0,
                        passwordChangeNeeded: 0,
                        industry: 0,
                      },
                    },
                  },
                ]);

                if (type && type == "getList") {
                  retrieveAgentDept(
                    clientDetails[0].client_id,
                    clientDetails[0].clientDetails[0].useremail,
                    agent_email,
                    res
                  );
                } else if (type && type == "updateList") {
                  if (data.dept_list)
                    updateAgentDept(
                      clientDetails[0].client_id,
                      clientDetails[0].clientDetails[0].useremail,
                      agent_email,
                      data.dept_list,
                      res
                    );
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

async function retrieveAgentDept(clientID, clientEmail, agentEmail, res) {
  let DeptDetails = await departmentsModel.aggregate([
    { $match: { email: agentEmail } },
    {
      $lookup: {
        from: "departments",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$client_id", clientID] },
                  { $eq: ["$email", clientEmail] },
                ],
              },
            },
          },
        ],
        as: "clientDept",
      },
    },
    {
      $project: {
        _id: 0,
        __v: 0,
        email: 0,
        client_id: 0,
        time: 0,
        clientDept: {
          _id: 0,
          __v: 0,
          email: 0,
          client_id: 0,
          time: 0,
        },
      },
    },
  ]);

  util.makeResponse(res, true, 200, "Success", "1.0.0", [
    {
      msg: "Departments list updated successfully.",
      agentDept: DeptDetails[0].departments,
      clientDept: DeptDetails[0].clientDept[0].departments,
    },
  ]);
}

async function updateAgentDept(
  clientID,
  clientEmail,
  agentEmail,
  deptList,
  res
) {
  departmentsModel.findOneAndUpdate(
    { email: agentEmail, client_id: clientID },
    { $push: { departments: { $each: deptList } } },
    {
      new: true,
      upsert: false,
    },
    (err, doc) => {
      if (doc) {
        util.makeResponse(res, true, 200, "Success", "1.0.0", [
          {
            msg: "departments list updated successfully for agent.",
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
}

module.exports = router;
