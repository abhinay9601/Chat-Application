import users from "./usersController";
import jwt from "../utility/jwt";
import env from "../env";

const dashboardController = {
  dashboard: async (req, res) => {
    var ua = req.headers["user-agent"];
    var token = req.cookies.token ?  req.cookies.token: req.query.token;

    if (ua) {
      if (token) {
        jwt
          .verify(token, env.JWT_EXPIRY)
          .then(decrypted => {
            var data = new users.getOne({
              useremail: decrypted.email
            });

            data
              .then(async function(d) {
                if (d) {
                  if (d.passwordChangeNeeded) {
                    res.redirect("/change-password");
                  } else {
                    if (
                      d.userlevel.toString() == "admin" ||
                      d.userlevel.toString() == "superAdmin"
                    ) {
                      var clientList = new users.getAll({
                        userlevel: "client"
                      });

                      clientList
                        .then(cl => {

                          res.render("dashboard", {
                            info: {
                              username: d.username,
                              email: d.useremail,
                              userlevel: d.userlevel.toString()
                            },
                            clientInfo: cl
                          });
                        })
                        .catch(err => {
                          console.log("There is something wrong with flow.");

                          res.clearCookie("token");
                          res.clearCookie("client_id");
                          res.redirect("/signin");
                        });
                    } else {
                       if(req.query.token) {
                       	 res.cookie("token", token, {
                        	  maxAge: 24 * 60 * 60 * 1000,
                       	 });
                         res.redirect("/");
                       } else {
                        res.render("dashboard", {
                          info: {
                            username: d.username,
                            email: d.useremail,
                            userlevel: d.userlevel.toString(),
                            company: d.company.toString(),
                            logo: d.logo.toString(),
                            client_id:d.client_id.toString(),
                            id:d.id.toString()
                          }
                        });
                      }
                    }
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
  }
};

export default dashboardController;
