import mongoose from 'mongoose';
mongoose.set('debug', false);
import messageSchema from './../schema/message';

const messageModel = mongoose.model('message', messageSchema);
export default messageModel;