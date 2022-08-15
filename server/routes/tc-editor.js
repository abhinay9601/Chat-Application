import express from "express";
import users from "../controller/usersController";
import jwt from "../utility/jwt";
import fs from "fs";
import util from "../utility/custom";
import env from "../env";

const router = express.Router();

router.post("/", async (req, res) => {
  jwt
    .verify(req.cookies.token, env.JWT_EXPIRY)
    .then(decrypted => {
      var data = new users.getOne({
        useremail: decrypted.email
      });

      data.then(async function(d) {
        if (d) {
          if (d.passwordChangeNeeded) {
            res.redirect("/change-password");
          } else {
            if (
              d.userlevel.toString() == "admin" ||
              d.userlevel.toString() == "superAdmin"
            ) {
              if (req.body.content) {
                console.log("DIR :" + req.body.content);
                fs.writeFile(
                  __dirname + "/../../views/tc.ejs",
                  req.body.content,
                  err => {
                    if (err) {
                      util.makeResponse(res, false, 401, "failure", "1.0.0", [
                        {
                          msg: "Error in writing tc file."
                        }
                      ]);
                    } else {
                      util.makeResponse(res, true, 200, "Success", "1.0.0", [
                        {
                          msg: "Term and Condition updated"
                        }
                      ]);
                    }
                  }
                );
              } else {
                util.makeResponse(res, false, 401, "failure", "1.0.0", [
                  {
                    msg: "Error in updating term and condition."
                  }
                ]);
              }
            }
          }
        }
      });
    })
    .catch(err => {
      res.clearCookie("token");
      res.clearCookie("client_id");
      res.redirect("/signin");
    });
});

router.get("/", async (req, res) => {
  var ua = req.headers["user-agent"];

  if (ua) {
    if (req.cookies.token) {
      var clientList;
      if (req.cookies.client_id) {
        try {
          clientList = await new users.getAll({ userlevel: "client" });
        } catch (error) {
          console.log(
            "Error in fetching client list for admin or super admin."
          );
          clientList = [];
        }
      }

      jwt
        .verify(req.cookies.token, env.JWT_EXPIRY)
        .then(decrypted => {
          var data = new users.getOne({
            useremail: decrypted.email
          });

          data
            .then(async function(d) {
              if (d) {
                if (
                  d.userlevel.toString() == "admin" ||
                  d.userlevel.toString() == "superAdmin"
                ) {
                  res.render("tc-editor", {
                    info: {
                      username: d.username.toString(),
                      email: d.useremail.toString(),
                      userlevel: d.userlevel.toString()
                    },
                    messages: {},
                    clientInfo: clientList
                  });
                } else {
                  res.clearCookie("token");
                  res.clearCookie("client_id");
                  res.redirect("/signin");
                }
              } else {
                res.clearCookie("token");
                res.clearCookie("client_id");
                res.redirect("/signin");
              }
            })
            .catch(err => {
              res.clearCookie("token");
              res.clearCookie("client_id");
              res.redirect("/signin");
            });
        })
        .catch(err => {
          res.clearCookie("token");
          res.clearCookie("client_id");
          res.redirect("/signin");
        });
    } else {
      res.redirect("/signin");
    }
  } else {
    res.sendStatus(403).json({ error: "Request from unknown source..." });
  }
});

module.exports = router;
