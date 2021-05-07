const mongoose = require('mongoose');

const Machine = new mongoose.Schema({
    factory: {
        type: Number,
        required: true
    },
    room: {
        type: Number,
        required: true
    },
    machine: {
        type: Number,
        required: true
    },
    busy:{
        type:Boolean,
        default:false,
        required:false
    },
    
}, { timestamps: true })

module.exports = mongoose.model('Machine', Machine);