import users from "./usersController";
import jwt from "../utility/jwt";
import env from "../env";

const clientController = {
  getSuperAdminDetailsUsingToken: async token => {
    return new Promise((resolve, reject) => {
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
                  if (d.userlevel.toString() == "superAdmin") {
                    resolve({
                      username: d.username.toString(),
                      email: d.useremail.toString(),
                      userlevel: d.userlevel.toString()
                    });
                  } else {
                    reject(-1);
                  }
                } else {
                  reject(-1);
                }
              })
              .catch(err => {
                console.log("Eririr : " + err);
                reject(-1);
              });
          })
          .catch(err => {
            console.log("JWT : " + err);
            reject(-1);
          });
      } else {
        reject(-1);
      }
    });
  }
};

export default clientController;
