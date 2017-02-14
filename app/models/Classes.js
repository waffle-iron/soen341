let mongoose = require('mongoose'),Schema =
    mongoose.Schema;

mongoose.connect('mongodb://138.197.138.222:27017/famongo');

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

