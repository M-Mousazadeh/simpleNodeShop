const mongoose = require('mongoose');

const {randomInt} = require('../utils/helpers');

const schema = mongoose.Schema({
    productId : {
        type : String,
        default : randomInt(100, 10000),
        unique : true,
    },
    title : {
        type : String,
        required : [true, 'Title Is Required!']
    },
    detail:{
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

schema.statics.productValidation = function(body){
    return require('./secure/ProductValidation').schema.validate(body, {abortEarly : false});
}

module.exports = mongoose.model('Product', schema);