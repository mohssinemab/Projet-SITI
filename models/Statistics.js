const mongoose = require('mongoose');

const Statistics = new mongoose.Schema({
    operation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'operation',
        required: true
    },
    counter:{
        type: Number,
        required : true
    }
}, { timestamps: true })


module.exports = mongoose.model('Statistics', Statistics);