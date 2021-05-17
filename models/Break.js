const mongoose = require('mongoose');


const Break = new mongoose.Schema({
    dateready: {
        type: Date,
        required: true
    },
    Shift:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Shift',
        required: true
    },
    justification: {
        type: String,
        required: true,
        default:'non justifiee'
    },
    
}, { timestamps: true })

module.exports = mongoose.model('Break', Break);
