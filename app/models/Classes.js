const mongoose = require('mongoose'),Schema =
    mongoose.Schema;
const db = require('.config/db.js');

mongoose.connect(db);

let chatSchema = new Schema({
    _id: String,
    name: String,
    time: Date,
    message: String
});

let classSchema = new Schema({
    _id: String,
    active: Boolean,
    time: Date,
    name: String,
    professor: String,
    classroom: String,
    chat: [chatSchema]
});

let Class = mongoose.model('classRoom',classSchema);

module.exports = Class;