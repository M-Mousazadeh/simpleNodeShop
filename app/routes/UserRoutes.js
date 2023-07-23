const {Router} = require('express');

const UserController = require('../controller/UserController');

const router = new Router();

//*     @desc   POST    /user/register
router.post('/register', UserController.registerHandler)

//*     @desc   POST    /user/login
router.post('/login', UserController.loginHandler)

module.exports = router;