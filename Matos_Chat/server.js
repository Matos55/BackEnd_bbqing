// variable = function name
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages'); 
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'MatosBot';

// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({username, room}) => {                   // will get parameters from the Q.S. (username, room) from the socket.emit('joinroom') in the client side.
        const user = userJoin(socket.id, username, room);           // userJoin will put the user into the users array from users.js

        socket.join(user.room); // join() pre built socket.io function to join into rooms

        // Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

        // Broadcast when a user connects
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

        // Send users and room info ((when connecting))
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room) 
        });
    });


    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg)); // use 'Harbor' (parent = IO) to emit to everybody on that room (user = 'boat')
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if(user) {
            io.to(user.room).emit('message', formatMessage(botName, ` ${user.username} has left the chat`));
        }

        // Send users and room info ((when DISconnecting))
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room) 
        });

        
    });

});

const PORT = 5000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));