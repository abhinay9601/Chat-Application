import express from "express";
import notificationModel from "../models/notificationModel";
import env from "../env";
import util from "../utility/custom";
import apn from "apn";
import firebaseConfig from "../utility/firebaseConfig";

const router = express.Router();

const notification_options = {
  priority: "high",
  timeToLive: 60 * 60 * 24,
};

const provider = new apn.Provider({
  token: {
    key: "/opt/ssl/stringcans.p8",
    keyId: "Q73A4AWVB3",
    teamId: "C23C6F4LK9",
  },
  production: false,
});

const notification = new apn.Notification({
  alert: {
    title: `New String Cans Message`,
    body: `You have a new message from website visitor.`,
},
  pushType: "background",
});

router.post("/", (req, res) => {
  var client_id = req.body.client_id;

  if (client_id) {
    notificationModel.find({ client_id: client_id }, (err, docs) => {
      if (err) {
        util.makeResponse(res, false, 403, "failure", "1.0.0", [
          {
            msg: "err in getting device list!!!!",
          },
        ]);
      } else if (docs.length > 0) {
        util.makeResponse(res, true, 200, "Success", "1.0.0", [
          {
            msg: "notification sent",
          },
        ]);

        for (let i = 0; i < docs.length; i++) {
         
          let tkn = docs[i].token;
         
          if(!tkn) {
            continue;
          }

	 if(docs[i].device == "android" ) {
          firebaseConfig.admin.messaging().sendToDevice(
            tkn,
            {
              notification: {
                title: `New String Cans Message`,
                body: `You have a new message from website visitor.`,
              },
            },
            notification_options
          ).then(response=>{
           //console.log("Resp :: " + JSON.stringify(response));
          }).catch(err=>{
            console.log("NOTIFICATION ERR :" + err);
          });
         } else {
      		/*provider.send(notification, tkn, (resp)=>{
			console.log(resp.sent);
      			console.log(resp.failed);
               });*/ 
               firebaseConfig.admin.messaging().sendToDevice(
            tkn,
            {
              notification: {
                title: `New String Cans Message`,
                body: `You have a new message from website visitor.`,
              },
            },
            notification_options
          ).then(response=>{
           //console.log("Resp :: " + JSON.stringify(response));
          }).catch(err=>{
            console.log("NOTIFICATION ERR :" + err);
          });

         
	   } 
        }
        
      } else {
        util.makeResponse(res, true, 200, "Success", "1.0.0", [
          {
            msg: "no device available",
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
