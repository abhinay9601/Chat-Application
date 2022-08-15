var mongoose = require('mongoose');
mongoose.set('debug', true);
var autoIncrement = require("mongoose-auto-increment");

const locationlookupSchema = new mongoose.Schema(
{
    network:
    {
        type: String,
        default: '0'
    },
    geoname_id:
    {
        type     : Number,
        default: '0'
    },
    continent_code:
    {
        type: String,
        default: '0'
    },
    continent_name:
    {
       type: String,
       default: '0'
    },
    country_iso_code:
    {
        type: String,
        default: '0'
    },
    country_name:
    {
        type: String,
        default: '0'
    }
  

},
{
    strict: true
});
locationlookupSchema.plugin(autoIncrement.plugin,
{
    model: 'locationlookup',
    field: 'id',
    startAt: 1

});
module.exports = locationlookupSchema;