/** Gets a random property from the given object*/
const RandomProperty = function(obj) {
    const keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
};

/** Outputs a random integer in between the given numbers*/
function RandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const filteredWords = function(words, usedWords) {

};

module.exports = {RandomProperty, RandomInt};