const mongoose = require('mongoose');
const crypto = require('crypto');

const operateur = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default:0
    },
    role: {
        type: String,
        default:"operateur"
    }
}, { timestamps: true })


module.exports = mongoose.model('operateur', operateur);