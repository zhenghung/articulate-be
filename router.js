const express = require("express");
const router = express.Router();

const { words } = require('./dictionary');
const { RandomProperty } = require('./util');
const { GenerateGameState } = require('./gamemanager');

/** Check if server is running*/
router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

/** Create a boilerplate gameState given the host and numberOfTeams*/
router.post("/roomcreate", (req, res) => {
  const gameState = GenerateGameState(req.body);
  res.send(gameState).status(200);
});

/** Get a Random word for a given category*/
router.get("/word/:category", (req, res) => {
  let listOfWords;
  if (req.params.category === "all") {
    listOfWords = RandomProperty(words);
  } else {
    listOfWords = words[req.params.category];
  }
  const word = listOfWords[Math.floor(Math.random() * listOfWords.length)];
  res.send(word).status(200);
});

module.exports = router;