import usersModel from "../models/usersModel";
import tokenMOdel from "../models/tokenModel";

const usersController = {
  viewList: async (userlevel, clientId) => {
    try {
      var condition;

      if (clientId) {
        condition = {
          userlevel: { $in: [userlevel] },
          client_id: { $in: [clientId] }
        };
      } else {
        condition = {
          userlevel: { $in: [userlevel] }
        };
      }
      return await usersModel.aggregate([
        { $match: condition },
        {
          $lookup: {
            from: "tokens",
            let: { email: "$useremail" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$email", "$$email"] },
                      { $eq: ["$purpose", "need-verification"] }
                    ]
                  }
                },
                
              }
            ],
            as: "verification"
          }
        },
        {
          $project: {
            "_id": 0,
            "userpassword": 0,
            "id": 0,
            "passwordChangeNeeded": 0,
            "time": 0,
            "__v": 0,
            "verification": {
              "_id": 0,
              "email": 0,
              "uuid": 0,
              "time": 0,
              "__v": 0
            } 
          }
        }
      ]);
    } catch (error) {
      console.log("Pipeline error : " + error);

      return -1;
    }
  },
  getAll: (req, res, next) => {
    return new Promise((resolve, reject) => {
      usersModel.find(req, (err, data) => {
        if (err) {
          reject(-1);
        } else {
          resolve(data);
        }
      });
    });
  },

  getOne: (req, res, next) => {
    return new Promise((resolve, reject) => {
      usersModel.findOne(req, (err, data) => {
        if (err) {
          console.log("Err: " + err);
          reject(-1);
        } else {
          resolve(data);
        }
      });
    });
  },

  getbyname: (req, next) => {
    usersModel.findOne(req, (err, data) => {
      if (err) {
        next(err);
      }
      next(data);
    });
  },

  getCount: (req, next) => {
    return new Promise((resolve, reject) => {
      usersModel.count(req, (err, data) => {
        if (err) {
          reject(-1);
        }
        resolve(data);
      });
    });
  },

  create: (req, next) => {
    return new Promise((resolve, reject) => {
      usersModel.create(req, function(err, user) {
        if (err) {
          reject(-1);
        }
        resolve(1);
      });
    });
  },

  update: (id, req, next) => {
    usersModel.updateOne(id, req, { new: true }, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
    });
  },

  findOneAndUpdate: (req, newData, next) => {
    return new Promise((resolve, reject) => {
      usersModel.findOneAndUpdate(
        req,
        newData,
        { upsert: false },
        (err, doc) => {
          if (err) {
            reject(-1);
          }

          resolve(doc);
        }
      );
    });
  },

  delete: (req, res, next) => {
    usersModel.remove({ _id: req.params.id }, (err, ok) => {
      if (err) return console.log(err);
    });
    console.log(ok);
  }
};

export default usersController;
