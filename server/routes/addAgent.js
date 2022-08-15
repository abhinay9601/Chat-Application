import express from "express";
import agent from "../controller/agentController";
import users from "../controller/usersController";
import jwt from "../utility/jwt";
import env from "../env";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /add-agent ************************************************************************/
/**
 * @api {post} /add-agent add-agent
 * @apiDescription :Adding agent to user list
 * @apiGroup : Users
 * @apiName : add-agent
 * ***************************************************************************************************************************************************************
 * @apiParam {String} email             email
 * @apiParam {String} phone             phone
 * @apiParam {String} phone2            phone2
 * @apiParam {String} address           address
 * @apiParam {String} username          username
 * @apiParam {String} userlevel         "agent"
 * @apiParam {String} token             token
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
 *          "msg": "agent is added successfully"
 *      }
 *   ]
 * }
 * @apiVersion 1.0.0
 */

router.post("/", agent.addAgent);

router.get("/", async (req, res) => {
  var ua = req.headers["user-agent"];

  var token = req.body.token ? req.body.token : req.cookies.token;

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

      jwt
        .verify(token, env.JWT_EXPIRY)
        .then(decrypted => {
          var data = new users.getOne({
            useremail: decrypted.email
          });

          data
            .then(async function(d) {
              if (d) {
                if (d.passwordChangeNeeded) {
                  res.redirect("/change-password");
                } else {
                  if (
                    d.userlevel.toString() == "admin" ||
                    d.userlevel.toString() == "superAdmin" ||
                    d.userlevel.toString() == "client" ||
                    d.userlevel.toString() == "manager"
                  ) {
                    res.render("add-agent", {
                      info: d,
                      messages: {},
                      clientInfo: req.cookies.client_id ? clientList : d
                    });
                  } else {
                    res.clearCookie("token");
                    res.clearCookie("client_id");
                    res.redirect("/signin");
                  }
                }
              } else {
                res.clearCookie("token");
                res.clearCookie("client_id");
                res.redirect("/signin");
              }
            })
            .catch(err => {
              res.clearCookie("token");
              res.clearCookie("client_id");
              res.redirect("/signin");
            });
        })
        .catch(err => {
          res.clearCookie("token");
          res.clearCookie("client_id");
          res.redirect("/signin");
        });
    } else {
      res.redirect("/signin");
    }
  } else {
    res.sendStatus(403).json({ error: "Request from unknown source..." });
  }
});

module.exports = router;
