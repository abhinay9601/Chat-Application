import env from "../env";
import jwt from "../utility/jwt";
import setupModel from "../models/setupModel";
import users from "../controller/usersController";
import util from "../utility/custom";

const setupController = {

    getConfigForChatBox: (req, res) => {
        setupModel.findOne({ client_id: req.body.client_id }, (err, doc) => {
            if (doc) {
                util.makeResponse(
                    res,
                    true,
                    200,
                    "Success",
                    "1.0.0",
                    [
                        {
                            msg: "setup config fetched successfully.",
                            payment_link: doc.payment_link ? doc.payment_link : null,
                            availabilty_window: doc.availabilty_window ? doc.availabilty_window : null
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
                                "Error in fetching the setup config!",
                        },
                    ]
                );
            }
        });
    },

    getExistingConfig: (req, res) => {
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
                                let client_id = d.client_id;

                                setupModel.findOne({ client_id: client_id }, (err, doc) => {
                                    if (doc) {
                                        util.makeResponse(
                                            res,
                                            true,
                                            200,
                                            "Success",
                                            "1.0.0",
                                            [
                                                {
                                                    msg: "setup config fetched successfully.",
                                                    payment_link: doc.payment_link ? doc.payment_link : null,
                                                    availabilty_window: doc.availabilty_window ? doc.availabilty_window : null
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
                                                        "Error in fetching the setup config!",
                                                },
                                            ]
                                        );
                                    }
                                });
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
    updateSetup: (req, res) => {
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

                                    setupModel.findOneAndUpdate(
                                        { client_id: client_id },
                                        {
                                            $set: data
                                        },
                                        {
                                            new: true,
                                            upsert: true
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
                                                            msg: "setup config updated successfully.",
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
                                                                "Error in updating the setup config!",
                                                        },
                                                    ]
                                                );
                                            }
                                        }
                                    );
                                } else {
                                    util.makeResponse(res, false, 401, "failure", "1.0.0", [
                                        {
                                            error:
                                                "you are not a valid user to update the setup config!!",
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
    viewSetup: async (req, res) => {
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
                                    setupModel
                                        .findOne(
                                            { client_id: client_id },
                                            {
                                                _id: 0,
                                            }
                                        )
                                        .then((doc) => {
                                            res.render("setup", {
                                                info: {
                                                    client_id: client_id,
                                                    username: d.username,
                                                    email: d.useremail,
                                                    userlevel: d.userlevel ? d.userlevel.toString() : null,
                                                    company: d.company ? d.company.toString() : null,
                                                    logo: d.logo ? d.logo.toString() : null,
                                                    payment_link: doc.payment_link ? doc.payment_link : null,
                                                    availabilty_window: doc.availabilty_window ? doc.availabilty_window : null
                                                },
                                            });
                                        })
                                        .catch((e) => {
                                            res.render("setup", {
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
                                                    "you are not a valid user to update the setup config!!",
                                            },
                                        ]);
                                    } else {
                                        res.clearCookie("token");
                                        res.clearCookie("client_id");
                                        res.cookie(
                                            "error",
                                            "you are not a valid user to update the setup config!!"
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

export default setupController;
