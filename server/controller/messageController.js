import messageModel from '../models/messagesModel'

const messageController = {

    getAll: (req, res, next) => {
        messageModel.find({}, (err, data) => {
            if (err) { console.log(err) };
            console.log(data);
        });
    },
    getOne: (req, res, next) => {
        messageModel.findById(req, (err, data) => {
            return (data || {});
        });
    },
    getbyname: (req, next) => {
        messageModel.findOne(req, (err, data) => {
             if (err) { next(err) };
             next(data);
        });
    },
    getCount: (req, next) => {
        messageModel.count(req, (err, data) => {
            if (err) {
                return next(-1);
            };
            return next(data);;
        });
    },
    create: (req, next) => {
        messageModel.create(req, function (err, user) {
            if (err)
             {
               return -1;
             }
             else
             {
                 return 1;
             }   
           // return console.log(err);
            //  res.json(user)

            console.log(user)
        })
    },
    update: (id, req, next) => {
        messageModel.updateOne(id, req, { new: true }, (err, data) => {
          if (err) {
                  console.log(err);
            }
            console.log(data);
        });
    },

    delete: (req, res, next) => {
        messageModel.remove({ _id: req.params.id }, (err, ok) => {
            if (err) return console.log(err);
        });
        console.log(ok);
    }
};

export default messageController;