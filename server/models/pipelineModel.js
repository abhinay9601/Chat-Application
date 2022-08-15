import mongoose from 'mongoose';
mongoose.set('debug', false);
import pipelineSchema from './../schema/pipeline';

const pipelineModel = mongoose.model('pipelines', pipelineSchema);
export default pipelineModel;