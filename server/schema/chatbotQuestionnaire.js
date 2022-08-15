import mongoose from 'mongoose';


const chatbotQuestionnaire = new mongoose.Schema(
    {
        random_client: {
            type: String,
            required: true,
            unique: true
        },
        client_id: {
            type: String,
            required: true
        },
        questionnaire: {
            type: Array,
            default: []
        },
        time: { type: Date, default: Date.now }
    }, { strict: true }
);

export default chatbotQuestionnaire;
