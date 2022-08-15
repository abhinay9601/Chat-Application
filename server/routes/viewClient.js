import express from "express";
import client from "../controller/clientController";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /view-client ************************************************************************/
/**
 * @api {post} /view-manager view-client
 * @apiDescription : Get the list of clients
 * @apiGroup : Users
 * @apiName :  view-client
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
 *          "msg": "clients list retrieved successfully",
 *          "client-list": clientData_array
 *      }
 *   ]
 * }
 *  @apiVersion 1.0.0
 */


router.post("/", client.viewClient);

router.get("/", client.viewClient);

module.exports = router;
