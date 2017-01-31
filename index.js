var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//serve public folders, potentially Angular App
app.use(express.static(__dirname + '/public'));

//serve bower components
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
    //user is connected...
    console.log('a user connected');

    //when user sends a message
    socket.on('chat message',function(msg){
       console.log('message sent: ' + msg);
       io.emit('chat message',msg);
    });

    //when user leaves, do something
    socket.on('disconnect', function(){
       console.log('user disconnected')
    });
});

http.listen(9001,function(){
    console.log('listening on*: 9001');
});
