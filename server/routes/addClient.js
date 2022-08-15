import express from "express";
import client from "../controller/clientController";
import users from "../controller/usersController";
import jwt from "../utility/jwt";
import env from "../env";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /add-client ************************************************************************/
/**
 * @api {post} /add-client add-client
 * @apiDescription :Adding client to user list
 * @apiGroup : Users
 * @apiName : add-client
 * ***************************************************************************************************************************************************************
 * @apiParam {String} email             email
 * @apiParam {String} phone             phone
 * @apiParam {String} phone2            phone2
 * @apiParam {String} industry          industry_field
 * @apiParam {String} company           company_name
 * @apiParam {String} logo              logo(base64 img data)
 * @apiParam {String} address           address
 * @apiParam {String} username          username
 * @apiParam {String} userlevel         "client"
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
 *          "msg": "client is added successfully"
 *      }
 *   ]
 * }
 */

router.post("/", client.addClient);

router.get("/", async (req, res) => {
  var ua = req.headers["user-agent"];

  if (ua) {
    if (req.cookies.token) {
      jwt
        .verify(req.cookies.token, env.JWT_EXPIRY)
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
                    d.userlevel.toString() == "superAdmin" ||
                    d.userlevel.toString() == "admin"
                  ) {
                    var clientList;
                    try {
                      clientList = await new users.getAll({
                        userlevel: "client"
                      });
                    } catch (error) {
                      console.log(
                        "Error in fetching client list for admin or super admin."
                      );
                      clientList = [];
                    }
                  }

                  if (
                    d.userlevel.toString() == "superAdmin" ||
                    d.userlevel.toString() == "admin"
                  ) {
                    res.clearCookie("client_id");
                    res.render("add-client", {
                      info: d,
                      messages: {},
                      clientInfo: clientList
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
