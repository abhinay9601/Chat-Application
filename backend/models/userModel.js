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
  password: {
    type: String,
  },
  address: {
    type: String,
    required: false,
  },
  phoneNo: {
    type: Number,
    required: false,
  },
});
const User = mongoose.model('User', userSchema);

module.exports = User;
