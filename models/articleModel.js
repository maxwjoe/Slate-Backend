const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    source : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Source'
    },
    title : {
        type : String,
        required : [true, 'Articles must have a title']
    },
    content : {
        type : String,
        required : [true, 'Articles must have content']
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('Article', articleSchema);