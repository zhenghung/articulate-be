const shortid = require('shortid');

const generateGameState = (
    { host, numberOfTeams}
    ) => {
  const roomCode = shortid.generate();
  return {
    roomCode: roomCode,
    hostName: host.playerName,
    numberOfTeams: numberOfTeams,
    currentState: "lobby",
    teams: [
      [
        { playerName: host.playerName, socketId: host.socketId }
      ]
    ]
  }
};

module.exports = { generateGameState };