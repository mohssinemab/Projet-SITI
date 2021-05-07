const mongoose = require('mongoose');

const Operateur = new mongoose.Schema({
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
    factory: {
        type : Number,
        default : 1,
        required : false
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


module.exports = mongoose.model('Operateur', Operateur);