import * as uuid from "uuid";

import env from "../env";
import jwt from "../utility/jwt";
import pipelineModel from "../models/pipelineModel";
import users from "../controller/usersController";
import util from "../utility/custom";

const pipelineController = {

    addToPipeline: (req, res) => {
        var ua = req.headers["user-agent"];

        var token = req.body.token ? req.body.token : req.cookies.token;
        var data = req.body;

        if (ua) {
            if (token) {
                jwt.verify(token, env.JWT_EXPIRY).then((decrypted) => {
                    let user = new users.getOne({ useremail: decrypted.email });

                    user.then((d) => {
                        if (d && (d.userlevel == "client" || d.userlevel == "manager" ||
                            d.userlevel == "agent")) {
                            data.uuid = uuid.v1();
                            data.client_id = d.client_id;
                            new pipelineModel(data).save().then(() => {
                                util.makeResponse(
                                    res,
                                    true,
                                    200,
                                    "Success",
                                    "1.0.0",
                                    [
                                        {
                                            msg: "added to pipeline successfully.",
                                        },
                                    ]
                                );
                            }).catch((err) => {
                                util.makeResponse(
                                    res,
                                    false,
                                    401,
                                    "failure",
                                    "1.0.0",
                                    [
                                        {
                                            error:
                                                "Error in adding to pipeline!",
                                        },
                                    ]
                                );
                            });
                        } else {
                            util.makeResponse(res, false, 401, "failure", "1.0.0", [
                                {
                                    error:
                                        "you are not a valid user to update the pipeline list!!",
                                },
                            ]);
                        }
                    }).catch((err) => {
                        util.makeResponse(res, false, 501, "failure", "1.0.0", [
                            {
                                error: "There is datbase internal error!!!",
                            },
                        ]);
                    });
                }).catch((err) => {
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

    viewPipeline: async (req, res) => {
        var ua = req.headers["user-agent"];

        var token = req.body.token ? req.body.token : req.cookies.token;

        if (ua) {
            if (token) {
                jwt.verify(token, env.JWT_EXPIRY).then((decrypted) => {
                    let user = new users.getOne({ useremail: decrypted.email });

                    user.then((d) => {
                        if (d && (d.userlevel == "client" || d.userlevel == "manager" ||
                            d.userlevel == "agent")) {
                            let client_id = d.client_id;
                            pipelineModel.find(
                                { client_id: client_id },
                                {
                                    _id: 0,
                                }
                            ).then((doc) => {
                                res.render("pipeline", {
                                    info: {
                                        client_id: client_id,
                                        username: d.username,
                                        email: d.useremail,
                                        userlevel: d.userlevel ? d.userlevel.toString() : null,
                                        company: d.company ? d.company.toString() : null,
                                        logo: d.logo ? d.logo.toString() : null,
                                        pipeline: doc
                                    },
                                });
                            }).catch((e) => {
                                res.render("pipeline", {
                                    info: {
                                        client_id: client_id,
                                        username: d.username,
                                        email: d.useremail,
                                        userlevel: d.userlevel.toString(),
                                        company: d.company.toString(),
                                        logo: d.logo.toString(),
                                        pipeline: []
                                    },
                                });
                            });
                        } else {
                            if (ua.indexOf("ul") >= 0) {
                                util.makeResponse(res, false, 401, "failure", "1.0.0", [
                                    {
                                        error:
                                            "you are not a valid user to fetch the pipeline list!!",
                                    },
                                ]);
                            } else {
                                res.clearCookie("token");
                                res.clearCookie("client_id");
                                res.cookie(
                                    "error",
                                    "you are not a valid user to fetch the pipeline list!!"
                                );
                                res.redirect("/signin");
                            }
                        }
                    }).catch((err) => {
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
                }).catch((err) => {
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

    deletePipeline: (req, res) => {
        var ua = req.headers["user-agent"];

        var token = req.body.token ? req.body.token : req.cookies.token;
        var uuid = req.body.uuid;

        if (ua) {
            if (token) {
                jwt.verify(token, env.JWT_EXPIRY).then((decrypted) => {
                    let user = new users.getOne({ useremail: decrypted.email });

                    user.then((d) => {
                        if (d && (d.userlevel == "client" || d.userlevel == "manager" ||
                            d.userlevel == "agent")) {
                            pipelineModel.deleteOne({ uuid: uuid }).then(() => {
                                util.makeResponse(
                                    res,
                                    true,
                                    200,
                                    "Success",
                                    "1.0.0",
                                    [
                                        {
                                            msg: "pipeline deleted successfully.",
                                        },
                                    ]
                                );
                            }).catch((err) => {
                                util.makeResponse(
                                    res,
                                    false,
                                    401,
                                    "failure",
                                    "1.0.0",
                                    [
                                        {
                                            error:
                                                "Error in deleting the pipeline!",
                                        },
                                    ]
                                );
                            });
                        } else {
                            util.makeResponse(res, false, 401, "failure", "1.0.0", [
                                {
                                    error:
                                        "you are not a valid user to delete the pipeline!!",
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
                }).catch((err) => {
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
};

export default pipelineController;
