const mongoose = require("mongoose");

const generatedCodeSchema = new mongoose.Schema({
  session: { type: mongoose.Schema.Types.ObjectId, ref: 'PromptSession', required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const GeneratedCode = mongoose.model('GeneratedCode', generatedCodeSchema);
module.exports = GeneratedCode