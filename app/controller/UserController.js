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
        sendMail(email, fullname, 'Welcome to our community', 'You have been registered to our system')
        res.status(201).json({message : 'User Has Been Registered'});
    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.loginHandler = async(req, res, next)=>{
    try {
        const {email, password, rememberMe} = req.body;
        const user = await UserModel.findOne({email});
        if(!user) throw errorCreator('User Not Found!', 404);
        const comparePass = await bcrypt.compare(password, user.password);
        if(!comparePass) throw errorCreator('Either Email or Password is Wrong!', 422)
        const token = jwt.sign({user : user._id.toString(), fullname : user.fullname, email : user.email }, process.env.JWT_SECRET, {
            expiresIn : rememberMe ? "24h" : "1h"
        });
        res.status(200).json({token, user: user._id.toString(), message : 'Welcome'})
    } catch (err) {
        next(err)
    }
}

exports.handleForgetPassword = async(req, res, next)=>{
    const {email} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(!user) throw errorCreator('User Not Found', 404);
        const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET, {expiresIn : '1h'});
        const resetLink = `http://localhost:3000/user/resetpassword/${token}`;
        sendMail(email, user.fullname, "Reset Password Link", `In Order To Change The Password Click The Link Below
        <br/><a href="${resetLink}">Reset Password Link</a> 
        `)
        res.status(200).json({message : 'Reset Password Email Has Been Sent!', link : resetLink});
    } catch (err) {
        next(err)
    }
}

exports.handleResetPassword = async(req, res, next)=>{
    const token = req.params.token;
    const {password, confirmPassword} = req.body;
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedToken) throw errorCreator("You Don't Have Enough privileges", 401);
        if(!password) throw errorCreator("Password Is Required!");
        if(password !== confirmPassword) throw errorCreator('Password And Confirm Password Do Not Match', 422);
        const user = await UserModel.findOne({_id : decodedToken.userId});
        if(!user) throw errorCreator('User Not Found!', 404);
        user.password = password;
        user.save();
        res.status(200).send({message : "Your Password Has Been Changed Successfully!"});
    } catch (err) {
        next(err)
    }
}