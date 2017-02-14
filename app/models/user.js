/**
 * Created by Kim on 1/31/2017.
 */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


//Mongoose Schema ==============================================================================
//input the mongodb uri here

let User = mongoose.Schema({
    id: String,
    name: String,
    pass: String,
    online: Boolean,
    classUser: [String],
    classMod: [String]
});

// Schema methods ==============================================================================
// Generate password hash
User.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Validate password
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};



module.exports = mongoose.model('User', User);