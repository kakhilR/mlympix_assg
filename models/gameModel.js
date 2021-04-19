const mongoose = require("mongoose");

//this can be done here also by providing scoreSchema in userplayed list
// const scoreSchema = new mongoose.Schema({
//   gameid: { type: String, required: true },
//   user1id: { type: String, required: true },
//   scoreU1: { type: Number, required: true },
//   user2id: { type: String, required: true },
//   scoreU2: { type: Number, required: true },
//   win: { type: Boolean },
// });

const gameSchema = new mongoose.Schema(
  {
    gameid: {
      type: String,
      required: true,
      unique: true,
    },
    usersplayed: [
      { type: mongoose.Schema.Types.ObjectId, ref: "scores", required: true },
    ],
  },
  { timestamps: true }
);

const Games = mongoose.model("Games", gameSchema);

module.exports = Games;
