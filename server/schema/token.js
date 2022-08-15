import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const tokenSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      index: false
    },
    email: {
      type: String,
      index: false
    },
    purpose: {
      type: String,
      index: false
    },
    time: { type: Date, default: Date.now }
  },
  { strict: true }
);

tokenSchema.plugin(autoIncrement.plugin, "id");

export default tokenSchema;
