import express from "express";
import auth from "../controller/authController";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /signup ************************************************************************/
/**
 * @api {post} /signup signup
 * @apiDescription :signup process
 * @apiGroup : Users
 * @apiName : signup
 * ***************************************************************************************************************************************************************
 * @apiParam {String} email             email
 * @apiParam {String} password          password
 * @apiParam {String} confirmpassword   confirmpassword
 * @apiParam {String} username          username
 * @apiParam {String} userlevel         "admin"/"client"/"manager"/"agent"
 * @apiParam {String} client_id         client_id
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
 *          "msg": "$userlevel is added successfully"
 *      }
 *   ]
 * }
 */ 

router.post("/", auth.register);

module.exports = router;
