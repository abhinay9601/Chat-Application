import express from "express";
import tk from "../controller/tokenController";
import util from "../utility/custom";

const router = express.Router();

/***************************************************************************************************************************************************************/
/************************************************************************ /verify-account ************************************************************************/
/**
 * @api {post} /verify-acccount Verify Account
 * @apiDescription : API to verify the signup by upper level
 * @apiGroup : Users
 * @apiName : verify-account
 * ***************************************************************************************************************************************************************
 * @apiParam {String} email       email
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
 *          "msg": "account activated"
 *       }
 *   ]
 * }
 * @apiVersion 1.0.0
 */

router.post("/", (req, res) => {
  var email = req.body.email;
  console.log("EMAIL: " + email);
  
  tk.delete({ email: email })
    .then(resp => {
      util.makeResponse(res, true, 200, "Success", "1.0.0", [
        {
          msg: "account activated"
        }
      ]);
    })
    .catch(err => {
      util.makeResponse(res, false, 401, "failure", "1.0.0", [
        {
          msg: "Error in validating details for activation."
        }
      ]);
    });
});

module.exports = router;
