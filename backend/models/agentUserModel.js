const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: false,
  },
  phoneNo: {
    type: Number,
    required: false,
  },
  department: {
    type: Object,
    required: false,
  },
});
const AgentUser = mongoose.model('AgentUser', userSchema);

module.exports = AgentUser;
