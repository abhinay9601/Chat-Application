import mongoose from "mongoose";

const pipelineSchema = new mongoose.Schema(
    {
        uuid: String,
        client_id: String,
        name: String,
        email: String,
        phone: String,
        message: String,
        time: { type: Date, default: Date.now }
    },
    { strict: true }
);

export default pipelineSchema;
