const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Admin = require('../model/Admin');
const {errorCreator} = require('../utils/error');

exports.registerAdmin = async (req, res, next)=>{
    try {
        const userId = req.userId;
        const adminUser = await Admin.findOne({_id : userId});
        if(adminUser.previlages !== 'full') throw errorCreator("You Don't Have Enough Previlages!", 401)
        const {email, fullname, phone, password, confirmPassword, previlages} = req.body;
        const user = await Admin.findOne({email});
        if(user) throw errorCreator('You Can not Register an Admin With this email Address', 422);
        await Admin.create({
            fullname,
            email,
            password,
            phone,
            previlages
        });
        res.status(200).json({message : 'New Admin Has Been Added'});
    } catch (err) {
        next(err)
    }
}

exports.adminLogin = async(req, res, next)=>{
    try {
        const {email, password, rememberMe} = req.body;
        const user = await Admin.findOne({email});
        if(!user) throw errorCreator("User Doesn't Exist", 404);
        const isPassEqual = bcrypt.compare(password, user.password)
        if(!isPassEqual) throw errorCreator("User Doesn't Exist", 404);
        const token = jwt.sign({user : user._id.toString(), previlages : user.previlages}, process.env.JWT_SECRET, {expiresIn : rememberMe ? "24h" : "1h"});
        res.status(200).json({message : "Welcome Back Dear Admin", token})
    } catch (err) {
        next(err)
    }
}

exports.deleteAdmin = async(req, res, next)=>{
    try {
        const id = req.userId;
        const admin = await Admin.findOne({_id : id});
        if(admin.previlages !== 'full') throw errorCreator("You Don't Have Enough Previlages!", 401)
        const {email, password, confirmPassword} = req.body;
        const user = await Admin.findOne({email});
        if(!user) throw errorCreator("User Not Found!", 404);
        if(!password) throw errorCreator("Password is a Must!")
        if(password !== confirmPassword) throw errorCreator("Password And Confirm Password Must be Same!");
        const isEqual = bcrypt.compare(password, admin.password);
        if(!isEqual) throw errorCreator("You Don't Have Enough Previlages!", 401);
        await Admin.findByIdAndRemove({_id : user._id});
        res.status(200).json({message : `${user.fullname} With Admin Id ${user.adminId} Has Been Deleted!`});
    } catch (err) {
        next(err)
    }
}