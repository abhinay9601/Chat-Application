import express from "express";
import chatbotQuestionnaireModel from "../models/chatbotQuestionnaireModel";
import util from "../utility/custom";

const router = express.Router();

router.post("/", (req, res) => {
  var random_client = req.body.random_client;

    if (random_client) {
        chatbotQuestionnaireModel.findOneAndUpdate(
            { random_client: random_client },
            { 
                $push: { questionnaire: { key: req.body.key, value: req.body.value },
                client_id: req.body.client_id, 
            } 
            },
            {
                new: true,
                upsert: true,
            },
            (err, docs) => {
                if (err) {
                    util.makeResponse(res, false, 403, "failure", "1.0.0", [
                        {
                            msg: "err in updating questionnaire!!!!",
                        },
                    ]);
                } else {
                    util.makeResponse(res, true, 200, "Success", "1.0.0", [
                        {
                            msg: "questionnaire updated successfully",
                        },
                    ]);
                }
            }
        );
    } else {
        util.makeResponse(res, false, 403, "failure", "1.0.0", [
            {
                msg: "No random_client provided!!!!",
            },
        ]);
    }
});

module.exports = router;
