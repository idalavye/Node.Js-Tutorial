const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

    console.log('New user connected');

    // socket.emit('newMessage', {
    //     from: 'idalavyegmail.com',
    //     text: 'Hey!!',
    //     createdAt: 123123
    // });

    //Odaya yeni giren her kişi için
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    //Odaya girdiğini diğer bağlantılara söylemek için yayın yaparız.
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessge', message);

        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

// console.log(__dirname + "/../public ");
// console.log(publicPath);