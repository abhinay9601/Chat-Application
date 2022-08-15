import express from "express";
import admin from "../controller/adminController";
import users from "../controller/usersController";
import jwt from "../utility/jwt";
import env from "../env";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /add-admin ************************************************************************/
/**
 * @api {post} /add-admin add-admin
 * @apiDescription :Adding admin to user list
 * @apiGroup : Users
 * @apiName : add-admin
 * ***************************************************************************************************************************************************************
 * @apiParam {String} email             email
 * @apiParam {String} phone             phone
 * @apiParam {String} phone2            phone2
 * @apiParam {String} address           address
 * @apiParam {String} username          username
 * @apiParam {String} userlevel         "admin"
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
 *          "msg": "admin is added successfully"
 *      }
 *   ]
 * }
 */

router.post("/", admin.addAdmin);

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
                if (d.userlevel.toString() == "superAdmin") {
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

                if (d.userlevel.toString() == "superAdmin") {
                  res.clearCookie("client_id");
                  res.render("add-admin", {
                    info: d,
                    messages: {},
                    clientInfo: clientList
                  });
                } else {
                  res.clearCookie("token");
                  res.clearCookie("client_id");
                  res.redirect("/signin");
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
