import express from "express";
import authController from "../controller/authController";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /signin ************************************************************************/
/**
 * @api {post} /signin signin
 * @apiDescription :signin process using email and password
 * @apiGroup : Users
 * @apiName : signin
 * ***************************************************************************************************************************************************************
 * @apiParam {String} email       email
 * @apiParam {String} password    password
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
 *          "token": $token
 *          "username": $username,
 *          "email": $email,
 *          "userlevel": "superAdmin"/"admin"/"client"/"manager"/"agent"
 *          "msg": "Signin Successfull"
 *       }
 *   ]
 * }
 * @apiVersion 1.0.0
 */

/***************************************************************************************************************************************************************/
/************************************************************************ /signin ************************************************************************/
/**
 * @api {post} /signin signin-using-token
 * @apiDescription :signin process using token
 * @apiGroup : Users
 * @apiName : signin using token
 * ***************************************************************************************************************************************************************
 * @apiParam {String} token       token
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
 *          "username": $username,
 *          "email": $email,
 *          "userlevel": "superAdmin"/"admin"/"client"/"manager"/"agent"
 *          "msg": "Signin Successfull"
 *        }
 *   ]
 * }
 * @apiVersion 1.0.0
 */
router.post("/", authController.login);

router.get("/", (req, res) => {
  var ua = req.headers["user-agent"];

  if (ua) {
    if (req.cookies.token) {
      res.redirect("/dashboard");
    } else {
      let error = req.cookies.error ? req.cookies.error: null;
      let success = req.cookies.success ? req.cookies.success : null;
      res.clearCookie("error");
      res.clearCookie("success");
      res.render("login", {
        messages: {
          error: error ? [error] : null,
          success: success ? [success] : null
        }
      });
    }
  } else {
    res.sendStatus(403).json({ error: "Request from unknown source..." });
  }
});

module.exports = router;
