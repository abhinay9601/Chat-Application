var eldermonkModel = require('../models/eldermonkModel');

const eldermonkController = {

   getDistinct:(req,res,next)=>{
         return new Promise((resolve, reject)=>{
         eldermonkModel.find().distinct('eldermonkdata', function(err, data) {
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
        eldermonkModel.find({}).sort({'created_at':1}).exec(function(err, data) {
           if (err) { 
              reject(-1); 
            }
             resolve(data);
        });
      });
    },
    getOne: (req, res, next) => {
        eldermonkModel.findById(req, (err, data) => {
            return (data || {});
        });
    },
    getbyname: (req, next) => {
      return new Promise((resolve, reject)=>{
        eldermonkModel.findOne(req, (err, data) => {
             if (err) { 
              reject(-1); 
            }
             resolve(data);
          });
        });
    },
     getallbyname: (req, next) => {
      return new Promise((resolve, reject)=>{
        eldermonkModel.find(req, (err, data) => {
             if (err) { 
              reject(-1); 
            }
             resolve(data);
          });
        });
    },
    getallPaginate: (req, next) => {
      return new Promise((resolve, reject)=>{
       eldermonkModel.find({ title:req.title },null,{limit:req.limit,skip:req.skip}, (err, data) => {
             if (err) { 
              reject(-1); 
            }
             resolve(data);
          });
        });
    },
    getCount: (req, next) => {
        return new Promise((resolve, reject)=>{
           eldermonkModel.count(req, (err, data) => {
                if (err) {
                    reject(-1);
                };
             resolve(data);;
           });
        });
    },
    create: (req, next) => {
        return new Promise((resolve, reject)=>{
        eldermonkModel.create(req, function (err, user) {
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
        eldermonkModel.updateOne(id, req, { new: true }, (err, data) => {
          if (err) {
            console.log(err);
                    reject(-1);
            }
             resolve(data);
          });

        });
    },

    delete: (req, res, next) => {
        eldermonkModel.remove({ _id: req.params.id }, (err, ok) => {
            if (err) return console.log(err);
        });
        console.log(ok);
    }
};


module.exports =  eldermonkController;