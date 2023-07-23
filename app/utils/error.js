exports.errorCreator = (message, statusCode = 422, data = [])=>{
    const error = new Error(message)
    error.statusCode = statusCode;
    error.data = data;
    return error;
}