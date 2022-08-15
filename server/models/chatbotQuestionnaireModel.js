import mongoose from "mongoose";
mongoose.set("debug", false);
import chatbotQuestionnaireSchema from "../schema/chatbotQuestionnaire";

const chatbotQuestionnaireModel = mongoose.model("chatbotquestionnaire", chatbotQuestionnaireSchema);
export default chatbotQuestionnaireModel;
