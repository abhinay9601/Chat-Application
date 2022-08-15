import mongoose from "mongoose";

const departmentsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    client_id: {
      type: String,
      required: true
    },
    departments: {
      type: Array,
      default: []
    },
    time: { type: Date, default: Date.now }
  },
  { strict: true }
);

export default departmentsSchema;
