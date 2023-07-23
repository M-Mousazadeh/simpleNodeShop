const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../model/User');
const {errorCreator} = require('../utils/error');
const { sendMail } = require('../utils/mailer');

exports.registerHandler = async(req, res, next)=>{
    try {
        await UserModel.userValidation(req.body);
        const {email, fullname, phone, password} = req.body;
        const user = await UserModel.findOne({email})
        if(user) throw errorCreator('This User Already Exists!', 422);
        await UserModel.create({
            email,
            fullname,
            phone,
            password
        });
        // sendMail(email, fullname, 'Welcome to our community', 'You have been registered to our system')
        res.status(201).json({message : 'User Has Been Registered'});
    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.loginHandler = async(req, res, next)=>{
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user) throw errorCreator('User Not Found!', 404);
        const comparePass = await bcrypt.compare(password, user.password);
        if(!comparePass) throw errorCreator('Either Email or Password is Wrong!', 422)
        const token = jwt.sign({user : user._id.toString(), fullname : user.fullname, email : user.email }, process.env.JWT_SECRET);
        res.status(200).json({token, user: user._id.toString(), message : 'Welcome'})
    } catch (err) {
        next(err)
    }
}