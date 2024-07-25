const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
    },
    username: {
        type: String,
        unique: true
    },
    image: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('user', UserSchema);