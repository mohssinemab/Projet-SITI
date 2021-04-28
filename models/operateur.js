const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuid } = require('uuid');

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
    role: {
        type: String,
        default:"operateur"
    }
}, { timestamps: true })


// operateur.virtual('password')
// .set(function(password){
//     this._password = password;
//     this.salt = uuid();
//     this.hashed_password = this.cryptPassword(password)
// })
// .get(function() {
//     console.log("++ GET : ",this._password)
//     return this._password;
// })

// operateur.methods = {
//     authenticate: function(plainText) {
//         return this.cryptPassword(plainText) === this.hashed_password;
//     },
//     cryptPassword: function(password) {
//         if(!password) return '';

//         try {

//             return crypto
//             .createHmac('sha1', this.salt)
//             .update(password)
//             .digest('hex');
            
//         } catch (error) {
//             return ''
//         }
//     }
// }

module.exports = mongoose.model('operateur', operateur);