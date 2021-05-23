const mongoose = require('mongoose');

const Counter = new mongoose.Schema({
    shift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shift',
        required: true
    },
    counter:{
        type: Number,
        required : true
    }
}, { timestamps: true })


module.exports = mongoose.model('Counter', Counter);