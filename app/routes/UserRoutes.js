const {Router} = require('express');

const UserController = require('../controller/UserController');

const router = new Router();

//*     @desc   POST    /user/register
router.post('/register', UserController.registerUser)

module.exports = router;