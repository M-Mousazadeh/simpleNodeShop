const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        type : Number,
        required : [true, 'Phone Number is Required!'],
    },
    password: {
        type : String,
        required : [true, 'Password is Required!'],
    }
})

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