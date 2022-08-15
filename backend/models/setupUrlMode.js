const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
  url: {
    type: String,
    unique: true,
    required: true,
  },
});
const SetupUrl = mongoose.model('SetupUrl', urlSchema);

module.exports = SetupUrl;
