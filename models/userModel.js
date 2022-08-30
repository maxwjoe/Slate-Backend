const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true, 'Users must have a username']
    },
    email : {
        type : String,
        required : [true, 'Users must have an email'],
        unique : true
    },
    profileImage : {
        type : String,
        required : false
    },
    password : {
        type : String,
        required : false,
    },
    OAuthID : {
        type : String,
        required : false,
    },
    themeAccent : {
        type : String,
        required : false,
    },
    preferredTheme : {
        type : String,
        required : false,
    },
}, {
    timestamps : true
})

module.exports = mongoose.model('User', userSchema);