const jwt = require('jsonwebtoken');

const { errorCreator } = require('../utils/error');

exports.authenticated = (req, res, next)=>{
    const authHeader = req.get('Authorization');
    console.log(authHeader)
    try {
        if(!authHeader) throw errorCreator("You Dont't have Enough Previlages!", 401);
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedToken) throw errorCreator("You Dont't have Enough Previlages!", 401);
        req.userId = decodedToken.user;
        next();
    } catch (err) {
        next(err)
    }
}