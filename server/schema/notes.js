import mongoose from "mongoose";

const departmentsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    
    notes: {
      type: String,
      default: ""
    },
    time: { type: Date, default: Date.now }
  },
  { strict: true }
);

export default departmentsSchema;
