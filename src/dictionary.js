let actionWords = require('./words/action.json');
let natureWords = require('./words/nature.json');
let objectWords = require('./words/object.json');
let personWords = require('./words/person.json');
let randomWords = require('./words/random.json');
let worldWords = require('./words/world.json');

const words = {
    'object': objectWords,
    'action': actionWords,
    'nature': natureWords,
    'world': worldWords,
    'person': personWords,
    'random': randomWords,
};

module.exports = words;