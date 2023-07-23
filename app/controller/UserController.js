const UserModel = require('../model/User');
const {errorCreator} = require('../utils/error');
const { sendMail } = require('../utils/mailer');

exports.registerUser = async(req, res, next)=>{
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