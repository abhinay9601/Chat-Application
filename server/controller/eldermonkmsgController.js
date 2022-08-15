var eldermonkmsgModel = require('../models/eldermonkmsgModel');

const eldermonkmsgController = {

   getDistinct:(req,res,next)=>{
         return new Promise((resolve, reject)=>{
         eldermonkmsgModel.find().distinct('eldermonkmsgdata', function(err, data) {
            if(err)
            {
              reject(-1);
            }
            resolve(data);
         });

       });
   },
    getAll: (req, res, next) => {
       return new Promise((resolve, reject)=>{
        eldermonkmsgModel.find({}).sort({'created_at':1}).exec(function(err, data) {
           if (err) { 
              reject(-1); 
            }
             resolve(data);
        });
      });
    },
    getAllByTopic: (req, res, next) => {
       return new Promise((resolve, reject)=>{
        eldermonkmsgModel.find({'payload.topic':req}).sort({'created_at':1}).exec(function(err, data) {
           if (err) { 
              reject(-1); 
            }
             resolve(data);
        });
      });
    },
    getAllSavedMessage: (req, res, next) => {
       return new Promise((resolve, reject)=>{
        eldermonkmsgModel.find({'stage':'saved'}).sort({'created_at':1}).exec(function(err, data) {
           if (err) { 
              reject(-1); 
            }
             resolve(data);
        });
      });
    },
    getOne: (req, res, next) => {
        eldermonkmsgModel.findById(req, (err, data) => {
            return (data || {});
        });
    },
    getbyname: (req, next) => {
      return new Promise((resolve, reject)=>{
        eldermonkmsgModel.findOne(req, (err, data) => {
             if (err) { 
              reject(-1); 
            }
             resolve(data);
          });
        });
    },
     getallbyname: (req, next) => {
      return new Promise((resolve, reject)=>{
        eldermonkmsgModel.find(req, (err, data) => {
             if (err) { 
              reject(-1); 
            }
             resolve(data);
          });
        });
    },
    getallPaginate: (req, next) => {
      return new Promise((resolve, reject)=>{
       eldermonkmsgModel.find({ title:req.title },null,{limit:req.limit,skip:req.skip}, (err, data) => {
             if (err) { 
              reject(-1); 
            }
             resolve(data);
          });
        });
    },
    getCount: (req, next) => {
        return new Promise((resolve, reject)=>{
           eldermonkmsgModel.count(req, (err, data) => {
                if (err) {
                    reject(-1);
                };
             resolve(data);;
           });
        });
    },
    create: (req, next) => {
        return new Promise((resolve, reject)=>{
        eldermonkmsgModel.create(req, function (err, user) {
           if (err)
             {
              reject(-1);
             }
            resolve(1);
        });
      });
    },
    update: (id, req, next) => {
       return new Promise((resolve, reject)=>{
        eldermonkmsgModel.updateOne(id, req, { new: true }, (err, data) => {
          if (err) {
            console.log(err);
                    reject(-1);
            }
             resolve(data);
          });

        });
    },

    findingOneUpdate: (id, req, next) => {
       return new Promise((resolve, reject)=>{
        eldermonkmsgModel.findOneAndUpdate(id, req, { new: true, upsert: true // Make this update into an upsert
          }, (err, data) => {
          if (err) {
             console.log(err);
              reject(-1);
            }
             resolve(data);
          });

        });
    },
    
    delete: (req, res, next) => {
        eldermonkmsgModel.remove({ _id: req.params.id }, (err, ok) => {
            if (err) return console.log(err);
        });
        console.log(ok);
    }
};


module.exports =  eldermonkmsgController;