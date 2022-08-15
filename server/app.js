import path from "path";
import express from "express";
import env from "./env";
import bodyParser from "body-parser";
import expressValidator from "express-validator";
import util from "./utility/custom";
import db from "./database/db";
import cluster from "cluster";
import http from "http";
import https from "https";
import ejs from "ejs";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import favicon from "serve-favicon";
import fs from "fs";
import websocket from "ws";
//import forward from "http-port-forward";
//routers
import chatbox from "./routes/chatBox";
import agentlisting from "./routes/agentlisting";
import messages from './routes/messages';
import locationLookUp from './routes/locationLookUp';

import index from "./routes/index";
import signup from "./routes/signup";
import signin from "./routes/signin";
import changePassword from "./routes/changePassword";
import dashboard from "./routes/dashboard";
import refreshtoken from "./routes/refreshtoken";
import signout from "./routes/signout";
import reset from "./routes/reset";
import resetMail from "./routes/reset-mail";
import addAdmin from "./routes/addAdmin";
import viewAdmin from "./routes/viewAdmin";
import addClient from "./routes/addClient";
import viewClient from "./routes/viewClient";
import addAgent from "./routes/addAgent";
import viewAgent from "./routes/viewAgent";
import addManager from "./routes/addManager";
import viewManager from "./routes/viewManager";
import verifyAccount from "./routes/verifyAccount";
import tcEditor from "./routes/tc-editor";
import viewTC from "./routes/viewTC";
import tc from "./routes/tc";
import getInfo from "./routes/getInfo";
import updateInfo from "./routes/updateInfo";
import changeStatus from "./routes/changeStatus";
import notfound from "./routes/notfound.js";
import departments from "./routes/departments";
import updateDept from "./routes/updateDept";
import agentDept from "./routes/AgentDept";
import notes from "./routes/notes";
import myprofile from "./routes/myProfile";
import editProfile from "./routes/editProfile";
import chatbot from "./routes/chatbot";
import checkMobileSession from "./routes/checkMobileSession";
import triggerPushNotification from "./routes/triggerPushNotification";
import getVideoChannelDetails from "./routes/getVideoChannelDetails";
import submitChatbotQuestionnaire from "./routes/submitChatbotQuestionnaire";
import sendEmail from "./routes/sendEmail";
import setup from "./routes/setup";
import pipeline from "./routes/pipeline";
import editAgent from "./routes/editAgent";
import exportChat from './routes/export-chats';
const app = express();
//force https
function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}


app.use(requireHTTPS);

app.use(expressValidator());



//View Engine Setup
app.engine("html", ejs.renderFile);
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");


app.use(logger("dev"));
app.use(cookieParser());
app.use(cors());

app.use(favicon(path.join(__dirname, "..", "public", "images", "favicon.ico")));
app.use('/', express.static(path.join(__dirname, "..", 'public'), {
    dotfiles: 'allow'
}));
app.use("/static", express.static(path.join(__dirname, "..", "public")));
app.use("/api-doc", express.static(path.join(__dirname, "..", "apiDoc")));

app.use(
    bodyParser.json({
        limit: "50mb",
        type: "application/json",
    })
);

//enabling json request
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "50mb",
    })
);

// ---------------------------------------------------------
// List of routers comes below:
// ---------------------------------------------------------
// ---------------------------------------------------------
app.use("/chatbox", chatbox);
app.use("/agentlisting", agentlisting);
app.use("/messages", messages);
app.use("/locationLookUp", locationLookUp);

app.use("/", index);
app.use("/signup", signup);
app.use("/signin", signin);
app.use("/change-password", changePassword);
app.use("/dashboard", dashboard);
app.use("/refreshtoken", refreshtoken);
app.use("/signout", signout);
app.use("/resetmail", resetMail);
app.use("/reset", reset);
app.use("/add-admin", addAdmin);
app.use("/view-admin", viewAdmin);
app.use("/add-client", addClient);
app.use("/view-client", viewClient);
app.use("/add-agent", addAgent);
app.use("/view-agent", viewAgent);
app.use("/add-manager", addManager);
app.use("/view-manager", viewManager);
app.use("/verify-account", verifyAccount);
app.use("/tc-editor", tcEditor);
app.use("/view-tc", viewTC);
app.use("/terms-and-conditions", tc);
app.use("/get-info", getInfo);
app.use("/update-info", updateInfo);
app.use("/change-user-status", changeStatus);
app.use("/departments", departments);
app.use("/agent-dept", agentDept);
app.use("/update-dept", updateDept);
app.use("/user-notes", notes);
app.use("/profile", myprofile);
app.use("/edit-profile", editProfile);
app.use("/chatbot", chatbot);
app.use("/check-mobilesession", checkMobileSession);
app.use("/triggerPushNotification", triggerPushNotification);
app.use("/getVideoChannelDetails", getVideoChannelDetails);
app.use("/submitChatbotQuestionnaire", submitChatbotQuestionnaire);
app.use("/sendEmail", sendEmail);
app.use("/setup", setup);
app.use("/pipeline", pipeline);
app.use('/edit-agent', editAgent);
app.use('/export-chat', exportChat);
app.use("*", notfound); //always put this last in router list to handle 404(NOT FOUND) case

//const privateKey = fs.readFileSync('/opt/ultimateleadswell/crts/key.pem','utf8').toString();
//const certificate = fs.readFileSync('/opt/ultimateleadswell/crts/f94ef0b08a832a87.crt','utf8').toString();
//const ca = fs.readFileSync('/opt/ultimateleadswell/crts/gd_bundle-g2-g1.crt', 'utf8').toString();

const privateKey = fs.readFileSync('/opt/ssl/privKey.pem', 'utf8');
const certificate = fs.readFileSync('/opt/ssl/cert.pem', 'utf8');
const ca = fs.readFileSync('/opt/ssl/fullchain.pem', 'utf8');


// httpsOptions = {
//        key: read('ssl/mycertificate.key', 'utf8'),
//        cert: read('ssl/mycertificate.crt', 'utf8'),
//        ca: [
//            read('ssl/rapidssl_1.pem', 'utf8'),
//            read('ssl/rapidssl_2.pem', 'utf8')
//        ]
//   };

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};


// Starting both http & https servers
const httpServer = http.createServer(app);
httpServer.setTimeout(300000);
const httpsServer = https.createServer(credentials, app);
httpsServer.setTimeout(300000);
//const httpswsServer = https.createServer(credentials,app); 

if (cluster.isMaster) {
    var numWorkers = require("os").cpus().length;

    console.log("Master cluster setting up " + numWorkers + " workers...");

    for (var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on("online", function(worker) {
        console.log("Worker " + worker.process.pid + " is online");
    });

    cluster.on("exit", function(worker, code, signal) {
        console.log(
            "Worker " +
            worker.process.pid +
            " died with code: " +
            code +
            ", and signal: " +
            signal
        );
        console.log("Starting a new worker");
        cluster.fork();
    });
} else {
    // var httpServer = http.createServer(app);
    // var httpsServer = https.createServer(credentials, app);

    // httpServer.listen(env.APPLICATION_PORT);
    //httpsServer.listen(env.APPLICATION_HTTPS_PORT);
    /*
    const wss = new websocket.Server({
        'server': httpswsServer
    })


    httpswsServer.listen(1989,()=>{
    console.log('wss server on port 1989');
    });
    */

    httpServer.listen(80, () => {
        console.log('HTTP Server running on port 80');
    });

    httpsServer.listen(443, () => {
        console.log('HTTPS Server running on port 443');
    });
    //forward(1989, 8188);
}
