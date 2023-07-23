const UserModel = require('../model/User');
const {errorCreator} = require('../utils/error');

exports.registerUser = async(req, res, next)=>{
    try {
        await UserModel.userValidation(req.body);
        const {email, fullname, phone, password} = req.body;
        const user = UserModel.findOne({email})
        if(user) throw errorCreator('This User Already Exists!', 422);
        await UserModel.create({
            email,
            fullname,
            phone,
            password
        });
        res.status(201).json({message : 'User Has Been Registered'});
    } catch (err) {
        next(err)
    }
}