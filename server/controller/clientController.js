import util from "../utility/custom";
import users from "./usersController";
import jwt from "../utility/jwt";
import admins from "./adminController";
import tk from "./tokenController";
import randomstring from "randomstring";
import { v4 as uuidv4 } from "uuid";
import env from "../env";
import departmentsModel from "../models/departmentsModel";

const clientController = {
  addClient: async (req, res) => {
    var ua = req.headers["user-agent"];
    var data = req.body;
    var token = req.cookies.token ? req.cookies.token : req.body.token;

    req.checkBody("email", "Email-Id Is Required").notEmpty();
    req.checkBody("username", "User Name Is Required").notEmpty();
    req.checkBody("phone", "Phone number Is Required").notEmpty();
    req.checkBody("address", "Address Is Required").notEmpty();
    req.checkBody("industry", "Industry Field Is Required").notEmpty();
    req.checkBody("company", "Company Name Is Required").notEmpty();
    req.checkBody("userlevel", "userlevel Is Required").notEmpty();
    req.checkBody("logo", "Select company Logo").notEmpty();

    if (ua) {
      if (token) {
        admins
          .getAdminDetailsUsingToken(token)
          .then(async (info) => {
            var clientList;
            if (info.userlevel == "admin" || info.userlevel == "superAdmin") {
              try {
                clientList = await new users.getAll({ userlevel: "client" });
              } catch (error) {
                console.log(
                  "Error in fetching client list for admin or super admin."
                );
                clientList = [];
              }
            }

            var email = data.email;
            var username = data.username;
            var phone = data.phone;
            var phone2 = data.phone2;
            var address = data.address;
            var userlevel = data.userlevel;
            var industry = data.industry;
            var company = data.company;
            var logo = data.logo;

            req
              .asyncValidationErrors()
              .then(() => {
                if (userlevel == "client") {
                  var count = new users.getCount({
                    useremail: data.email,
                  });
                  count
                    .then(function (gotItRight) {
                      console.log(gotItRight);
                      if (gotItRight === 0) {
                        let clientCode =
                          userlevel == "client"
                            ? "client" +
                              randomstring.generate({
                                length: 6,
                                charset: "numeric",
                              })
                            : null;
                        //Intializing departments for agent with general dept.
                        departmentsModel.create(
                          {
                            email: email,
                            client_id: clientCode,
                            departments: ["General"],
                          },
                          (err, d) => {}
                        );

                        var signupDetails = {
                          username: username,
                          userpassword: "testing123456",
                          phone: phone,
                          phone2: phone2,
                          address: address,
                          useremail: email,
                          userlevel: userlevel,
                          industry: industry,
                          company: company,
                          logo: logo,
                          client_id: clientCode,
                          passwordChangeNeeded: true,
                          status: true,
                        };
                        var signUpStatus = new users.create(signupDetails);
                        signUpStatus
                          .then(async (addToDB) => {
                            var subject = "Verify Account.";
                            var link = "";
                            var uuid = uuidv4();

                            if (addToDB == 1) {
                              var signup_token = tk.create({
                                uuid: uuid,
                                email: email,
                                purpose: "need-verification",
                              });

                              if (ua.indexOf("ul") >= 0) {
                                util.makeResponse(
                                  res,
                                  true,
                                  200,
                                  "Success",
                                  "1.0.0",
                                  [
                                    {
                                      msg: `${userlevel} is added successfully.`,
                                    },
                                  ]
                                );
                              } else {
                                res.render("add-client", {
                                  messages: {
                                    success: [
                                      "Account for client created successfully.",
                                    ],
                                  },
                                  info: info,
                                  clientInfo: clientList,
                                });
                              }
                            } else {
                              if (ua.indexOf("ul") >= 0) {
                                util.makeResponse(
                                  res,
                                  false,
                                  500,
                                  "failure",
                                  "1.0.0",
                                  [
                                    {
                                      msg: "Internal Error!",
                                    },
                                  ]
                                );
                              } else {
                                res.render("add-client", {
                                  messages: {
                                    username: username,
                                    email: email,
                                    phone: phone,
                                    address: address,
                                    client_id: info.client_id,
                                    userlevel: userlevel,
                                    phone2: phone2,
                                    industry: industry,
                                    Company: company,
                                    error: [
                                      "Internal error in adding manager...",
                                    ],
                                  },
                                  info: info,
                                  clientInfo: clientList,
                                });
                              }
                            }
                          })
                          .catch(function (err) {
                            console.log("ERRR : : " + err);

                            if (ua.indexOf("ul") >= 0) {
                              util.makeResponse(
                                res,
                                false,
                                401,
                                "failure",
                                "1.0.0",
                                [
                                  {
                                    msg: "SignUp  Failed",
                                  },
                                ]
                              );
                            } else {
                              res.render("add-client", {
                                messages: {
                                  username: username,
                                  email: email,
                                  phone: phone,
                                  address: address,
                                  client_id: info.client_id,
                                  userlevel: userlevel,
                                  phone2: phone2,
                                  industry: industry,
                                  Company: company,
                                  error: ["Signup failed..."],
                                },
                                info: info,
                                clientInfo: clientList,
                              });
                            }
                          });
                      } else {
                        if (ua.indexOf("ul") >= 0) {
                          util.makeResponse(
                            res,
                            false,
                            409,
                            "failure",
                            "1.0.0",
                            [
                              {
                                msg: "Email Already Exist",
                              },
                            ]
                          );
                        } else {
                          res.render("add-client", {
                            messages: {
                              username: username,
                              email: email,
                              phone: phone,
                              address: address,
                              client_id: info.client_id,
                              userlevel: userlevel,
                              phone2: phone2,
                              industry: industry,
                              Company: company,
                              error: ["User with this email already exist..."],
                            },
                            info: info,
                            clientInfo: clientList,
                          });
                        }
                      }
                    })
                    .catch(function (failed) {
                      if (ua.indexOf("ul") >= 0) {
                        util.makeResponse(res, false, 500, "failure", "1.0.0", [
                          {
                            msg: "Internal Error.",
                          },
                        ]);
                      } else {
                        res.render("add-client", {
                          messages: {
                            username: username,
                            email: email,
                            phone: phone,
                            address: address,
                            client_id: info.client_id,
                            userlevel: userlevel,
                            phone2: phone2,
                            industry: industry,
                            Company: company,
                            error: [
                              "Error in gathering existing info for this email.",
                            ],
                          },
                          info: info,
                          clientInfo: clientList,
                        });
                      }
                    });
                } else {
                  if (ua.indexOf("ul") >= 0) {
                    util.makeResponse(res, false, 422, "failure", "1.0.0", [
                      {
                        msg: "Invalid userlevel",
                      },
                    ]);
                  } else {
                    res.render("add-client", {
                      messages: {
                        username: username,
                        email: email,
                        phone: phone,
                        address: address,
                        client_id: info.client_id,
                        userlevel: userlevel,
                        phone2: phone2,
                        industry: industry,
                        Company: company,
                        error: ["Invalid userlevel"],
                      },
                      info: info,
                      clientInfo: clientList,
                    });
                  }
                }
              })
              .catch((err) => {
                if (ua.indexOf("ul") >= 0) {
                  util.makeResponse(res, false, 422, "failure", "1.0.0", [
                    {
                      msg: err,
                    },
                  ]);
                } else {
                  res.render("add-client", {
                    info: info,
                    messages: {
                      username: username,
                      email: email,
                      phone: phone,
                      address: address,
                      client_id: info.client_id,
                      userlevel: userlevel,
                      phone2: phone2,
                      industry: industry,
                      Company: company,
                      error: [err[0].msg],
                    },
                    clientInfo: clientList,
                  });
                }
              });
          })
          .catch((err) => {
            if (ua.indexOf("ul") >= 0) {
              util.makeResponse(res, false, 401, "failure", "1.0.0", [
                {
                  msg: "error in validating admin.",
                },
              ]);
            } else {
              res.clearCookie("token");
              res.clearCookie("client_id");
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
          res.clearCookie("client");
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
  getClientDetailsUsingToken: async (token, reqFor, client_id, purpose) => {
    return new Promise((resolve, reject) => {
      if (token) {
        jwt
          .verify(token, env.JWT_EXPIRY)
          .then((decrypted) => {
            var data = new users.getOne({
              useremail: decrypted.email,
            });

            data
              .then(async function (d) {
                if (d) {
                  if (reqFor == "agent") {
                    if (
                      d.userlevel.toString() == "client" ||
                      d.userlevel.toString() == "manager" ||
                      (purpose == "view" && d.userlevel.toString() == "agent")
                    ) {
                      resolve({
                        username: d.username.toString(),
                        email: d.useremail.toString(),
                        userlevel: d.userlevel.toString(),
                        client_id: d.client_id.toString(),
                        industry: d.industry.toString(),
                        company: d.company.toString(),
                        logo: d.logo.toString(),
                      });
                    } else if (
                      (d.userlevel.toString() == "admin" ||
                        d.userlevel.toString() == "superAdmin") &&
                      client_id
                    ) {
                      var clientDetails = new users.getOne({
                        userlevel: "client",
                        client_id: client_id,
                      });

                      clientDetails
                        .then((ci) => {
                          resolve({
                            username: d.username.toString(),
                            email: d.useremail.toString(),
                            userlevel: d.userlevel.toString(),
                            client_id: client_id,
                            industry: ci.industry.toString(),
                            company: ci.company.toString(),
                            logo: ci.logo.toString(),
                          });
                        })
                        .catch((err) => {
                          reject(-1);
                        });
                    } else {
                      reject(-1);
                    }
                  } else if (reqFor == "manager") {
                    if (
                      d.userlevel.toString() == "client" ||
                      (purpose == "view" && d.userlevel.toString() == "manager")
                    ) {
                      resolve({
                        username: d.username.toString(),
                        email: d.useremail.toString(),
                        userlevel: d.userlevel.toString(),
                        client_id: d.client_id.toString(),
                        industry: d.industry.toString(),
                        company: d.company.toString(),
                        logo: d.logo.toString(),
                      });
                    } else if (
                      (d.userlevel.toString() == "admin" ||
                        d.userlevel.toString() == "superAdmin") &&
                      client_id
                    ) {
                      var clientDetails = new users.getOne({
                        userlevel: "client",
                        client_id: client_id,
                      });

                      clientDetails
                        .then((ci) => {
                          resolve({
                            username: d.username.toString(),
                            email: d.useremail.toString(),
                            userlevel: d.userlevel.toString(),
                            client_id: client_id,
                            industry: ci.industry.toString(),
                            company: ci.company.toString(),
                            logo: ci.logo.toString(),
                          });
                        })
                        .catch((err) => {
                          reject(-1);
                        });
                    } else {
                      reject(-1);
                    }
                  }
                } else {
                  reject(-1);
                }
              })
              .catch((err) => {
                console.log("Eririr : " + err);
                reject(-1);
              });
          })
          .catch((err) => {
            console.log("JWT : " + err);
            reject(-1);
          });
      } else {
        reject(-1);
      }
    });
  },

  viewClient: async (req, res) => {
    var ua = req.headers["user-agent"];
    var token = req.cookies.token ? req.cookies.token : req.body.token;

    if (ua) {
      if (token) {
        admins
          .getAdminDetailsUsingToken(token)
          .then((info) => {
            users
              .viewList("client")
              .then((data) => {
                if (ua.indexOf("ul") >= 0) {
                  util.makeResponse(res, true, 200, "Success", "1.0.0", [
                    {
                      msg: "clients list retrieved successfully",
                      "client-list": data,
                    },
                  ]);
                } else {
                  res.render("view-client", {
                    messages: {
                      success: ["clients list retrieved successfully"],
                    },
                    info: info,
                    clientInfo: data,
                  });
                }
              })
              .catch((err) => {
                if (ua.indexOf("ul") >= 0) {
                  util.makeResponse(res, false, 500, "failure", "1.0.0", [
                    {
                      error: err,
                    },
                  ]);
                } else {
                  console.log("Internal pipeline error");

                  res.clearCookie("token");
                  res.clearCookie("client_id");
                  res.redirect("/signin");
                }
              });
          })
          .catch((err) => {
            if (ua.indexOf("ul") >= 0) {
              util.makeResponse(res, false, 401, "failure", "1.0.0", [
                {
                  msg: "error in validating client.",
                },
              ]);
            } else {
              res.clearCookie("token");
              res.clearCookie("client_id");
              res.redirect("/signin");
            }
          });
      } else {
        if (ua.indexOf("ul") >= 0) {
          util.makeResponse(res, false, 401, "failure", "1.0.0", [
            {
              msg:
                "Token is not available for validation. please signout and try fresh login.",
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

export default clientController;
