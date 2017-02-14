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
mongoose.connect(db);

let User = mongoose.model('User', new Schema({
    id: {
        String,
        unique: true
    },
    name: String,
    pass: String,
    online: Boolean,
    classUser: [String],
    classMod: [String]
}));



module.exports = User;