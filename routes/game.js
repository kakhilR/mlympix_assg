const express = require("express");
const router = express.Router();
const {
  CreateGame,
  getGame,
  updatescores,
  getscores,
} = require("../controllers/game");
const { requiresignin, adminPermission } = require("../middlewares/token");

router.post("/creategame", requiresignin, adminPermission, CreateGame);

router.post("/postscore", requiresignin, adminPermission, updatescores);

router.get("/allgames", requiresignin, getGame);

router.get("/getscores/:gameid", requiresignin, getscores);

module.exports = router;
