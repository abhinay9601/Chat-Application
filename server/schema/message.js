import mongoose from 'mongoose';
import autoIncrement from "mongoose-auto-increment";

const messageSchema = new mongoose.Schema(
    {
        message_topic: {
            type: String,
            index: false,
        },
        message: {
            type: String,
            index: false,
        },       
        time: { type: Date, default: Date.now }
    }, { strict: true }
);
messageSchema.plugin(autoIncrement.plugin, {
      model: 'message',
      field: 'id',
      startAt: 1
     
});
export default messageSchema;
