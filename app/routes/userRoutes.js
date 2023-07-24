const {Router} = require('express');

const UserController = require('../controller/UserController');

const router = new Router();

//*     @desc   POST    /user/register
router.post('/register', UserController.registerHandler)

//*     @desc   POST    /user/login
router.post('/login', UserController.loginHandler)

//*     @desc   POST    /user/forgetpassword
router.post('/forgetpassword', UserController.handleForgetPassword);

//*     @desc   POST    /user/forgetpassword/:token
router.post('/resetpassword/:token', UserController.handleResetPassword);

module.exports = router;