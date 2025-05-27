const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: String, enum: ['user', 'ai'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const promptSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true }, 
  messages: [messageSchema],
}, { timestamps: true });

const PromptSession = mongoose.model('PromptSession', promptSessionSchema);
module.exports = PromptSession