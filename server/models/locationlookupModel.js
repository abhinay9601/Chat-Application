var mongoose = require('mongoose');
mongoose.set('debug', false);
var localtionlookupSchema = require('./../schema/locationlookup');

const locationlookupModel = mongoose.model('locationlookup', localtionlookupSchema);

module.exports =  locationlookupModel;