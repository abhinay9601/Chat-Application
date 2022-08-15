import express from "express";
import channelsModel from "../models/channelsModel";
import env from "../env";
import util from "../utility/custom";

const router = express.Router();

router.post("/", (req, res) => {
  var client_id = req.body.client_id;

  if (client_id) {
    channelsModel.find({ client_id: client_id }, (err, docs) => {
      if (err) {
        util.makeResponse(res, false, 403, "failure", "1.0.0", [
          {
            msg: "err in getting agora tokens!!!!",
          },
        ]);
      } else if (docs.length > 0) {
        util.makeResponse(res, true, 200, "Success", "1.0.0", [
          {
            msg: "agora token retrieved successfully.",
            token: docs[0].token,
          },
        ]);
      }
    });
  } else {
    util.makeResponse(res, false, 403, "failure", "1.0.0", [
      {
        msg: "No client_id provided!!!!",
      },
    ]);
  }
});

module.exports = router;
