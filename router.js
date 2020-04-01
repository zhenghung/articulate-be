const express = require('express');
const router = express.Router();

const {words} = require('./dictionary');
const {RandomProperty, FilterDictionary} = require('./util');
const {GenerateGameState} = require('./gamemanager');

function RandomWord(category, vocabulary) {
    let listOfWords;
    if (category === 'all') {
        listOfWords = RandomProperty(vocabulary);
    } else {
        listOfWords = vocabulary[category];
    }
    return listOfWords[Math.floor(Math.random() * listOfWords.length)];
}

/** Check if server is running*/
router.get('/', (req, res) => {
    res.send({response: 'Server is up and running.'}).status(200);
});

/** Create a boilerplate gameState given the host and numberOfTeams*/
router.post('/roomcreate', (req, res) => {
    const gameState = GenerateGameState(req.body);
    res.send(gameState).status(200);
});

/** Get a Random word for a given category*/
router.get('/word/:category', (req, res) => {
    const word = RandomWord(req.params.category, words);
    res.send(word).status(200);
});

/** Get a Random word given used words */
router.post('/word/:category', (req, res) => {
    const filteredWords = FilterDictionary(words, req.body);
    const word = RandomWord(req.params.category, filteredWords);
    if (word) {
        res.send(word).status(200);
    } else {
        res.status(404).send(new Error('No Word Found'));
    }
});

/** Download all words */
router.get('/allwords', (req, res) => {
    res.send(words).status(200);
});

module.exports = router;