const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const {randomInt} = require('../utils/helpers');

const schema = mongoose.Schema({
    adminId : {
        type: String,
        default : randomInt(1000, 10000)+""
    },
    email : {
        type : String,
        required : [true, 'Email is Required!'],
        unique : true,
        trim : true,
    },
    fullname : {
        type : String,
        requried : [true, 'Admin Name is required!'],
        trim : true
    },
    phone : {
        type: String,
        required : [true, 'Phone Number is required!'],  
    },
    password : {
        type : String,
        required : [true, 'Password is required!'],
    },
    previlages : {
        type : String,
        default : "strict",
        enum : ["full", "strict"],
    }
})

schema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    bcrypt.hash(user.password, 10, (err, hash)=>{
        if(err) return next()
        user.password = hash;
        next()
    })
})

module.exports = mongoose.model('Admin', schema);