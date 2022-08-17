const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    source : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Source'
    },
    title : {
        type : String,
        required : [true, 'Lists must have a title']
    },
}, {
    timestamps : true
})

module.exports = mongoose.model('List', listSchema);