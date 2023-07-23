const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const {schema} = require('./secure/UserValidation');

const UserSchema = mongoose.Schema({
    email: {
        type : String,
        required : [true, 'Email is Requied!'],
        trim : true,
        unique : true,
    },
    fullname : {
        type: String,
        required : [true, 'Full Name is Required!'],
        trim: true
    },
    phone: {
        type : String,
        required : [true, 'Phone Number is Required!'],
    },
    password: {
        type : String,
        required : [true, 'Password is Required!'],
    }
})

UserSchema.statics.userValidation = function(body){
    return schema.validate(body, {abortEarly : false});
}

UserSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return next()

    bcrypt.hash(user.password, 10, (err, hash)=>{
        if(err) return next()
        user.password = hash;
        next()
    })
})

module.exports = mongoose.model("User", UserSchema);