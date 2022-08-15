import mongoose from "mongoose";
mongoose.set("debug", false);
import notifyTokenSchema from "../schema/notifyToken";

const notifyTokenModel = mongoose.model("notificationToken", notifyTokenSchema);
export default notifyTokenModel;
