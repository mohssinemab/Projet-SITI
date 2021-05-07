const mongoose = require('mongoose');

const Shift = new mongoose.Schema({
    operateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Operateur',
        required: true
    },
    machine:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Machine',
        required: true
    },
    datefin:{
        type: Date,
        default: null,
        required : false
    },
    produit:{
        type : String,
        required: true
    },
    breaktime:{
        type : Number,
        default : 0,
        required:false

    }
}, { timestamps: true })


module.exports = mongoose.model('Shift', Shift);