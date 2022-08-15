import express from "express";
import chatbotTemplate from "../controller/chatbotTemplateController";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /chatbot ************************************************************************/
/**
 * @api {post} /chatbot chatbot
 * @apiDescription : This is the api to dynamically configure the chatbot UI Path or get the existing chatbot UI Path.
 * @apiGroup : Users
 * @apiName : chatbot
 * ***************************************************************************************************************************************************************
 * @apiParam {String} welcome          welcome-msg
 * @apiParam {String} options          options
 * @apiParam {String} inputs           inputs
 * @apiParam {String} token            token
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
 *          "msg": "Existing Chatbot UI path retrieved",
 *          "welcome": #welcome-msg
 *          "options": #options-array
 *          "inputs":  #input-list
 *      }
 *   ]
 * }
 * @apiVersion 1.0.0
 */

router.post("/", chatbotTemplate.updateChatbotTemplate);
router.post("/", chatbotTemplate.viewChatbotTemplate);
router.get("/", chatbotTemplate.viewChatbotTemplate);

module.exports = router;
