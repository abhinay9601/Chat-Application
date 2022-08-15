import express from "express";
import tokenController from "../controller/tokenController";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /refreshtoken ************************************************************************/
/**
 * @api {post} /refreshtoken regenerate-token
 * @apiDescription : To get the new token for already logged in user.
 * @apiGroup : Users
 * @apiName : refresh-token
 * ***************************************************************************************************************************************************************
 * @apiParam {String} token token
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
 *           "token": $token,
 *           "msg": "Signin Successfull"
 *        }
 *   ]
 * }
 * @apiVersion 1.0.0
 */

router.post("/", tokenController.regenerateToken);

module.exports = router;
