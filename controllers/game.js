const Game = require("../models/gameModel");
const scores = require("../models/playedgames");

exports.CreateGame = (req, res) => {
  const gameid = req.body.gameid;
  Game.findOne({ gameid: req.body.gameid }, (err, game) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else if (game) {
      return res.status(400).json({ error: "game with the id exits!" });
    }
    let newgame = new Game({
      gameid,
    });
    newgame.save((err, game) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({ game });
    });
  });
};

//one to many relation one game -> played by many user
exports.updatescores = async (req, res) => {
  try {
    const Sc = new scores(req.body);
    await Sc.save();
    const game = await Game.findById({ _id: Sc.gameid });
    game.usersplayed.push(Sc);
    await game.save();
    return res.status(200).json({ success: true, data: Sc });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.getGame = (req, res) => {
  Game.find({}).exec((err, games) => {
    if (err) return res.status(400).json({ error: err });
    if (games) {
      res.status(200).json({ games });
    }
  });
};

exports.getscores = (req, res) => {
  const gameid = req.params.gameid;
  scores.find({ gameid }).exec((err, score) => {
    if (err) {
      res.status(400).json({ error: "unable to get score" });
    } else return res.json({ data: score });
  });
};
