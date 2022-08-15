var mongoose = require('mongoose');
mongoose.set('debug', false);
var eldermonkmsgSchema = require('./../schema/eldermonkmsg');

const eldermonkmsgModel = mongoose.model('eldermonkmsg',eldermonkmsgSchema);

module.exports =  eldermonkmsgModel;
