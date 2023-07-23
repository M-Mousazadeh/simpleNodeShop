exports.errorHandler = (error, req, res, next)=>{
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(statusCode).json({message, data});
}