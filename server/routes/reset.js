import express from "express";
import authController from "../controller/authController";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /reset ************************************************************************/
/**
 * @api {post} /reset reset
 * @apiDescription :Reset password process
 * @apiGroup : Users
 * @apiName : ResetPassword
 * ***************************************************************************************************************************************************************
 * @apiParam {String} email             email
 * @apiParam {String} password          password
 * @apiParam {String} confirmpassword   confirmpassword
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
 *           "msg": "Password reset successfully.",
 *        }
 *   ]
 * }
 * @apiVersion 1.0.0
 */

router.post("/", authController.reset);

router.get("/", (req, res) => {
  var ua = req.headers["user-agent"];

  if (ua) {
    var query = req.query;
    if (query && query.token) {
      res.render("update-forgot-password", {
        messages: {
          token: query.token
        }
      });
    }
  } else {
      res.sendStatus(403).json({ error: "Request from unknown source..." });
  }
});

module.exports = router;
