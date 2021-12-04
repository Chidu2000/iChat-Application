// node server which will handle socket io connections

const io = require('socket.io')(8000)

const users = {};


// io.on analyzes new connections 2ways , while socket.on defines what should happen to that user after connection gets established
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        console.log('new user',name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message, name:users[socket.id]});
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})