import mongoose from "mongoose";

const mobilesessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true
    },
    time: { type: Date, default: Date.now }
  },
  { strict: true }
);

export default mobilesessionSchema;
