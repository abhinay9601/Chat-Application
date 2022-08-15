import mongoose from "mongoose";
mongoose.set("debug", false);
import chatbotSchema from "../schema/chatbot";

const chatbotModel = mongoose.model("chatbots", chatbotSchema);
export default chatbotModel;
