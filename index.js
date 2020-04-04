const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(express.json());
app.use(router);

io.on('connect', (socket) => {

    /** Client requesting a SocketId,
     * sent back to client*/
    socket.on('getSocketId', ({}, callback) => {
        socket.emit('socketId', {socketId: socket.id});
        callback();
    });

    /** Client requesting to join a room,
     * sends to everyone in the room*/
    socket.on('joinRoom',
        ({isHost, playerName, socketId, roomCode}, callback) => {
            console.log('JOINING ROOM: ', {playerName, socketId, roomCode});
            socket.join(roomCode);
            socket.emit('socketId', {socketId: socket.id});
            if (!isHost && io.sockets.adapter.rooms[roomCode].length < 2) {
                socket.leave(roomCode);
                socket.emit('playerJoinedFailed', {playerName, socketId: socket.id, message: "Invalid Room"});
            } else {
                io.in(roomCode).emit('playerJoined', {playerName, socketId: socket.id});
            }
            callback();
        });

    /** Client broadcasting their gameState,
     * sends to everyone else in the same room*/
    socket.on('broadcastGameState', (gameState, callback) => {
        console.log(gameState);
        if (gameState.hasOwnProperty('roomCode')) {
            console.log('BROADCASTING GAME STATE: ', gameState.roomCode);
            socket.to(gameState.roomCode).emit('updateGameState', gameState);
        }
        callback();
    });
});

server.listen(process.env.PORT || 5000,() => console.log(`Server has started.`));