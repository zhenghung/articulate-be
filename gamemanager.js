const shortid = require('shortid');
const {RandomInt} = require('./util');

/**
 * Generates a starting boilerplate gameState based on the parameters passed in
 * Called when the host creates a room
 * @param host
 * @param numberOfTeams
 * @returns {{currentTurn: {phase: string, describer: [], guesser: [], team: number, category: string, word: string}, hostName: *, teams: [], usedWords: {random: [], world: [], nature: [], person: [], action: [], object: []}, roomCode: *, gamePositions: [], numberOfTeams: *, currentState: string}}
 */
const GenerateGameState = (
    {host, numberOfTeams},
) => {
    // const roomCode = shortid.generate();
    const roomCode = RandomInt(100, 999).toString();
    let teams = [];
    for (let i = 0; i < numberOfTeams; i++) {
        teams.push([]);
    }
    teams[0].push({playerName: host.playerName, socketId: host.socketId});

    const gamePositions = [];
    for (let i = 0; i < numberOfTeams; i++) {
        gamePositions.push(0);
    }

    const currentTurn = {
        phase: 'planning',
        team: 0,
        category: 'object',
        word: '',
        describer: [],
        guesser: [],
    };

    const usedWords = {
        object: [],
        action: [],
        nature: [],
        world: [],
        person: [],
        random: [],
    };

    return {
        roomCode: roomCode,
        hostName: host.playerName,
        numberOfTeams: numberOfTeams,
        currentState: 'lobby',
        teams: teams,
        turns: 0,
        usedWords,
        currentTurn,
        gamePositions
    };
};

module.exports = {GenerateGameState};