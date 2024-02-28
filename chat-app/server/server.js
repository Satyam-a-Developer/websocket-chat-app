const { text } = require('express');

const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    let text = ''; 
    socket.on('name', (name) =>     {
        console.log(name);
        text = name;
        io.emit('name', `Has joined ${name}` ); 
          
    });

    socket.on('message', (message) =>     {
        console.log(message,text);
        io.emit('message', `${text} said:<br/><span>${message}<span/>`);
          
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080') );


 
