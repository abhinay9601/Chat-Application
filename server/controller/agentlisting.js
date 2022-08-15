var express = require('express');

var agentlisting = require("../controller/agentlistingController");

const router = express.Router();

router.post('/get-allagents',(req,res) => {
	var data = {};
	var clientid = req.body.clienttoken;
	data['client_id'] = clientid;
	data['userlevel'] ='agent'; 
	console.log("req.body",req.body);
	agentlisting.getAll(function(d){console.log(d)});
	/*agentlisting.getAllById(data)
	.then(function(d){
		res.status(200).json(
			{
				   msg: "Successfull",
				   res: d
			 });

	})
	.catch(function(e){

	})*/
	
});


module.exports = router;
