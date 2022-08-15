import express from "express";
import usersModel from "../models/usersModel";
import util from "../utility/custom";
import jwt from "../utility/jwt";
import env from "../env";

const router = express.Router();

router.get('/', async (req, res) => {
    var ua = req.headers["user-agent"];
    var token = req.cookies.token ? req.cookies.token : req.body.token;
    if (ua) {
        if (token) {
            try {
                const decrypted = await jwt.verify(token, env.JWT_EXPIRY);
                let users = await usersModel.aggregate([
                    { $match: { useremail: decrypted.email } },
                    {
                        $lookup: {
                            from: "departments",
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [{ $eq: ["$email", decrypted.email] }],
                                        },
                                    },
                                },
                            ],
                            as: "dept",
                        }
                    }
                ]);
                if (users != null) {
                    users = users[0];
                    res.render("profile", {
                        info: {
                            username: users.username,
                            email: users.useremail,
                            userlevel: users.userlevel.toString(),
                            company: users.company.toString(),
                            logo: users.logo.toString(),
                            client_id: users.client_id.toString(),
                            id: users.id.toString(),
                            phone: users.phone,
                            phone2: users.phone2,
                            address: users.address,
                            avtar: users.avtar,
                            departments: users.dept[0] && users.dept[0].departments ? users.dept[0].departments : []
                        }
                    });
                } else {
                    res.clearCookie("token");
                    res.clearCookie("client_id");
                    res.redirect("/signin");
                }
            } catch (err) {
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
});

router.post("/", (req, res) => {
    var ua = req.headers["user-agent"];
    var token = req.body.token ? req.body.token : req.cookies.token;
    var data = req.body;
    if (ua) {
        if (token) {
            jwt
                .verify(token, env.JWT_EXPIRY)
                .then(async (decrypted) => {
                    try {
                        let usersDetail = await usersModel.aggregate([
                            { $match: { useremail: decrypted.email } },
                            {
                                $lookup: {
                                    from: "departments",
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [{ $eq: ["$email", decrypted.email] }],
                                                },
                                            },
                                        },
                                    ],
                                    as: "Dept",
                                },
                            },
                        ]);

                        if (usersDetail) {
                            util.makeResponse(res, true, 200, "Success", "1.0.0", [
                                {
                                    msg: "User info retrieved successfully.",
                                    name: usersDetail[0].username,
                                    Email: usersDetail[0].useremail,
                                    Phone: usersDetail[0].phone,
                                    Phone2: usersDetail[0].phone2,
                                    Address: usersDetail[0].address,
                                    userlevel: usersDetail[0].userlevel,
                                    company: usersDetail[0].company,
                                    Departments: usersDetail[0].Dept[0]
                                        ? usersDetail[0].Dept[0].departments
                                        : null,
                                    avtar: usersDetail[0].avtar
                                },
                            ]);
                        } else {
                            util.makeResponse(res, false, 401, "failure", "1.0.0", [
                                {
                                    error: "Something went wrong!!!!",
                                },
                            ]);
                        }
                    } catch (err) {
                        console.log("EEEE: " + err);

                        util.makeResponse(res, false, 401, "failure", "1.0.0", [
                            {
                                error: "Error in fetching the details!!!!",
                            },
                        ]);
                    }
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

module.exports = router;
