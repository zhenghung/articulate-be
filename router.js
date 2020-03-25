const express = require("express");
const shortid = require('shortid');
const router = express.Router();

const { words } = require('./dictionary');
const { generateGameState, randomProperty } = require('./gamemanager');

router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

router.get("/device", (req, res) => {
  const device = shortid.generate();
  res.send({deviceId: device}).status(200);
});

router.post("/roomcreate", (req, res) => {
  const gameState = generateGameState(req.body);
  res.send(gameState).status(200);
});

router.post("/word/:category", (req, res) => {
  let listOfWords;
  if (req.params.category === "all") {
    listOfWords = randomProperty(words);
  } else {
    listOfWords = words[req.params.category];
  }
  const word = listOfWords[Math.floor(Math.random() * listOfWords.length)];
  res.send(word).status(200);
});

module.exports = router;