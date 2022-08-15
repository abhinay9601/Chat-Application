import express from "express";
import env from "../env";
import jwt from "../utility/jwt";
import departments from "../controller/departmentsController";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /departments ************************************************************************/
/**
 * @api {post} /departments departments
 * @apiDescription : Get the list of departments in the particular organisation
 * @apiGroup : Users
 * @apiName :  departments
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
 *          "msg": "departments list retrieved successfully",
 *          "department-list": departments_array
 *      }
 *   ]
 * }
 *  @apiVersion 1.0.0
 */

router.post("/", departments.viewDepartments);
router.get("/", departments.viewDepartments);


module.exports = router;
