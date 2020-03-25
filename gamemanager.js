const shortid = require('shortid');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const generateGameState = (
    { host, numberOfTeams}
    ) => {
  // const roomCode = shortid.generate();
  const roomCode = getRandomInt(100,999).toString();
  let teams = [];
  for (let i = 0 ; i < numberOfTeams ; i++ ) {
    teams.push([])
  }
  teams[0].push({ playerName: host.playerName, socketId: host.socketId });

  const gamePositions = [];
  for(let i = 0; i < numberOfTeams; i++) {
    gamePositions.push(0);
  }

  const currentTurn = {
    phase: "planning",
    team: 0,
    category: "Object",
    word: "",
    describer: [],
    guesser: []
  };

  return {
    roomCode: roomCode,
    hostName: host.playerName,
    numberOfTeams: numberOfTeams,
    currentState: "lobby",
    teams: teams,
    currentTurn,
    gamePositions
  }
};

const generateCurrentTurn = (gameState) => {
  return {
    ...gameState
  }
};


module.exports = { generateGameState, generateCurrentTurn };