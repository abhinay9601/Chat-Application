import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema(
  {
    ques: {
      type: String,
      required: true
    },
    key: {
      type: String,
      required: true
    }
  }
);

const linksSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
);

const chatbotSchema = new mongoose.Schema(
  {
    client_id: {
      type: String,
      required: true
    },
    welcome: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    callNow: String,
    directions: String,
    callback: String,
    quote: String,
    bookAppointment: String,
    text: String,
    userOptions: {
      type: [questionsSchema],
      default: []
    },
    linkOptions: {
      type: [linksSchema],
      default: []
    },
    time: { type: Date, default: Date.now }
  },
  { strict: true }
);

export default chatbotSchema;
