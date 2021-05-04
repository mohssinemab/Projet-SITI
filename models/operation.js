const mongoose = require('mongoose');

const operation = new mongoose.Schema({
    operateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'operateur',
        required: true
    },
    machines: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'machine',
        required: true
    }],
    datefin:{
        type: Date,
        default: null,
        required : false
    }
}, { timestamps: true })


module.exports = mongoose.model('operation', operation);