import util from "../utility/custom";
import users from "./usersController";
import clients from "./clientController";
import tk from "./tokenController";
import { v4 as uuidv4 } from "uuid";
import departmentsModel from "../models/departmentsModel";

const managerController = {
  addManager: async (req, res) => {
    var ua = req.headers["user-agent"];
    var data = req.body;
    var token = req.cookies.token ? req.cookies.token : req.body.token;

    req.checkBody("email", "Email-Id Is Required").notEmpty();
    req.checkBody("username", "User Name Is Required").notEmpty();
    req.checkBody("phone", "Phone number Is Required").notEmpty();
    req.checkBody("address", "Address Is Required").notEmpty();
    req.checkBody("userlevel", "userlevel Is Required").notEmpty();

    if (ua) {
      if (token) {
        var clientList;
        if (req.cookies.client_id) {
          try {
            clientList = await new users.getAll({ userlevel: "client" });
          } catch (error) {
            console.log(
              "Error in fetching client list for admin or super admin."
            );
            clientList = [];
          }
        }

        clients
          .getClientDetailsUsingToken(token, "manager", req.cookies.client_id)
          .then(info => {
            var email = data.email;
            var username = data.username;
            var phone = data.phone;
            var phone2 = data.phone2;
            var address = data.address;
            var userlevel = data.userlevel;
            req
              .asyncValidationErrors()
              .then(() => {
                if (userlevel == "manager") {
                  var count = new users.getCount({
                    useremail: data.email
                  });
                  count
                    .then(function(gotItRight) {
                      console.log(gotItRight);
                      if (gotItRight === 0) {

                        var signUpStatus = new users.create({
                          username: username,
                          userpassword: "testing123456",
                          useremail: email,
                          phone: phone,
                          phone2: phone2,
                          address: address,
                          userlevel: userlevel,
                          client_id: info.client_id,
                          industry: info.industry,
                          company: info.company,
                          logo: info.logo,
                          passwordChangeNeeded: true,
                          status: true
                        });
                        signUpStatus
                          .then(async addToDB => {
                            var subject = "Verify Account.";
                            var link = "";
                            var uuid = uuidv4();

                            if (addToDB == 1) {
                              var signup_token = tk.create({
                                uuid: uuid,
                                email: email,
                                purpose: "need-verification"
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
                                      msg: `${userlevel} is added successfully.`
                                    }
                                  ]
                                );
                              } else {
                                res.render("add-manager", {
                                  messages: {
                                    success: [
                                      "Account for manager created successfully."
                                    ]
                                  },
                                  info: info,
                                  clientInfo: clientList
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
                                      msg: "Internal Error!"
                                    }
                                  ]
                                );
                              } else {
                                res.render("add-manager", {
                                  messages: {
                                    username: username,
                                    email: email,
                                    phone: phone,
                                    phone2: phone2,
                                    address: address,
                                    client_id: info.client_id,
                                    userlevel: userlevel,
                                    error: [
                                      "Internal error in adding manager..."
                                    ]
                                  },
                                  info: info,
                                  clientInfo: clientList
                                });
                              }
                            }
                          })
                          .catch(function(err) {
                            if (ua.indexOf("ul") >= 0) {
                              util.makeResponse(
                                res,
                                false,
                                401,
                                "failure",
                                "1.0.0",
                                [
                                  {
                                    msg: "SignUp  Failed"
                                  }
                                ]
                              );
                            } else {
                              res.render("add-manager", {
                                messages: {
                                  username: username,
                                  email: email,
                                  phone: phone,
                                  phone2: phone2,
                                  address: address,
                                  client_id: info.client_id,
                                  userlevel: userlevel,
                                  error: ["Signup failed..."]
                                },
                                info: info,
                                clientInfo: clientList
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
                                msg: "Email Already Exist"
                              }
                            ]
                          );
                        } else {
                          res.render("add-manager", {
                            messages: {
                              username: username,
                              email: email,
                              phone: phone,
                              phone2: phone2,
                              address: address,
                              client_id: info.client_id,
                              userlevel: userlevel,
                              error: ["User with this email already exist..."]
                            },
                            info: info,
                            clientInfo: clientList
                          });
                        }
                      }
                    })
                    .catch(function(failed) {
                      
                      if (ua.indexOf("ul") >= 0) {
                        util.makeResponse(res, false, 500, "failure", "1.0.0", [
                          {
                            msg: "Internal Error."
                          }
                        ]);
                      } else {
                        res.render("add-manager", {
                          messages: {
                            username: username,
                            email: email,
                            phone: phone,
                            phone2: phone2,
                            address: address,
                            client_id: info.client_id,
                            userlevel: userlevel,
                            error: [
                              "Error in gathering existing info for this email."
                            ]
                          },
                          info: info,
                          clientInfo: clientList
                        });
                      }
                    });
                } else {
                  if (ua.indexOf("ul") >= 0) {
                    util.makeResponse(res, false, 422, "failure", "1.0.0", [
                      {
                        msg: "Invalid userlevel"
                      }
                    ]);
                  } else {
                    res.render("add-manager", {
                      messages: {
                        username: username,
                        email: email,
                        phone: phone,
                        phone2: phone2,
                        address: address,
                        client_id: info.client_id,
                        userlevel: userlevel,
                        error: ["Invalid userlevel"]
                      },
                      info: info,
                      clientInfo: clientList
                    });
                  }
                }
              })
              .catch(err => {
                if (ua.indexOf("ul") >= 0) {
                  util.makeResponse(res, false, 422, "failure", "1.0.0", [
                    {
                      msg: err
                    }
                  ]);
                } else {
                  res.render("add-manager", {
                    info: info,
                    messages: {
                      username: username,
                      email: email,
                      phone: phone,
                      phone2: phone2,
                      address: address,
                      client_id: info.client_id,
                      userlevel: userlevel,
                      error: [err[0].msg]
                    },
                    clientInfo: clientList
                  });
                }
              });
          })
          .catch(err => {
            if (ua.indexOf("ul") >= 0) {
              util.makeResponse(res, false, 401, "failure", "1.0.0", [
                {
                  msg: "error in validating client."
                }
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
              msg: "Token not available"
            }
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
          msg: "Request made from unauthorised resource."
        }
      ]);
    }
  },

  viewManager: async (req, res) => {
    var ua = req.headers["user-agent"];
    var token = req.cookies.token ? req.cookies.token : req.body.token;

    if (ua) {
      if (token) {
        var clientList;
        if (req.cookies.client_id) {
          try {
            clientList = await new users.getAll({ userlevel: "client" });
          } catch (error) {
            console.log(
              "Error in fetching client list for admin or super admin."
            );
            clientList = [];
          }
        }

        clients
          .getClientDetailsUsingToken(token, "manager", req.cookies.client_id, "view")
          .then(info => {
            var client_id = info.client_id;

            users
              .viewList("manager", client_id)
              .then(data => {
                if (ua.indexOf("ul") >= 0) {
                  util.makeResponse(res, true, 200, "Success", "1.0.0", [
                    {
                      msg: "managers list retrieved successfully",
                      "manager-list": data
                    }
                  ]);
                } else {
                  res.render("view-manager", {
                    messages: {
                      success: ["managers list retrieved successfully"]
                    },
                    info: info,
                    managerInfo: data,
                    clientInfo: clientList
                  });
                }
              })
              .catch(err => {
                if (ua.indexOf("ul") >= 0) {
                  util.makeResponse(res, false, 500, "failure", "1.0.0", [
                    {
                      error: "Internal pipeline error"
                    }
                  ]);
                } else {
                  console.log("Internal pipeline error");

                  res.clearCookie("token");
                  res.clearCookie("client_id");
                  res.redirect("/signin");
                }
              });
          })
          .catch(err => {
            if (ua.indexOf("ul") >= 0) {
              util.makeResponse(res, false, 401, "failure", "1.0.0", [
                {
                  msg: "error in validating client."
                }
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
                "Token is not available for validation. please signout and try fresh login."
            }
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
          msg: "Request made from unauthorised resource."
        }
      ]);
    }
  }
};

export default managerController;
