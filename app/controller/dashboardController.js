exports.getDash = (req, res, next)=>{
    try {
        res.status(200).json({message : 'Welcome To Dashboard'})
    } catch (err) {
        next(err)
    }
}