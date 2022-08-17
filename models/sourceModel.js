const mongoose = require("mongoose");

const sourceSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    title : {
        type : String,
        required : [true, 'Sources must have a title']
    },
    language : {
        type : String,
        required : [true, 'Sources must have a language']
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('Source', sourceSchema);