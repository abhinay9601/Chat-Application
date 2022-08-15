import express from "express";
import manager from "../controller/managerController";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /view-manager ************************************************************************/
/**
 * @api {post} /view-manager view-manager
 * @apiDescription : Get the list of managers for current client
 * @apiGroup : Users
 * @apiName :  view-manager
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
 *          "msg": "managers list retrieved successfully",
 *          "manager-list": managerData_array
 *      }
 *   ]
 * }
 *  @apiVersion 1.0.0
 */


router.post("/", manager.viewManager);

router.get("/", manager.viewManager);

module.exports = router;
