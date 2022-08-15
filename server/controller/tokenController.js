import tokenModel from "../models/tokenModel";
import jwt from "../utility/jwt";
import util from "../utility/custom";
import env from "../env";

const tokenController = {
  create: (req, next) => {
    return new Promise((resolve, reject) => {
      tokenModel.create(req, function(err, token) {
        if (err) {
          reject(-1);
        }
        resolve(1);
      });
    });
  },
  regenerateToken: async (req, res) => {
    var ua = req.headers["user-agent"];

    if (ua) {
      var token = req.body.token;
      req.checkBody("token", "Token Is Required").notEmpty();
      req
        .asyncValidationErrors()
        .then(() => {
          jwt
            .verify(token, env.JWT_EXPIRY)
            .then(async decrypted => {
              if (ua.indexOf("ul") >= 0) {
                util.makeResponse(res, false, 406, "failure", "1.0.0", [
                  {
                    msg: "No need to refresh. Already vaild token."
                  }
                ]);
              } else {
              }
            })
            .catch(async err => {
              if (err.name == "TokenExpiredError") {
                var decrypted = jwt.decode(token);

                var token = await jwt.sign(
                  { email: decrypted.email },
                  env.JWT_EXPIRY
                );

                if (ua.indexOf("ul") >= 0) {
                  util.makeResponse(res, true, 200, "Success", "1.0.0", [
                    {
                      token: token,
                      msg: "New token generated."
                    }
                  ]);
                } else {
                }
              } else {
                if (ua.indexOf("ul") >= 0) {
                  util.makeResponse(res, false, 403, "failure", "1.0.0", [
                    {
                      msg: "Previous token tampered."
                    }
                  ]);
                } else {
                }
              }
            });
        })
        .catch(err => {
          if (ua.indexOf("ul") >= 0) {
            util.makeResponse(res, false, 422, "failure", "1.0.0", [
              {
                msg: err
              }
            ]);
          } else {
            util.makeResponse(res, false, 422, "failure", "1.0.0", [
              {
                msg: err
              }
            ]);
          }
        });
    } else {
      util.makeResponse(res, false, 403, "failure", "1.0.0", [
        {
          msg: "Request made from unauthorised resource."
        }
      ]);
    }
  },

  count: (req, next) => {
    return new Promise((resolve, reject) => {
      tokenModel.count(req, (err, data) => {
        console.log("Err: " + err);

        if (err) {
          reject(-1);
        }

        resolve(data);
      });
    });
  },
  getOne: (req, next) => {
    return new Promise((resolve, reject) => {
      tokenModel.findOne(req, (err, data) => {
        if (err) {
          reject(-1);
        } else {
          resolve(data);
        }
      });
    });
  },
  delete: (req, res, next) => {
    return new Promise((resolve, reject) => {
      tokenModel.remove(req, (err, ok) => {
        if (err) {
          reject(-1);
        } else {
          resolve(1);
        }
      });
    });
  }
};

export default tokenController;
