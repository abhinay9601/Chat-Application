import env from "../env";
import jwt from "jsonwebtoken";

const authToken = {
  /*==================== JWT Signing =====================*/
  sign: async (data, expiry) => {
    var signOptions = {
      issuer: "UL",
      subject: "UL-Subject",
      audience: "UL-Client",
      expiresIn: expiry + "ms"
    };

    return jwt.sign(data, env.APP_KEY, signOptions);
  },

  /*==================== JWT Verifying =====================*/
  verify: async (token, expiry) => {
    var verifyOptions = {
      issuer: "UL",
      subject: "UL-Subject",
      audience: "UL-Client",
      expiresIn: expiry + "ms"
    };

    /*try {
      return await jwt.verify(token, env.APP_KEY, verifyOptions);
    } catch (error) {
      return false;
    }*/

    return new Promise((resolve, reject) => {
      jwt.verify(token, env.APP_KEY, verifyOptions, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  },
  decode: async token => {
    return await jwt.decode(token);
  }
};

export default authToken;
