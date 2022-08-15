var custom = {};
custom.makeResponse = function (res, successStatus, status, message, appVersion, result) {
    // response
    res.set('Access-Control-Allow-Origin', '*');
    res.statusCode = status;
    res.statusMessage = message;
    res.status(status).send({
        "Success": successStatus,
        "Status": status,
        "Message": message,
        "AppVersion": appVersion,
        "Result": result
    });
 }
 
export  default custom;