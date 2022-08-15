import express from "express";
import mobilesessionModel from "../models/mobilesessionModal";
import env from "../env";
import util from "../utility/custom";
import jwt from "../utility/jwt";

const router = express.Router();

router.post("/", (req, res) => {
  var token = req.body.token;

  if (token) {
    mobilesessionModel.count({ token: token }, (err, count) => {
      if (count > 0) {
        jwt
          .verify(token, env.JWT_EXPIRY)
          .then((decrypted) => {
            if (decrypted.email) {
              util.makeResponse(res, true, 200, "Success", "1.0.0", [
                {
                  msg: "already logged in",
                  link: env.PORTAL_URL + "/" + "?token=" + token,
                },
              ]);
            } else {
              util.makeResponse(res, false, 403, "failure", "1.0.0", [
                {
                  msg: "Token validation failed... Login again",
                },
              ]);
            }
          })
          .catch((err) => {
            util.makeResponse(res, false, 403, "failure", "1.0.0", [
              {
                msg: "Error in validating token... Login again",
                err: err
              },
            ]);
          });
      } else {
        util.makeResponse(res, false, 403, "failure", "1.0.0", [
          {
            msg: "ALready logged out",
          },
        ]);
      }
    });
  } else {
    util.makeResponse(res, false, 403, "failure", "1.0.0", [
      {
        msg: "No token provided!!!!",
      },
    ]);
  }
});

module.exports = router;

