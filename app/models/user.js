/**
 * Created by Kim on 1/31/2017.
 */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const db = require('../../config/db.js');


//Mongoose Schema ==============================================================================
//input the mongodb uri here
// mongoose.connect(db);

let User = mongoose.model('User', new Schema({
    id: ObjectId,
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    }
}));



module.exports = User;