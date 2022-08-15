import env from "../env";
import jwt from "../utility/jwt";
import departmentsModel from "../models/departmentsModel";
import usersModel from "../models/usersModel";
import util from "../utility/custom";

const departmentsController = {
  viewDepartments: async (req, res) => {
    var ua = req.headers["user-agent"];
    var data = req.body;
    var token = req.cookies.token ? req.cookies.token : req.body.token;
    var agent_email = data.agent_email;
    var client_id = req.cookies.client_id;

    if (ua) {
      if (token) {
        jwt
          .verify(token, env.JWT_EXPIRY)
          .then((decrypted) => {
            let email = decrypted.email;

            usersModel.findOne({ useremail: email }, (err, d1) => {
              if (err) {
                if (ua.indexOf("ul") >= 0) {
                  util.makeResponse(res, false, 500, "failure", "1.0.0", [
                    {
                      msg: "Internal Error.",
                    },
                  ]);
                } else {
                  res.clearCookie("token");
                  res.clearCookie("client_id");
                  res.redirect("/signin");
                }
              } else {
                let userlevel = d1.userlevel.toString();
                let condition = {};
                if (agent_email) {
                  condition["email"] = agent_email;
                } else {
                  if(userlevel == "manager") {
                    usersModel.findOne({userlevel: "client", client_id: d1.client_id}, (err, dd)=>{
                      condition["email"] = dd.useremail;
                    });
                  } else {
                    condition["email"] = d1.useremail.toString();
                  }
                  
                }

                if (client_id && client_id != "undefined") {
                  condition["client_id"] = client_id;
                } else {
                  condition["client_id"] = d1.client_id.toString();
                }

                departmentsModel.findOne(condition, (err, d2) => {
                  if (err) {
                    if (ua.indexOf("ul") >= 0) {
                      util.makeResponse(res, false, 500, "failure", "1.0.0", [
                        {
                          msg: "Internal Error!!!!.",
                        },
                      ]);
                    } else {
                      res.clearCookie("token");
                      res.clearCookie("client_id");
                      res.redirect("/signin");
                    }
                  } else {
                    if (ua.indexOf("ul") >= 0) {
                      util.makeResponse(res, true, 200, "Success", "1.0.0", [
                        {
                          msg: "departments list retrieved successfully",
                          "department-list": d2.departments,
                        },
                      ]);
                    } else {
                      if (userlevel == "client" || userlevel == "manager") {
                        res.render("departments", {
                          info: {
                            username: d1.username,
                            email: d1.useremail,
                            userlevel: d1.userlevel.toString(),
                            company: d1.company.toString(),
                            logo: d1.logo.toString(),
                          },
                          departmentsInfo: d2.departments,
                        });
                      } else {
                        util.makeResponse(res, true, 200, "Success", "1.0.0", [
                          {
                            msg: "departments list retrieved successfully",
                            "department-list": d2.departments,
                          },
                        ]);
                      }
                    }
                  }
                });
              }
            });
          })
          .catch((err) => {
            if (ua.indexOf("ul") >= 0) {
              util.makeResponse(res, false, 401, "failure", "1.0.0", [
                {
                  msg:
                    "Token Validation failed. Try login using email and password",
                },
              ]);
            } else {
              res.clearCookie("token");
              res.clearCookie("client_id");
              res.cookie(
                "error",
                "Token Validation failed. Try login using email and password."
              );
              res.redirect("/signin");
            }
          });
      } else {
        if (ua.indexOf("ul") >= 0) {
          util.makeResponse(res, false, 401, "failure", "1.0.0", [
            {
              msg: "Token not available",
            },
          ]);
        } else {
          res.clearCookie("token");
          res.clearCookie("client_id");
          res.redirect("/signin");
        }
      }
    } else {
      util.makeResponse(res, false, 403, "failure", "1.0.0", [
        {
          msg: "Request made from unauthorised resource.",
        },
      ]);
    }
  },
};

export default departmentsController;
