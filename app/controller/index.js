const Admin = require('../model/Admin');

exports.getIndex = async(req, res)=>{
    res.send('hello world');
    // await Admin.create({
    //     email : 'mohammadreza.mzm18@gmail.com',
    //     phone : '09033504047',
    //     password : '123456',
    //     previlages : 'full',
    //     fullname : 'mohammadreza mousazadeh'
    // })
}