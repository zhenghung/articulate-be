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
     * sent back to client */
    socket.on('getSocketId', ({}, callback) => {
        socket.emit('socketId', {socketId: socket.id});
        callback();
    });

    /** Client requesting to join a room,
     * sends to everyone in the room */
    socket.on('joinRoom',
        ({isHost, playerName, socketId, roomCode}, callback) => {
            console.log('JOINING ROOM: ', {playerName, socketId, roomCode});
            socket.join(roomCode);
            socket.emit('socketId', {socketId: socket.id});
            if (!isHost && io.sockets.adapter.rooms[roomCode].length < 2) {
                socket.leave(roomCode);
                socket.emit('playerJoinedFailed', {playerName, socketId: socket.id, message: "Invalid Room"});
            } else {
                io.in(roomCode).emit('playerJoined', {isHost, playerName, socketId: socket.id});
            }
            callback();
        });

    /** Host rejects player joining,
     * Sends to everyone in the room but only acted upon by target player */
    socket.on('rejectPlayer', ({roomCode, playerName}, callback) => {
        socket.to(roomCode).emit('playerRejected', {roomCode, playerName});
        callback();
    });

    /** Rejected player leaves room */
    socket.on('leaveRoom', (roomCode, callback) => {
        socket.leave(roomCode);
        callback();
    });

    /** Client broadcasting their gameState,
     * sends to everyone else in the same room */
    socket.on('broadcastGameState', (gameState, callback) => {
        // console.log(gameState);
        if (gameState.hasOwnProperty('roomCode')) {
            console.log('BROADCASTING GAME STATE: ', gameState.roomCode);
            socket.to(gameState.roomCode).emit('updateGameState', gameState);
        }
        callback();
    });

    /** Client presses correct or skip during game,
     * sends to everyone else in the same room */
    socket.on('broadcastToast', (toastObject, callback) => {
        if (toastObject.hasOwnProperty('roomCode')) {
            socket.to(toastObject.roomCode).emit('getToast', toastObject);
        }
        callback();
    });

    /** Standard socket listeners for handling disconnections */
    socket.on('connect_timeout', () => console.log("Connect Timeout"));
    socket.on('connect_error', () => console.log("Connect Error"));
    socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(process.env.PORT || 5000,() => console.log(`Server has started.`));