const mongoose = require('mongoose');


const Break = new mongoose.Schema({
    breakend: {
        type: Date,
        required: false,
        default:null
    },
    justification: {
        type: String,
        required: false,
        default:'non justifiee'
    },
    
}, { timestamps: true })

module.exports = mongoose.model('Break', Break);
