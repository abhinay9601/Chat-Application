import mongoose from 'mongoose';
mongoose.set('debug', false);
import tokenSchema from './../schema/token';

const tokenModel = mongoose.model('tokens', tokenSchema);
export default tokenModel;