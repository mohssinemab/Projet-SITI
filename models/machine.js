const mongoose = require('mongoose');

const machine = new mongoose.Schema({
    factory: {
        type: Number,
        required: true
    },
    row: {
        type: Number,
        required: true
    },
    machine: {
        type: Number,
        required: true
    },
    used:{
        type:Boolean,
        required:true
    },
    
}, { timestamps: true })

module.exports = mongoose.model('machine', machine);