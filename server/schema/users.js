import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      index: true,
      required: true
    },
    userpassword: {
      type: String,
      required: true
    },
    useremail: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    phone2: {
      type: String
    },
    address: {
      type: String,
      required: true
    },
    userlevel: {
        type: String,
        required: true
    },
    client_id: {
      type: String
    },
    industry: {
      type: String
    },
    company: {
      type: String
    },
    logo: {
      type: String
    },
    status: {
      type: Boolean,
      required:true
    },
    passwordChangeNeeded: {
      type: Boolean,
      required: true
    },
    avtar: {
      type: String,
      default: null
    },
    time: { type: Date, default: Date.now }
  },
  { strict: true }
);
usersSchema.plugin(autoIncrement.plugin, {
  model: "users",
  field: "id",
  startAt: 1
});

export default usersSchema;
