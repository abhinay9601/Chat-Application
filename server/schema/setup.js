import mongoose from "mongoose";

const setupSchema = new mongoose.Schema(
  {
    client_id: {
      type: String
    },
    payment_link: String,
    availabilty_window: String,
    time: { type: Date, default: Date.now }
  },
  { strict: true }
);

export default setupSchema;
