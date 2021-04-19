const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  gameid: { type: String, required: true },
  user1id: { type: String, required: true },
  scoreU1: { type: Number, required: true },
  user2id: { type: String, required: true },
  scoreU2: { type: Number, required: true },
  win: { type: Boolean },
});

const scores = mongoose.model("scores", scoreSchema);
module.exports = scores;
