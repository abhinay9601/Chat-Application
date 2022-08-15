import express from "express";
import admin from "../controller/adminController";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /view-admin ************************************************************************/
/**
 * @api {post} /view-admin view-admin
 * @apiDescription : Get the list of admins
 * @apiGroup : Users
 * @apiName :  view-admin
 * ***************************************************************************************************************************************************************
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
 *          "msg": "admins list retrieved successfully",
 *          "admin-list": adminData_array
 *      }
 *   ]
 * }
 *  @apiVersion 1.0.0
 */

router.post("/", admin.viewAdmin);

router.get("/", admin.viewAdmin);

module.exports = router;
