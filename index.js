'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const logger = require('morgan');
const session = require('express-session');


//in order to parse body responses
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//to log sever connections
app.use(logger('dev'));

// set the static files location /public/img will be /img for us
app.use(express.static(__dirname + '/public'));
//serve bower components
app.use('/bower_components', express.static(__dirname + '/bower_components'));

const routes = require('./app/routes/routes');
const api = require('./app/routes/api');

//Unprotected routes
app.use('/', routes);

//Middleware to check of user is authenticated with express-session
app.use((req, res, next) => {
    // if(! req.session.user){
    //     res.redirect('/login');
    // } else {
        next();
    // }
});

//Api routes
app.use('/api', api);





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

