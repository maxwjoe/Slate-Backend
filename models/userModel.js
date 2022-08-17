const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true, 'Users must have a username']
    },
    email : {
        type : String,
        required : [true, 'Users must have an email']
    },
    profileImage : {
        type : String,
        required : false
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('User', userSchema);