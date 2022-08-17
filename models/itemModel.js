const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    list : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'List'
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    title : {
        type : String,
        required : [true, 'Items must have a title']
    },
    definition : {
        type : String,
        required : [true, 'Items must have a definition']
    },
    pronunciation : {
        type : String,
        required : false
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('Item', itemSchema);