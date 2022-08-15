import mongoose from 'mongoose';
mongoose.set('debug', false);
import setupSchema from './../schema/setup';

const setupModel = mongoose.model('setups', setupSchema);
export default setupModel;