const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const soba = require('soba-be');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(express.json());
app.use(router);

io.on('connect', (socket) => {
    soba(io, socket, {logging: true});

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