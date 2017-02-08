var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// set the static files location /public/img will be /img for us
app.use(express.static(__dirname + '/public'));

// routes ======================================================================

// api ---------------------------------------------------------------------

// get all todos
app.get('/api/todos', function(req, res) {

});

// create todo and send back all todos after creation
app.post('/api/todos', function(req, res) {

});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {

});

app.get('/chat', function(req,res){
    res.sendFile(__dirname + '/public/views/chat.html');
});

// application -------------------------------------------------------------

// load the single view file (angular will handle the page changes on the front-end)
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
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
