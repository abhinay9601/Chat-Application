var locationlookupModel = require('../models/locationlookupModel');

const locationlookupController = {


   getNetworkSearch :(req, res, next) => {
     return new Promise((resolve, reject)=>{
      
        locationlookupModel.find({"network":{ $regex: "^"+req+".*" } } ,null, {limit: 1},
          (err, data) => {
           if (err) { 
              reject(-1); 
            }
             resolve(data);
        });
      });
    },
    getAll: (req, res, next) => {
        locationlookupModel.find({}, (err, data) => {
            if (err) { console.log(err) };
            console.log(data);
        });
    },
    getOne: (req, res, next) => {
        locationlookupModel.findById(req, (err, data) => {
            return (data || {});
        });
    },
    getbyname: (req, next) => {
      return new Promise((resolve, reject)=>{
        locationlookupModel.findOne(req, (err, data) => {
             if (err) { 
              reject(-1); 
            }
             resolve(data);
          });
        });
    },
     getallbyname: (req, next) => {
      return new Promise((resolve, reject)=>{
        locationlookupModel.find(req, (err, data) => {
             if (err) { 
              reject(-1); 
            }
             resolve(data);
          });
        });
    },
    getallPaginate: (req, next) => {
      return new Promise((resolve, reject)=>{
       locationlookupModel.find({ title:req.title },null,{limit:req.limit,skip:req.skip}, (err, data) => {
             if (err) { 
              reject(-1); 
            }
             resolve(data);
          });
        });
    },
    getCount: (req, next) => {
        return new Promise((resolve, reject)=>{
           locationlookupModel.count(req, (err, data) => {
                if (err) {
                    reject(-1);
                };
             resolve(data);;
           });
        });
    },
    create: (req, next) => {
        return new Promise((resolve, reject)=>{
        locationlookupModel.create(req, function (err, user) {
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
        locationlookupModel.updateOne(id, req, { new: true }, (err, data) => {
          if (err) {
            console.log(err);
                    reject(-1);
            }
             resolve(data);
          });

        });
    },

    delete: (req, res, next) => {
        locationlookupModel.remove({ _id: req.params.id }, (err, ok) => {
            if (err) return console.log(err);
        });
        console.log(ok);
    }
};


module.exports =  locationlookupController;