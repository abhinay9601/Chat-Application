import mongoose from 'mongoose';
mongoose.set('debug', false);
import usersSchema from './../schema/users';

const usersModel = mongoose.model('users', usersSchema);
export default usersModel;