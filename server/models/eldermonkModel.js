var mongoose = require('mongoose');
mongoose.set('debug', false);
var eldermonkSchema = require('./../schema/eldermonk');

const eldermonkModel = mongoose.model('eldermonk',eldermonkSchema);

module.exports =  eldermonkModel;