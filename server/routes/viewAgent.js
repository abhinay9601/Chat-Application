import express from "express";
import agent from "../controller/agentController";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /view-agent ************************************************************************/
/**
 * @api {post} /view-agent view-agent
 * @apiDescription : Get the list of agents for current client
 * @apiGroup : Users
 * @apiName :  view-agent
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
 *          "msg": "agents list retrieved successfully",
 *          "agent-list": agentData_array
 *      }
 *   ]
 * }
 * @apiVersion 1.0.0
 */

router.post("/", agent.viewAgent);

router.get("/", agent.viewAgent);

module.exports = router;
