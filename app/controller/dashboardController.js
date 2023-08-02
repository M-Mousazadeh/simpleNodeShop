exports.getDash = (req, res, next)=>{
    try {
        console.log(req.userId)
        res.status(200).json({message : 'Welcome To Dashboard'})
    } catch (err) {
        next(err)
    }
}