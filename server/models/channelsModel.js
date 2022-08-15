import mongoose from "mongoose";
mongoose.set("debug", false);
import channelsSchema from "../schema/channels";

const channelsModel = mongoose.model("channels", channelsSchema);
export default channelsModel;
