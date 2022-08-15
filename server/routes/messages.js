var express = require('express');


const mongoose = require("mongoose");
var schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");

var unfurled = require('unfurled');

var locationlookup = require("../controller/locationlookupController");

//dynamic client and message


//var client = require("../controller/eldermonkController");
//var clientmsgs = require("../controller/eldermonkmsgController");

var controllers  = function(model) 
 {

   this.getDistinct = (req,res,next)=>{
         return new Promise((resolve, reject)=>{
         model.find().distinct('eldermonkmsgdata', function(err, data) {
            if(err)
            {
              reject(-1);
            }
            resolve(data);
         });

       });
   };
  this.getAll = (req, res, next) => {
       return new Promise((resolve, reject)=>{
        model.find().sort({'created_at':-1}).exec(function(err, data) {
           if (err) { 
              reject(-1); 
            }
             resolve(data);
        });
      });
    }; 
   this.getAllOnline = (req, res, next) => {
       return new Promise((resolve, reject)=>{
        model.find({ "actionstatus": { $ne: "offline" } }).sort({'created_at':-1}).exec(function(err, data) {
           if (err) { 
              reject(-1); 
            }
             resolve(data);
        });
      });
    };

    this.getAllOffline = (req, res, next) => {
       return new Promise((resolve, reject)=>{
        model.find({ "actionstatus": { $ne: "online" } }).sort({'created_at':-1}).exec(function(err, data) {
           if (err) { 
              reject(-1); 
            }
             resolve(data);
        });
      });
    };
    this.getAllByTopic =(req, res, next) => {
       return new Promise((resolve, reject)=>{
        model.find({'payload.topic':req}).sort({'created_at':1}).exec(function(err, data) {
           if (err) { 
              reject(-1); 
            }
             resolve(data);
        });
      });
    }
   this.getAllSavedMessage = (req, res, next) => {
       return new Promise((resolve, reject)=>{
        model.find({'stage':'saved'}).sort({'created_at':1}).exec(function(err, data) {
           if (err) { 
              reject(-1); 
            }
             resolve(data);
        });
      });
    };
   this.getOne = (req, res, next) => {
        model.findById(req, (err, data) => {
            return (data || {});
        });
    };
    this.getbyname = (req, next) => {
      return new Promise((resolve, reject)=>{
        model.findOne(req, (err, data) => {
             if (err) { 
              reject(-1); 
            }
             resolve(data);
          });
        });
    };
    this.getallbyname = (req, next) => {
      return new Promise((resolve, reject)=>{
        model.find(req, (err, data) => {
             if (err) { 
              reject(-1); 
            }
             resolve(data);
          });
        });
    }
    this.getallPaginate =(req, next) => {
      return new Promise((resolve, reject)=>{
       model.find({ title:req.title },null,{limit:req.limit,skip:req.skip}, (err, data) => {
             if (err) { 
              reject(-1); 
            }
             resolve(data);
          });
        });
    };
    this.getCount = (req, next) => {
        return new Promise((resolve, reject)=>{
           model.count(req, (err, data) => {
                if (err) {
                    reject(-1);
                };
             resolve(data);;
           });
        });
    };
    this.create =(req, next) => {
        return new Promise((resolve, reject)=>{
        model.create(req, function (err, user) {
           if (err)
             {
              reject(-1);
             }
            resolve(1);
        });
      });
    }
    this.update =(id, req, next) => {
       return new Promise((resolve, reject)=>{
        model.updateOne(id, req, { new: true }, (err, data) => {
          if (err) {
            console.log(err);
                    reject(-1);
            }
             resolve(data);
          });

        });
    }

    this.findingOneUpdate =(id, req, next) => {
       return new Promise((resolve, reject)=>{
     //   console.log(model,req);
        model.findOneAndUpdate(id, req, { new: true, upsert: true }, (err, data) => {
          if (err) {
             console.log(err);
              reject(-1);
            }
            resolve(data);
          });

        });
    }
    
   this.remove = (req, res, next) => {
        model.remove({ _id: req.params.id }, (err, ok) => {
            if (err) return console.log(err);
        });
        console.log(ok);
    }
};
 
