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

// set the static files location /public/img will be /img for us
app.use(express.static(__dirname + '/public'));
//serve bower components
app.use('/bower_components', express.static(__dirname + '/bower_components'));


//routes ==============================================================================
app.get('/', (req,res) => {
    res.redirect('/login');
});

app.get('/login', (req,res) => {
    res.sendFile(__dirname + '/public/views/login.html');
});

let user_authenticated = false;
app.post('/login', (req, res) => {
    let good_user_pass = false;
    for(let i =0; i< db.users.length; i++) {
        if (req.body.username == db.users[i].username && req.body.password == db.users[i].password) {
            good_user_pass = true;
            break;
        }
    }

    if(good_user_pass == true){
        user_authenticated = true;
        res.sendFile(__dirname+'/public/views/index.html');
    } else {
        res.send('Incorrect username or password');
    }
});

app.get('/chat', function(req,res) {
    if (user_authenticated == true) {
        res.sendFile(__dirname + '/public/views/chat.html');
    } else {
        res.send("Please login to access the chat");
    }
});

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

// application -------------------------------------------------------------

// load the single view file (angular will handle the page changes on the front-end)
app.get('*', function(req, res) {
    if(user_authenticated == false){
        res.redirect('/login');
    } else {
        res.sendFile(__dirname + '/public/views/index.html');
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

