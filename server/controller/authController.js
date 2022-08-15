import env from "../env";
import util from "../utility/custom";
import mailer from "../utility/mailer";
import users from "./usersController";
import tk from "./tokenController";
import {
    RtcTokenBuilder,
    RtmTokenBuilder,
    RtcRole,
    RtmRole,
} from "agora-access-token";
import jwt from "../utility/jwt";
import { v4 as uuidv4 } from "uuid";
import randomstring from "randomstring";
import mobilesessionModel from "../models/mobilesessionModal";
import notificationModel from "../models/notificationModel";
import channelsModel from "../models/channelsModel";

const authController = {
    register: (req, res) => {
        var ua = req.headers["user-agent"];
        console.log("User Agent :" + ua);

        var data = req.body;
        req.checkBody("email", "Email-Id Is Required").notEmpty();
        req.checkBody("username", "User Name Is Required").notEmpty();
        req.checkBody("password", "Password Is Required").notEmpty();
        req.checkBody("confirmpassword", "Confirm-Password Is Required").notEmpty();
        req.checkBody("userlevel", "userlevel Is Required").notEmpty();

        if (ua) {
            req
                .asyncValidationErrors()
                .then(() => {
                    var email = data.email;
                    var username = data.username;
                    var password = data.password;
                    var confirmpassword = data.confirmpassword;
                    var userlevel = data.userlevel;

                    if (env.USER_LEVEL.indexOf(userlevel) <= 0) {
                        if (ua.indexOf("ul") >= 0) {
                            util.makeResponse(res, false, 422, "failure", "1.0.0", [
                                {
                                    error: "Invalid user type for signup.",
                                },
                            ]);
                        } else {
                        }
                    } else if (userlevel == "manager" || userlevel == "agent") {
                        req.checkBody("client_id", "client_id Is Required").notEmpty();

                        req
                            .asyncValidationErrors()
                            .then(() => {
                                if (password === confirmpassword) {
                                    var count = new users.getCount({
                                        useremail: data.email,
                                    });
                                    count
                                        .then(function (gotItRight) {
                                            console.log(gotItRight);
                                            if (gotItRight === 0) {
                                                var signUpStatus = new users.create({
                                                    username: username,
                                                    userpassword: password,
                                                    useremail: email,
                                                    userlevel: userlevel,
                                                    client_id: data.client_id,
                                                });
                                                signUpStatus
                                                    .then(async (addToDB) => {
                                                        var subject = "Verify Account.";
                                                        var link = "";
                                                        var uuid = uuidv4();

                                                        var resp = true;

                                                        if (resp) {
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
                                                            }
                                                        }
                                                    })
                                                    .catch(function (err) {
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
                                                }
                                            }
                                        })
                                        .catch(function (failed) {
                                            util.makeResponse(res, false, 500, "failure", "1.0.0", [
                                                {
                                                    msg: "Internal Error.",
                                                },
                                            ]);
                                        });
                                } else {
                                    if (ua.indexOf("ul") >= 0) {
                                        util.makeResponse(res, false, 401, "failure", "1.0.0", [
                                            {
                                                msg: "password and confirmpassword doesnot match",
                                            },
                                        ]);
                                    } else {
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
                                }
                            });
                    } else {
                        if (password === confirmpassword) {
                            var count = new users.getCount({
                                useremail: data.email,
                            });

                            count
                                .then(function (gotItRight) {
                                    console.log(gotItRight);
                                    if (gotItRight === 0) {
                                        var signUpStatus = new users.create({
                                            username: username,
                                            userpassword: password,
                                            useremail: email,
                                            userlevel: userlevel,
                                            client_id:
                                                userlevel == "client"
                                                    ? "client" +
                                                    randomstring.generate({
                                                        length: 6,
                                                        charset: "numeric",
                                                    })
                                                    : null,
                                        });

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
                                                    }
                                                }
                                            })
                                            .catch(function (err) {
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
                                                }
                                            });
                                    } else {
                                        if (ua.indexOf("ul") >= 0) {
                                            util.makeResponse(res, false, 409, "failure", "1.0.0", [
                                                {
                                                    msg: "Email Already Exist",
                                                },
                                            ]);
                                        } else {
                                        }
                                    }
                                })
                                .catch(function (failed) {
                                    util.makeResponse(res, false, 500, "failure", "1.0.0", [
                                        {
                                            msg: "Internal Error.",
                                        },
                                    ]);
                                });
                        } else {
                            if (ua.indexOf("ul") >= 0) {
                                util.makeResponse(res, false, 401, "failure", "1.0.0", [
                                    {
                                        msg: "password and confirmpassword doesnot match",
                                    },
                                ]);
                            } else {
                            }
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
                    }
                });
        } else {
            util.makeResponse(res, false, 403, "failure", "1.0.0", [
                {
                    msg: "Request made from unauthorised resource.",
                },
            ]);
        }
    },

    login: async (req, res) => {
        var ua = req.headers["user-agent"];
        var data = req.body;
        var req_token = req.body.token ? req.body.token : req.cookies.token;
        var notification_tkn = req.body.notification_token;
        if (ua) {
            if (req_token) {
                jwt
                    .verify(data.token ? data.token : req.cookies.token, env.JWT_EXPIRY)
                    .then((decrypted) => {
                        var data = new users.getOne({
                            useremail: decrypted.email,
                        });

                        data
                            .then(async function (d) {
                                if (d) {
                                    var acVerified = tk.count({
                                        email: decrypted.email,
                                        purpose: "need-verification",
                                    });

                                    acVerified
                                        .then(async (stillPending) => {
                                            if (stillPending == 0) {
                                                if (ua.indexOf("ul") >= 0) {
                                                    if (d.userlevel.toString() == "client" ||
                                                        d.userlevel.toString() == "manager" ||
                                                        d.userlevel.toString() == "agent") {
                                                        mobilesessionModel.create(
                                                            { token: token },
                                                            (err, tkn) => { }
                                                        );

                                                        notificationModel.findOneAndUpdate(
                                                            { email: decrypted.email },
                                                            {
                                                                token: notification_tkn,
                                                                client_id: d.client_id.toString(),
                                                                device:
                                                                    ua.indexOf("ios") >= 0 ? "ios" : "android",
                                                            },
                                                            {
                                                                upsert: true,
                                                                new: true,
                                                                setDefaultsOnInsert: true,
                                                            },
                                                            (err, result) => { }
                                                        );
                                                    }

                                                    util.makeResponse(
                                                        res,
                                                        true,
                                                        200,
                                                        "Success",
                                                        "1.0.0",
                                                        [
                                                            {
                                                                username: d.username,
                                                                email: d.useremail,
                                                                userlevel: d.userlevel,
                                                                client_id: d.client_id ? d.client_id : null,
                                                                logo: d.logo,
                                                                company: d.company,
                                                                status: d.status,
                                                                passwordChangeNeeded: d.passwordChangeNeeded,
                                                                msg: "Signin  Successfull",
                                                                link: env.PORTAL_URL + "/" + "?token=" + token,
                                                            },
                                                        ]
                                                    );
                                                } else {
                                                    res.cookie("client_id", d.client_id, {
                                                        maxAge: 24 * 60 * 60 * 1000,
                                                    });
                                                    if (d.passwordChangeNeeded) {
                                                        res.redirect("change-password");
                                                    } else {
                                                        res.redirect("dashboard");
                                                    }
                                                }
                                            } else {
                                                if (ua.indexOf("ul") >= 0) {
                                                    util.makeResponse(
                                                        res,
                                                        false,
                                                        403,
                                                        "failure",
                                                        "1.0.0",
                                                        [
                                                            {
                                                                msg:
                                                                    "Account verification status is still pending.",
                                                            },
                                                        ]
                                                    );
                                                } else {
                                                    res.render("login", {
                                                        messages: {
                                                            error: [
                                                                "Account verification status is still pending..",
                                                            ],
                                                        },
                                                    });
                                                }
                                            }
                                        })
                                        .catch((err) => {
                                            if (ua.indexOf("ul") >= 0) {
                                                util.makeResponse(res, false, 500, "failure", "1.0.0", [
                                                    {
                                                        msg: "Internal Error...!",
                                                    },
                                                ]);
                                            } else {
                                                res.render("login", {
                                                    messages: {
                                                        error: ["Internal Error...!"],
                                                    },
                                                });
                                            }
                                        });
                                } else {
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
                                        res.render("login", {
                                            messages: {
                                                error: [
                                                    "Token Validation failed. Try login using email and password.",
                                                ],
                                            },
                                        });
                                    }
                                }
                            })
                            .catch((err) => {
                                if (ua.indexOf("ul") >= 0) {
                                    util.makeResponse(res, false, 500, "failure", "1.0.0", [err]);
                                } else {
                                    res.render("login", {
                                        messages: {
                                            error: ["Internal database error...!!"],
                                        },
                                    });
                                }
                            });
                    })
                    .catch((err) => {
                        if (ua.indexOf("ul") >= 0) {
                            util.makeResponse(res, false, 401, "failure", "1.0.0", [err]);
                        } else {
                            res.clearCookie("token");
                            res.render("login", {
                                messages: {
                                    error: [
                                        "Token Validation failed. Try login using email and password!!!!",
                                    ],
                                },
                            });
                        }
                    });
            } else {
                var email = data.email;
                var password = data.password;
                req.checkBody("email", "Email-Id Is Required").notEmpty();
                req.checkBody("password", "Password  Is Required").notEmpty();

                req
                    .asyncValidationErrors()
                    .then(() => {
                        var data = new users.getOne({
                            useremail: email,
                            userpassword: password,
                        });
                        data
                            .then(async function (d) {
                                if (d) {
                                    if (!d.status) {
                                        if (ua.indexOf("ul") >= 0) {
                                            util.makeResponse(res, false, 403, "failure", "1.0.0", [
                                                {
                                                    msg: "Account is blocked. Please contact admin team.",
                                                },
                                            ]);
                                        } else {
                                            res.render("login", {
                                                messages: {
                                                    email: email,
                                                    password: password,
                                                    error: [
                                                        "Account is blocked. Please contact admin team.",
                                                    ],
                                                },
                                            });
                                        }
                                    } else {
                                        var acVerified = tk.count({
                                            email: email,
                                            purpose: "need-verification",
                                        });

                                        acVerified
                                            .then(async (stillPending) => {
                                                if (stillPending == 0) {
                                                    var token = await jwt.sign(
                                                        { email: email },
                                                        env.JWT_EXPIRY
                                                    );
                                                    if (
                                                        d.userlevel.toString() == "client" ||
                                                        d.userlevel.toString() == "manager" ||
                                                        d.userlevel.toString() == "agent"
                                                    ) {
                                                        createToken(
                                                            d.client_id.toString(),
                                                            d.client_id.toString(),
                                                            d.client_id.toString()
                                                        );
                                                    }


                                                    if (ua.indexOf("ul") >= 0) {
                                                        if (
                                                            d.userlevel.toString() == "client" ||
                                                            d.userlevel.toString() == "manager" ||
                                                            d.userlevel.toString() == "agent"
                                                        ) {
                                                            mobilesessionModel.create(
                                                                { token: token },
                                                                (err, tkn) => { }
                                                            );

                                                            notificationModel.findOneAndUpdate(
                                                                { email: email },
                                                                {
                                                                    token: notification_tkn,
                                                                    client_id: d.client_id.toString(),
                                                                    device:
                                                                        ua.indexOf("ios") >= 0 ? "ios" : "android",
                                                                },
                                                                {
                                                                    upsert: true,
                                                                    new: true,
                                                                    setDefaultsOnInsert: true,
                                                                },
                                                                (err, result) => { }
                                                            );
                                                        }

                                                        util.makeResponse(
                                                            res,
                                                            true,
                                                            200,
                                                            "Success",
                                                            "1.0.0",
                                                            [
                                                                {
                                                                    token: token,
                                                                    username: d.username,
                                                                    email: d.useremail,
                                                                    userlevel: d.userlevel,
                                                                    client_id: d.client_id ? d.client_id.toString() : null,
                                                                    logo: d.logo,
                                                                    company: d.company,
                                                                    status: d.status,
                                                                    passwordChangeNeeded: d.passwordChangeNeeded,
                                                                    msg: "Signin  Successfull",
                                                                    link:
                                                                        env.PORTAL_URL + "/" + "?token=" + token,
                                                                },
                                                            ]
                                                        );
                                                    } else {
                                                        res.cookie("token", token, {
                                                            maxAge: 24 * 60 * 60 * 1000,
                                                        });
                                                        res.cookie("client_id", d.client_id, {
                                                            maxAge: 24 * 60 * 60 * 1000,
                                                        });

                                                        if (d.passwordChangeNeeded) {
                                                            res.redirect("change-password");
                                                        } else {
                                                            res.redirect("dashboard");
                                                        }
                                                    }
                                                } else {
                                                    if (ua.indexOf("ul") >= 0) {
                                                        util.makeResponse(
                                                            res,
                                                            false,
                                                            403,
                                                            "failure",
                                                            "1.0.0",
                                                            [
                                                                {
                                                                    msg:
                                                                        "Account verification status is still pending.",
                                                                },
                                                            ]
                                                        );
                                                    } else {
                                                        res.render("login", {
                                                            messages: {
                                                                email: email,
                                                                password: password,
                                                                error: [
                                                                    "Account verification status is still pending.",
                                                                ],
                                                            },
                                                        });
                                                    }
                                                }
                                            })
                                            .catch((err) => {
                                                console.log("TEST IT:" + err);
                                                if (ua.indexOf("ul") >= 0) {
                                                    util.makeResponse(
                                                        res,
                                                        false,
                                                        500,
                                                        "failure",
                                                        "1.0.0",
                                                        [
                                                            {
                                                                msg: "Internal Error at login time...",
                                                            },
                                                        ]
                                                    );
                                                } else {
                                                    res.render("login", {
                                                        messages: {
                                                            email: email,
                                                            password: password,
                                                            error: ["Internal Error at login time..."],
                                                        },
                                                    });
                                                }
                                            });
                                    }
                                } else {
                                    if (ua.indexOf("ul") >= 0) {
                                        util.makeResponse(res, false, 401, "failure", "1.0.0", [
                                            {
                                                msg: "Email or Password Is Not Correct",
                                            },
                                        ]);
                                    } else {
                                        res.render("login", {
                                            messages: {
                                                email: email,
                                                error: ["Email or password is not correct"],
                                            },
                                        });
                                    }
                                }
                            })
                            .catch(function (err) {
                                if (ua.indexOf("ul") >= 0) {
                                    util.makeResponse(res, false, 500, "failure", "1.0.0", [
                                        {
                                            msg: "Internal Error at login time.",
                                        },
                                    ]);
                                } else {
                                    res.render("login", {
                                        messages: {
                                            email: email,
                                            password: password,
                                            error: ["Internal Error at login time."],
                                        },
                                    });
                                }
                            });
                    })
                    .catch((err) => {
                        if (ua.indexOf("ul") >= 0) {
                            util.makeResponse(res, false, 422, "failure", "1.0.0", [err]);
                        } else {
                            res.render("login", {
                                messages: {
                                    email: email,
                                    password: password,
                                    error: [err[0].msg],
                                },
                            });
                        }
                    });
            }
        } else {
            util.makeResponse(res, false, 403, "failure", "1.0.0", [
                {
                    msg: "Request made from unauthorised resource.",
                },
            ]);
        }
    },

    changePassword: async (req, res) => {
        var ua = req.headers["user-agent"];

        var data = req.body;
        req.checkBody("currentpassword", "Current Password Is Required").notEmpty();
        req.checkBody("password", "Password Is Required").notEmpty();
        req.checkBody("confirmpassword", "Confirm-Password Is Required").notEmpty();

        var req_token = req.body.token ? req.body.token : req.cookies.token;

        if (ua) {
            if (req_token) {
                let currentpassword = data.currentpassword;
                let password = data.password;
                let confirmpassword = data.confirmpassword;
                req
                    .asyncValidationErrors()
                    .then(() => {
                        if (confirmpassword == password) {
                            jwt
                                .verify(
                                    data.token ? data.token : req.cookies.token,
                                    env.JWT_EXPIRY
                                )
                                .then((decrypted) => {
                                    let update = new users.findOneAndUpdate(
                                        {
                                            useremail: decrypted.email,
                                            userpassword: currentpassword,
                                        },
                                        { userpassword: password, passwordChangeNeeded: false }
                                    );

                                    update
                                        .then((doc) => {
                                            if (
                                                doc &&
                                                doc.userpassword.toString() == currentpassword
                                            ) {
                                                if (ua.indexOf("ul") >= 0) {
                                                    util.makeResponse(
                                                        res,
                                                        true,
                                                        200,
                                                        "Success",
                                                        "1.0.0",
                                                        [
                                                            {
                                                                msg:
                                                                    "Password changed successfully. Login again with new password",
                                                            },
                                                        ]
                                                    );
                                                } else {
                                                    res.clearCookie("token");
                                                    res.clearCookie("client_id");
                                                    res.cookie(
                                                        "success",
                                                        "User password changed successfully. Login again with new password"
                                                    );
                                                    res.redirect("/signin");
                                                }
                                            } else {
                                                if (ua.indexOf("ul") >= 0) {
                                                    util.makeResponse(
                                                        res,
                                                        true,
                                                        200,
                                                        "Success",
                                                        "1.0.0",
                                                        [
                                                            {
                                                                msg: "Current password is incorrect.",
                                                            },
                                                        ]
                                                    );
                                                } else {
                                                    res.render("change-password", {
                                                        messages: {
                                                            currentpassword: currentpassword,
                                                            password: password,
                                                            confirmpassword: confirmpassword,
                                                            error: ["Current password is incorrect."],
                                                        },
                                                    });
                                                }
                                            }
                                        })
                                        .catch((err) => {
                                            console.log("Error : " + err);

                                            if (ua.indexOf("ul") >= 0) {
                                                util.makeResponse(res, false, 500, "failure", "1.0.0", [
                                                    {
                                                        msg: "Database not updated successfully.",
                                                    },
                                                ]);
                                            } else {
                                                res.render("change-password", {
                                                    messages: {
                                                        currentpassword: currentpassword,
                                                        password: password,
                                                        confirmpassword: confirmpassword,
                                                        error: [
                                                            "Facing issue with database server. Try after some time.",
                                                        ],
                                                    },
                                                });
                                            }
                                        });
                                })
                                .catch((err) => {
                                    if (ua.indexOf("ul") >= 0) {
                                        util.makeResponse(res, false, 401, "failure", "1.0.0", [
                                            err,
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
                                        msg: "password and confirmpassword doesnot match",
                                    },
                                ]);
                            } else {
                                res.render("change-password", {
                                    messages: {
                                        currentpassword: currentpassword,
                                        password: password,
                                        error: ["password and confirmpassword doesnot match"],
                                    },
                                });
                            }
                        }
                    })
                    .catch((err) => {
                        if (ua.indexOf("ul") >= 0) {
                            util.makeResponse(res, false, 422, "failure", "1.0.0", [err]);
                        } else {
                            res.render("change-password", {
                                messages: {
                                    currentpassword: currentpassword,
                                    password: password,
                                    error: [err[0].msg],
                                },
                            });
                        }
                    });
            } else {
                if (ua.indexOf("ul") >= 0) {
                    util.makeResponse(res, false, 401, "failure", "1.0.0", {
                        error: "Login first to change password",
                    });
                } else {
                    res.clearCookie("token");
                    res.clearCookie("client_id");
                    res.cookie("error", "Login first to change password");
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

    sendResetMail: async (req, res) => {
        var ua = req.headers["user-agent"];

        var data = req.body;
        var email = data.email;

        req.checkBody("email", "Email-Id Is Required").notEmpty();

        if (ua) {
            req
                .asyncValidationErrors()
                .then(() => {
                    var count = new users.getCount({
                        useremail: email,
                    });

                    count
                        .then(async (gotItRight) => {
                            if (gotItRight == 1) {
                                var uuid = uuidv4();

                                var subject = "Reset Password";
                                var link = "http://" + req.hostname + ":5000";
                                var body =
                                    '<p>Please click <a href="' +
                                    link +
                                    "/reset/?token=" +
                                    uuid +
                                    '">here</a> to reset. This link is valid for 24 hours.</p>';

                                var resp = await mailer.send(email, subject, body);

                                if (resp) {
                                    tk.create({
                                        uuid: uuid,
                                        email: email,
                                        purpose: "forgot-password",
                                    });

                                    if (ua.indexOf("ul") >= 0) {
                                        util.makeResponse(res, true, 200, "Success", "1.0.0", [
                                            {
                                                msg: `Reset mail sent successfully to ${email}`,
                                            },
                                        ]);
                                    } else {
                                        res.render("forgot-password", {
                                            messages: {
                                                success: ["Reset mail sent. Please check your inbox"],
                                            },
                                        });
                                    }
                                } else {
                                    if (ua.indexOf("ul") >= 0) {
                                        util.makeResponse(res, false, 500, "failure", "1.0.0", [
                                            {
                                                msg: "facing issue in sending mail.",
                                            },
                                        ]);
                                    } else {
                                        res.render("forgot-password", {
                                            messages: {
                                                email: email,
                                                error: ["facing issue with email provider."],
                                            },
                                        });
                                    }
                                }
                            } else {
                                if (ua.indexOf("ul") >= 0) {
                                    util.makeResponse(res, false, 401, "failure", "1.0.0", [
                                        {
                                            msg: "Email doesn't exist. Invalid user.",
                                        },
                                    ]);
                                } else {
                                    res.render("forgot-password", {
                                        messages: {
                                            email: email,
                                            error: ["Email doesn't exist. Invalid user."],
                                        },
                                    });
                                }
                            }
                        })
                        .catch(function (err) {
                            if (ua.indexOf("ul") >= 0) {
                                util.makeResponse(res, false, 500, "failure", "1.0.0", [
                                    {
                                        msg: "Facing issue with our database",
                                    },
                                ]);
                            } else {
                                res.render("forgot-password", {
                                    messages: {
                                        email: email,
                                        error: [
                                            "Facing issue with database. Please Try after sometime.",
                                        ],
                                    },
                                });
                            }
                        });
                })
                .catch((err) => {
                    if (ua.indexOf("ul") >= 0) {
                        util.makeResponse(res, false, 422, "failure", "1.0.0", [
                            {
                                msg: err,
                            },
                        ]);
                    } else {
                        res.render("forgot-password", {
                            messages: {
                                email: email,
                                error: [err[0].msg],
                            },
                        });
                    }
                });
        } else {
            util.makeResponse(res, false, 401, "failure", "1.0.0", [
                {
                    msg: "Request made from unauthorised resource.",
                },
            ]);
        }
    },

    reset: async (req, res) => {
        var ua = req.headers["user-agent"];

        var data = req.body;
        var email = data.email;
        var password = data.password;
        var confirmpassword = data.confirmpassword;
        var token = data.token;

        req.checkBody("email", "Email-Id Is Required").notEmpty();
        req.checkBody("password", "Password Is Required").notEmpty();
        req.checkBody("confirmpassword", "Confirm-Password Is Required").notEmpty();
        req.checkBody("token", "Token Is Required").notEmpty();

        if (ua) {
            req
                .asyncValidationErrors()
                .then(async () => {
                    let Validation_token = tk.getOne({
                        email: email,
                        uuid: token,
                    });

                    Validation_token.then((data) => {
                        if (data) {
                            if (Date.now() - data.time <= 24 * 60 * 60 * 1000) {
                                if (password == confirmpassword) {
                                    var update = new users.findOneAndUpdate(
                                        { useremail: email },
                                        { userpassword: password }
                                    );

                                    update
                                        .then((doc) => {
                                            tk.delete({ email: email, uuid: token });

                                            if (ua.indexOf("ul") >= 0) {
                                                util.makeResponse(res, true, 200, "Success", "1.0.0", [
                                                    {
                                                        msg: "Password reset successfully.",
                                                    },
                                                ]);
                                            } else {
                                                res.render("update-forgot-password", {
                                                    messages: {
                                                        success: ["Your password reset successfully."],
                                                    },
                                                });
                                            }
                                        })
                                        .catch((err) => {
                                            if (ua.indexOf("ul") >= 0) {
                                                util.makeResponse(res, false, 500, "failure", "1.0.0", [
                                                    {
                                                        msg: "Database not updated successfully.",
                                                    },
                                                ]);
                                            } else {
                                                res.render("update-forgot-password", {
                                                    messages: {
                                                        token: token,
                                                        email: email,
                                                        password: password,
                                                        confirmpassword: confirmpassword,
                                                        error: [
                                                            "Facing issue with database server. Try after some time.",
                                                        ],
                                                    },
                                                });
                                            }
                                        });
                                } else {
                                    if (ua.indexOf("ul") >= 0) {
                                        util.makeResponse(res, false, 401, "failure", "1.0.0", [
                                            {
                                                msg: "password and confirmpassword doesnot match",
                                            },
                                        ]);
                                    } else {
                                        res.render("update-forgot-password", {
                                            messages: {
                                                token: token,
                                                email: email,
                                                password: password,
                                                confirmpassword: confirmpassword,
                                                error: ["password and confirmpassword doesnot match"],
                                            },
                                        });
                                    }
                                }
                            } else {
                                if (ua.indexOf("ul") >= 0) {
                                    util.makeResponse(res, false, 410, "failure", "1.0.0", [
                                        {
                                            msg: "Forgot password link expired.",
                                        },
                                    ]);
                                } else {
                                    res.render("update-forgot-password", {
                                        messages: {
                                            token: token,
                                            email: email,
                                            password: password,
                                            confirmpassword: confirmpassword,
                                            error: ["Forgot Password link expired"],
                                        },
                                    });
                                }
                            }
                        } else {
                            if (ua.indexOf("ul") >= 0) {
                                util.makeResponse(res, false, 401, "failure", "1.0.0", [
                                    {
                                        msg: "Authentication failed for resetting password.",
                                    },
                                ]);
                            } else {
                            }
                        }
                    }).catch((err) => { });
                })
                .catch((err) => {
                    if (ua.indexOf("ul") >= 0) {
                        util.makeResponse(res, false, 422, "failure", "1.0.0", [
                            {
                                msg: err,
                            },
                        ]);
                    } else {
                        res.render("update-forgot-password", {
                            messages: {
                                token: token,
                                email: email,
                                password: password,
                                confirmpassword: confirmpassword,
                                error: [err[0].msg],
                            },
                        });
                    }
                });
        } else {
            util.makeResponse(res, false, 403, "failure", "1.0.0", [
                {
                    msg: "Request made from unauthorised resource.",
                },
            ]);
        }
    },
};

let createToken = async (channel, account, client_id) => {
    let appID = "cf4e00cc3ae7435a8f03b9e9f2aaa687";
    let appCertificate = "bda1858d1bc34d09b268165b1f0612ad";
    let channelName = channel;
    account = 0;
    let role = RtcRole.PUBLISHER;

    let expirationTimeInSeconds = 6 * 60 * 60;

    let currentTimestamp = Math.floor(Date.now() / 1000);

    let privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // Build token with user account
    let token = RtcTokenBuilder.buildTokenWithAccount(
        appID,
        appCertificate,
        channelName,
        account,
        role,
        privilegeExpiredTs
    );

    channelsModel.findOneAndUpdate(
        { channels: channelName },
        { client_id: client_id, account: account, token: token, active: true },
        {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
        },
        (err, result) => {
        }
    );
};
export default authController;
