var mongoose = require('mongoose');
mongoose.set('debug', true);
var autoIncrement = require("mongoose-auto-increment");

const eldermonkSchema =  new mongoose.Schema(
        {
                payload: {
                    type: Object,
                    index: true,
                },
                created_at : { type : Date, default: Date.now }

            }, {
                strict: true
            });
eldermonkSchema.plugin(autoIncrement.plugin, {
                model: 'eldermonk',
                field: 'id',
                startAt: 1

   });
module.exports =  eldermonkSchema;
