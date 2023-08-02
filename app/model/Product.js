const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Title Is Required!']
    },
    Detail:{
        type : String,
        required : [true, 'Detail is Required!']
    },
    price:{
        type: String,
        required : [true, 'Price is Required!']
    },
    status : {
        type : String,
        default : "available",
        enum : ["available", "not available"]
    },
    thumbnail : {
        type : String,
        required : [true, "Thubmnail is Required!"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Admin'
    },
    createdAt : {
        type : Date,
        default : Date.now,
    }
})

schema.index({title : "text"});

module.exports = mongoose.model('Product', schema);