const fs = require('fs');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const sharp = require("sharp");
const rootPath = require("app-root-path");

const Admin = require("../model/Admin");
const User = require("../model/User");
const Product = require("../model/Product");
const { errorCreator } = require("../utils/error");
const {fileFilter} = require('../utils/helpers');
const shortid = require("shortid");

exports.registerAdmin = async (req, res, next) => {
  try {
    const userId = req.userId;
    const adminUser = await Admin.findOne({ _id: userId });
    if (adminUser.previlages !== "full")
      throw errorCreator("You Don't Have Enough Previlages!", 401);
    const { email, fullname, phone, password, confirmPassword, previlages } =
      req.body;
    const user = await Admin.findOne({ email });
    if (user)
      throw errorCreator(
        "You Can not Register an Admin With this email Address",
        422
      );
    await Admin.create({
      fullname,
      email,
      password,
      phone,
      previlages,
    });
    res.status(200).json({ message: "New Admin Has Been Added" });
  } catch (err) {
    next(err);
  }
};

exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;
    const user = await Admin.findOne({ email });
    if (!user) throw errorCreator("User Doesn't Exist", 404);
    const isPassEqual = bcrypt.compare(password, user.password);
    if (!isPassEqual) throw errorCreator("User Doesn't Exist", 404);
    const token = jwt.sign(
      { user: user._id.toString(), previlages: user.previlages },
      process.env.JWT_SECRET,
      { expiresIn: rememberMe ? "24h" : "1h" }
    );
    res.status(200).json({ message: "Welcome Back Dear Admin", token });
  } catch (err) {
    next(err);
  }
};

exports.deleteAdmin = async (req, res, next) => {
  try {
    const id = req.userId;
    const admin = await Admin.findOne({ _id: id });
    if (admin.previlages !== "full")
      throw errorCreator("You Don't Have Enough Previlages!", 401);
    const { email, password, confirmPassword } = req.body;
    const user = await Admin.findOne({ email });
    if (!user) throw errorCreator("User Not Found!", 404);
    if (user.adminId === admin.adminId)
      throw errorCreator("This Admin Can Not Be Deleted!");
    if (!password) throw errorCreator("Password is a Must!");
    if (password !== confirmPassword)
      throw errorCreator("Password And Confirm Password Must be Same!");
    const isEqual = bcrypt.compare(password, admin.password);
    if (!isEqual) throw errorCreator("You Don't Have Enough Previlages!", 401);
    await Admin.findByIdAndRemove({ _id: user._id });
    res.status(200).json({
      message: `${user.fullname} With Admin Id ${user.adminId} Has Been Deleted!`,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const id = req.userId;
    const admin = await Admin.findById({ _id: id });
    if (admin.previlages !== "full")
      throw errorCreator("You Don't Have Enough Previlages!", 401);
    const user = await User.findOne({ email });
    if (!user) throw errorCreator("User Not Found!", 404);
    if (!password) throw errorCreator("Password is a Must!");
    if (password !== confirmPassword)
      throw errorCreator("Password and Confirm Password Must Be Same!");
    const isEqual = bcrypt.compare(password, admin.password);
    if (!isEqual) throw errorCreator("You Don't Have Enough Previlages!");
    await User.findByIdAndRemove({ _id: user._id });
    res.status(200).json({
      message: `User With ${user.email} Email Address Has Been Deleted!`,
    });
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    console.log(req.body)
    const id = req.userId;
    const admin = await Admin.findById({ _id: id });
    if (!admin) throw errorCreator("You Don't Have Enough Previlages!", 401);
    await Product.productValidation(req.body)
    const product = await Product.create({... req.body, user : id});
    res.status(201).json({message : `Product with ${product.productId} Has Been Created!`});
  } catch (err) {
    next(err);
  }
};

exports.uploadImage = (req, res, next)=>{
    const upload = multer({
        limits : {fileSize : 3000000},
        dest : 'upload/',
        fileFilter : fileFilter
    }).single("image");

    upload(req, res, async(err)=>{
        try {
            if (err && err.message !== 'Unexpected end of form') {
                if (err.code === "LIMIT_FILE_SIZE") {
                  res.status(422).json({error : 'File Size is Greater Than 3MB!'})
                }
                res.status(400).json({error : "An Error Occured While Uploading The File!"})
            }else {
                if (req.files) {
                  const fileName = `${shortid()}_${req.files.image.name}`;
                  await sharp(req.files.image.data)
                    .jpeg({
                      quality: 60,
                    })
                    .toFile(`${rootPath}/app/public/upload/images/${fileName}`)
                    .catch((err) => { 
                      if(err) return res.status(400).json({error : "An Error Occured While Saving The File!"})
                    });
                    res.status(200).json({image : `http://localhost:3000/admin/images/${fileName}`, path : `${rootPath}/app/public/upload/images/${fileName}`});
                  } else {
                  res.status(400).json({error : "No Image Found To Upload!"})
                }
              } 
        } catch (err) {
            next(err)
        }
    })
}

exports.getImage = (req, res, next)=>{
  try {
    console.log(req.params.path)
    fs.readFile(`${rootPath}/app/public/upload/images/${req.params.path}`, (err, data)=>{
      if (err) throw errorCreator('Can Not Find The Image', 404);
      res.status(200).send(data)
    })
  } catch (err) {
    next(err)
  }
}