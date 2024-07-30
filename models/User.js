const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    fName: {
        type: String,
        required: true,
        trim: true
    },
    lName: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        default: 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);