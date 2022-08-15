
import agentlistingModel from "../models/usersModel";

const agentlistingController = {

    getAllById: async (req, res, next) => {
        try {
            
            const users = await agentlistingModel.aggregate([
                {
                    $match: req
                },
                {
                    $lookup: {
                        from: "departments",
                        let: {
                            userlevel: "$userlevel",
                            email: "$useremail",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$$userlevel", "agent"] },
                                            { $eq: ["$email", "$$email"] }
                                        ],
                                    },
                                },
                            }
                        ],
                        as: "department",
                    }
                },
                { $unwind: "$department" }
            ]);
            return users;
        } catch (err) {
            console.log("Error in agent listing : " + err);
            throw err;
        }
    },
    getAll: (req, res, next) => {
        agentlistingModel.find({}, (err, data) => {
            if (err) { console.log(err) };
            console.log(data);
        });
    },
    getOne: (req, res, next) => {
        agentlistingModel.findById(req, (err, data) => {
            return (data || {});
        });
    },
    getbyname: (req, next) => {
        agentlistingModel.findOne(req, (err, data) => {
            if (err) { next(err) };
            next(data);
        });
    },
    getCount: (req, next) => {
        agentlistingModel.count(req, (err, data) => {
            if (err) {
                return next(-1);
            };
            return next(data);;
        });
    },
    create: (req, next) => {
        agentlistingModel.create(req, function (err, user) {
            if (err) {
                return -1;
            }
            else {
                return 1;
            }
            // return console.log(err);
            //  res.json(user)

            console.log(user)
        })
    },
    update: (id, req, next) => {
        agentlistingModel.updateOne(id, req, { new: true }, (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log(data);
        });
    },

    delete: (req, res, next) => {
        agentlistingModel.remove({ _id: req.params.id }, (err, ok) => {
            if (err) return console.log(err);
        });
        console.log(ok);
    }
};

console.log("agentlistingController", agentlistingController);

module.exports = agentlistingController;