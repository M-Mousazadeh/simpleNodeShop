const Product = require('../model/Product');

exports.getIndex = async(req, res, next)=>{
    try {
        const products = await Product.find()
        res.status(200).json({ products})
    } catch (err) {
        next(err)
    }
}

exports.search = async (req, res, next)=>{
    try {
        const products = await Product.find({
            $text : {$search : req.query.search},
        })
        res.status(200).json({products})
    } catch (err) {
        next(err)
    }
}