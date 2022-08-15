import mongoose from "mongoose";
mongoose.set("debug", false);
import mobilesessionSchema from "../schema/mobilesession";

const mobilesessionModel = mongoose.model("mobilesession", mobilesessionSchema);
export default mobilesessionModel;
