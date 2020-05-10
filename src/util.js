/** Generate random RoomCode */
const RandomRoomCode = function(codeLength) {
    let roomCode = '';
    for (let i = 0; i < codeLength; i++) {
        roomCode += (String.fromCharCode(RandomInt(0, 26) + 65));
    }
    return roomCode
};

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

const FilterDictionary = function(words, usedWords) {
    let wordsCopy = {...words};
    const keys = Object.keys(usedWords);
    for (const key of keys) {
        for (let i = 0; i < usedWords[key].length; i++) {
            const currentWord = usedWords[key][i];
            wordsCopy[key] = wordsCopy[key].filter(word => {
                return (currentWord !== word);
            });
        }
    }
    return wordsCopy;
};

module.exports = {RandomRoomCode, RandomProperty, RandomInt, FilterDictionary};