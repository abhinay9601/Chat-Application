import express from "express";
import usersModel from "../models/usersModel";
import util from "../utility/custom";
import jwt from "../utility/jwt";
import env from "../env";

const router = express.Router();

router.get('/', async (req, res) => {
    var ua = req.headers["user-agent"];
    var token = req.cookies.token ? req.cookies.token : req.body.token;
    var agentEmail = req.query.email;
    if (ua) {
        if (token) {
            if (agentEmail) {
                try {
                    const decrypted = await jwt.verify(token, env.JWT_EXPIRY);
                    let users = await usersModel.findOne({ useremail: decrypted.email }).lean();
                    let agent = await usersModel.findOne(
                        {
                            useremail: agentEmail,
                            userlevel: 'agent'
                        }
                    ).lean();
                    if (users != null && agent != null) {
                        res.render("edit-agent", {
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
                                agent: agent
                            }
                        });
                    } else {
                        res.clearCookie("token");
                        res.clearCookie("client_id");
                        res.redirect("/signin");
                    }
                } catch (err) {
                    console.log("Error ::: " + err);
                    res.clearCookie("token");
                    res.clearCookie("client_id");
                    res.redirect("/signin");
                }
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
});

module.exports = router;