function createTopic(topicForCollection)
{
    var Message;

    if (topicForCollection)
    {
        
        try
        {
            Message = mongoose.model(topicForCollection, messageSchema);
        }
        catch (error)
        {
            var messageSchema = new schema(
            {
                payload:
                {
                    type: Object,
                    index: true,
                },
                status:
                {
                    type: String,
                    enum: ['read', 'sent', 'delivered'],
                    default: 'sent'

                },
                type:
                {
                    type: String,
                    enum: ['typing', 'html', 'audio', 'video', 'string'],
                    default: 'typing'
                },
                stage:
                {
                    type: String,
                    enum: ['saved', 'unsaved'],
                    default: 'unsaved'
                },
                scrollHeight:
                {

                    type: String,
                    default: '0'
                },
                created_at:
                {
                    type: Date,
                    default: Date.now
                }

            },
            {
                strict: true
            });

            messageSchema.plugin(autoIncrement.plugin,
            {
                model: topicForCollection,
                field: 'id',
                startAt: 1

            });

           Message = mongoose.model(topicForCollection, messageSchema);
        }
       

    }
    return Message;
}




const router = express.Router();


router.get('/get-websiteusers', (req, res) =>
{
    var clientId = req.query.clientid;
    if(clientId)
    {

      var  model = createTopic(clientId);
      var controller = new controllers(model);
    //  console.log("controller",controller.getAll());
        controller.getAllOnline().then(function(d)
        {
        
         res.status(200).json(
         {
                msg: "Successfull",
                res: d
          });
        })
        .catch(function(e)
        {
            console.log(e)
        });
    }
    else
    {
        console.log(req.query);
    }    
    

});

router.get('/get-offlinewebsiteusers', (req, res) =>
{
    var clientId = req.query.clientid;
    if(clientId)
    {

      var  model = createTopic(clientId);
      var controller = new controllers(model);
    //  console.log("controller",controller.getAll());
        controller.getAllOffline().then(function(d)
        {
        
         res.status(200).json(
         {
                msg: "Successfull",
                res: d
          });
        })
        .catch(function(e)
        {
            console.log(e)
        });
    }
    else
    {
        console.log(req.query);
    }    
    

});


router.post('/unfurl', (req, res) =>
{
    var url = req.body.url;
    unfurled(url)
        .then(function(d)
        {
            res.status(200).json(
            {
                msg: d

            });
        })
        .catch(function(e)
        {
            res.status(200).json(
            {
                msg: ""
            });
        })
});


router.post('/get-subscribe', (req, res) =>
{

    var topic = req.body.topic;
    var userip = req.body.userip;
    var clienttoken = req.body.clienttoken;
    console.log("req.body",req.body);

    if (topic)
    {
        var  model = createTopic(clienttoken);
        var controller = new controllers(model);

        controller.getAllByTopic(topic)
            .then(function(d)
            {
                res.status(200).json(
                {
                    msg: d,
                    topic: topic

                });
            })
            .catch(function(err) {
              console.log(err);

            })
    }
    else
    {
        res.status(200).json(
        {
            msg: "failed",

        });
    }

});

router.post('/set-savemessage', (req, res) =>
{
    var msgid = req.body.id;
    var position = req.body.position;
    var clienttoken = req.body.clienttoken;
    console.log(req.body);

    if (msgid)
    {
        var filter = {
            'id': msgid
        };
        var update = {
            'stage': 'saved',
            'scrollHeight': position
        };
        var  model = createTopic(clienttoken);
        var controller = new controllers(model);


        controller.findingOneUpdate(filter, update).then(function()
        {
            res.status(200).json(
            {
                msg: "success",

            });
        }).
        catch(function(err)
        {
            console.log(err);

            res.status(200).json(
            {
                msg: "failed",

            });
        });
    }
    else
    {
        res.status(200).json(
        {
            msg: "failed",

        });
    }

});


router.get('/get-savedmessage', (req, res) =>
{
    var clientId = req.query.clientid;
    var  model = createTopic(clientId);
    var controller = new controllers(model);

    controller.getAllSavedMessage()
        .then(function(d)
        {
            res.status(200).json(
            {
                msg: d,
            });
        })
        .catch(function()
        {
            res.status(200).json(
            {
                msg: "failed",

            });
        })


});

router.post('/update-color', (req, res) =>
{
    var topic = req.body.topic;
    var clienttoken = req.body.clienttoken;

    console.log(req.body);

    if (topic)
    {
        var filter = {
            'payload.timer': topic
        };
        var update = {
            'payload.userliststate': "red"
        };
        var  model = createTopic(clienttoken);
        var controller = new controllers(model);


        controller.findingOneUpdate(filter, update).then(function()
        {
            res.status(200).json(
            {
                msg: "success",

            });
        }).
        catch(function(err)
        {
            console.log(err);

            res.status(200).json(
            {
                msg: "failed",

            });
        });
    }
    else
    {
        res.status(200).json(
        {
            msg: "failed",

        });
    }

})



module.exports = router;
