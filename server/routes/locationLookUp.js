var express = require('express');

var locationlookup = require("../controller/locationlookupController");

var eldermonk = require("../controller/eldermonkController");
var eldermonkmsg = require("../controller/eldermonkmsgController");


const router = express.Router();





router.get('/',(req,res)=>{

  console.log(req.headers);


   var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
   if (ip.substr(0, 7) == "::ffff:") {
      ip = ip.substr(7)
   }
   var ipFirstDigit = ip.split(".");
   
   console.log(ipFirstDigit[0]);

  locationlookup.getNetworkSearch(ipFirstDigit[0]).
  then(function(d)
  {
    var data = 
    {
        "country_name":d[0].country_name,
        "country_iso_code":d[0].country_iso_code,
        "continent_name":d[0].continent_name ,
        "geobytesfqcn":d[0].country_name +","+d[0].continent_name ,
        "ip":ip,
        "url": req.hostname

    };
    res.status(200).json(
    {
     
        msg: data

    });
  }).
  catch(function(e)
  {
     res.status(200).json(
    {
        msg: ""

    });
  });

});

module.exports = router;