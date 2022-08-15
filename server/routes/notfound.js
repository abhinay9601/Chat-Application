import express from "express";
import flash from "express-flash";
import util from "../utility/custom";

const router = express.Router();

router.get("/", (req, res) => {
  var ua = req.headers["user-agent"];

  if (ua) {
    if (ua.indexOf("ul") >= 0) {
      util.makeResponse(res, false, "404", "failure", "1.0.0", [
        {
          err: {
            name: "NotFound",
            msg: "This service is not available."
          }
        }
      ]);
    } else {
      res.render("404");
    }
  } else {
    util.makeResponse(res, false, 403, "failure", "1.0.0", [
      {
        msg: "Request made from unauthorised resource."
      }
    ]);
  }
});

router.post("/", (req, res) => {
  var ua = req.headers["user-agent"];

  if (ua) {
    if (ua.indexOf("ul") >= 0) {
      util.makeResponse(res, false, "404", "failure", "1.0.0", [
        {
          err: {
            name: "NotFound",
            msg: "This service is not available."
          }
        }
      ]);
    } else {
      res.render("404");
    }
  } else {
    util.makeResponse(res, false, 403, "failure", "1.0.0", [
      {
        msg: "Request made from unauthorised resource."
      }
    ]);
  }
});

module.exports = router;
