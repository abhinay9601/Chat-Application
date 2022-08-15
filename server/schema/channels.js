import mongoose from 'mongoose';
import autoIncrement from "mongoose-auto-increment";

const channelsSchema = new mongoose.Schema(
    {
        client_id: {
            type: String,
            required: true
        },
        channels: {
            type: String,
            required: true
        },
        account: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        },
        time: { type: Date, default: Date.now }
    }, { strict: true }
);
channelsSchema.plugin(autoIncrement.plugin, 'id');
export default channelsSchema;
