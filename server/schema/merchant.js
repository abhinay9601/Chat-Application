import mongoose from 'mongoose';
import autoIncrement from "mongoose-auto-increment";

const merchantSchema = new mongoose.Schema(
    {
        merchantname: {
            type: String,
            index: false,
        },
        merchantapikey: {
            type: String,
            required: false
        },
        merchantsecretkey: {
            type: String,
            required: false
        },
        merchantdomainname: {
            type: String,
            required: false
        },
        merchantinfo: {
            type: String,
            required: false
        },
        merchantstatus: {
            type: Boolean,
            default: false
        },
        merchantvolume: {
            type: Number,
            required: false
        },
        time: { type: Date, default: Date.now }
    }, { strict: true }
);
merchantSchema.plugin(autoIncrement.plugin, 'id');

export default merchantSchema;
