import express from "express";
import users from "../controller/usersController";
import util from "../utility/custom";
import jwt from "../utility/jwt";
import env from "../env";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /edit-profile ************************************************************************/
/**
 * @api {post} /edit-profile edit-profile
 * @apiDescription : API to update information by user himself/herself.
 * @apiGroup : Users
 * @apiName : profile
 * ***************************************************************************************************************************************************************
 * @apiParam {String} token     token
 * @apiParam {String} address   address
 * @apiParam {String} phone     phone
 * @apiParam {String} phone2    phone2
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
 *          "msg":          "my profile updated successfully."
 *       }
 *   ]
 * }
 * @apiVersion 1.0.0
 */

router.post("/", (req, res) => {
  var ua = req.headers["user-agent"];
  var token = req.body.token ? req.body.token : req.cookies.token;
  var data = req.body;
  if (ua) {
    if (token) {

      jwt
        .verify(token, env.JWT_EXPIRY)
        .then(async (decrypted) => {

          let updateInfo = new users.findOneAndUpdate(
            { useremail: decrypted.email },
            data
          );

          updateInfo.then((data) => {
            if (data) {
              util.makeResponse(res, true, 200, "Success", "1.0.0", [
                {
                  msg: "Information updated successfully.",
                },
              ]);
            } else {
              util.makeResponse(res, false, 401, "failure", "1.0.0", [
                {
                  msg: "User doesn't exist.",
                },
              ]);
            }
          });
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
