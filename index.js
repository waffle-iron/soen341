'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const db = require('./temp_database/temp_userDB')();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//serve public folders, potentially Angular App
app.use(express.static(__dirname + '/public/'));
//serve bower components
app.use('/bower_components', express.static(__dirname + '/bower_components'));


//routings
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/views/login.html');
});

app.get('/login', (req,res) => {
    res.sendFile(__dirname + '/public/views/login.html');
});

let user_authenticated = false;
app.post('/login', (req, res) => {
    // console.log(res.json);
    // res.json(req.body);
    console.log(req.body.username + req.body.password);
    console.log(db.users[1].username);
    console.log(db.users.length);

    if(req.body.username == db.users[0].username){
        console.log('ok good username')
    }

    for(let i =0; i< db.users.length; i++) {
        let good_user_pass = false;
        if (req.body.username == db.users[i].username && req.body.password == db.users[i].password) {
            good_user_pass = true;
        }

        if(good_user_pass == true){
            user_authenticated = true;
            res.redirect('/chat');
        } else {
            res.send('Incorrect username or password');
        }
    }
});

app.get('/chat', function(req,res) {
    if(user_authenticated == true) {
        res.sendFile(__dirname + '/public/views/chat.html');
    } else {
        res.send("Please login to access the chat");
    }
});




io.on('connection', function (socket) {
    //user is connected...
    console.log('a user connected');

    //when user sends a message
    socket.on('chat message', function (msg) {
        console.log('message sent: ' + msg);
        io.emit('chat message', msg);
    });

    //when user leaves, do something
    socket.on('disconnect', function () {
        console.log('user disconnected')
    });
});


http.listen(9001, function () {
    console.log('listening on*: 9001');
});

