import express from "express";
import authController from "../controller/authController";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /resetmail ************************************************************************/
/**
 * @api {post} /resetmail reset-mail
 * @apiDescription :Send Reset password link to user
 * @apiGroup : Users
 * @apiName : GenerateResetLink
 * ***************************************************************************************************************************************************************
 * @apiParam {String} email             email
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
 *           "msg": "Reset mail sent successfully to ${email}",
 *        }
 *   ]
 * }
 * @apiVersion 1.0.0
 */

router.post("/", authController.sendResetMail);

router.get("/", (req, res) => {
  var ua = req.headers["user-agent"];

  if (ua) {
    res.render("forgot-password", {
      messages: {}
    });
  } else {
    res.sendStatus(403).json({ error: "Request from unknown source..." });
  }
});

module.exports = router;
