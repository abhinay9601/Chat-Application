import express from "express";
import auth from "../controller/authController";
import jwt from "../utility/jwt";
import users from "../controller/usersController";
import env from "../env";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /change-password ************************************************************************/
/**
 * @api {post} /change-password change-password
 * @apiDescription : API to change the password of logged-in user
 * @apiGroup : Users
 * @apiName : change-password
 * ***************************************************************************************************************************************************************
 * @apiParam {String} token             token
 * @apiParam {String} currentpassword   currentpassword
 * @apiParam {String} password          password
 * @apiParam {String} confirmpassword   confirmpassword
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
 *          "msg": "Password changed successfully. Login again with new password"
 *      }
 *   ]
 * }
 */

router.post("/", auth.changePassword);

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
              if (d.passwordChangeNeeded) {
                res.render("change-password", {
                  messages: {
                    success: ["Change your temporary password!"]
                  }
                });
              } else {
                res.render("change-password", {
                  messages: {}
                });
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
      res.clearCookie("token");
      res.clearCookie("client_id");
      res.redirect("/signin");
    }
  } else {
    res.sendStatus(403).json({ error: "Request from unknown source..." });
  }
});

module.exports = router;
