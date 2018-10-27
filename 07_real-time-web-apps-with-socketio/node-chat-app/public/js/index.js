var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createMessage',{
        from:'ibrahim',
        text:'Yes'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from Server');
});

socket.on('newMessage',function(message){
    console.log('newMessage',message);
});