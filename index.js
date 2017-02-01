var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = require('./temp_database/temp_userDB')();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

//serve public folders, potentially Angular App
app.use(express.static(__dirname + '/public/'));

//serve bower components
app.use('/bower_components', express.static(__dirname + '/bower_components'));


//routings
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/views/login.html');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    console.log(req.body.username);
    for(var i =0; i< db.users.length; i++) {
        if (req.body.username == db.users[i].username && req.body.password == db.users[i].password) {
            res.redirect('/chat');
        } else {
            res.redirect('/');
            res.send('Incorrect username or password');
        }
    }
});

app.get('/chat', function(req,res){
    res.sendFile(__dirname + '/public/views/chat.html');
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
