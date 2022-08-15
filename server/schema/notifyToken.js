import mongoose from "mongoose";

const notifyTokenSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    client_id: {
      type: String,
      required: true
    },
    device: {
      type: String,
      required: true
    },
    time: { type: Date, default: Date.now }
  },
  { strict: true }
);

export default notifyTokenSchema;
