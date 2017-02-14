/**
 * Created by Kim on 1/31/2017.
 */
'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const flash = require('connect-flash');



router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views/landing.html'));
});

router.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname, '../../public/views/login.html'));
});

router.get('/register', (req,res) => {
    res.sendFile(path.join(__dirname, '../../public/views/register.html'));
});

passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            }
            if (!user.validPassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Invalid password.')); // create the loginMessage and save it to session as flashdata
            }
            return done(null, user);
        });
    }
));

router.post('/login',
    passport.authenticate('local-login', { successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

router.get('/chat', function(req,res) {
    res.sendFile(path.join(__dirname, '/../../public/views/classroom.html'));
});

module.exports = router;
