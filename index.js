const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addPlayer, removePlayer, getPlayer, getPlayersInRoom } = require('./players');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, player } = addPlayer({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(player.room);

    socket.emit('message', { user: 'admin', text: `${player.name}, welcome to room ${player.room}.`});
    socket.broadcast.to(player.room).emit('message', { user: 'admin', text: `${player.name} has joined!` });

    io.to(player.room).emit('roomData', { room: player.room, users: getPlayersInRoom(player.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const player = getPlayer(socket.id);

    io.to(player.room).emit('message', { user: player.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const player = removePlayer(socket.id);

    if(player) {
      io.to(player.room).emit('message', { user: 'Admin', text: `${player.name} has left.` });
      io.to(player.room).emit('roomData', { room: player.room, users: getPlayersInRoom(player.room)});
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));