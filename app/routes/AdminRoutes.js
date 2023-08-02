const {Router} = require('express');

const adminController = require('../controller/adminController');
const {authenticated} = require('../middlewares/auth');

const router = new Router();

//*     @desc       POST    /admin/register
router.post('/register', authenticated, adminController.registerAdmin)

//*     @desc       POST    /admin/login
router.post('/login', adminController.adminLogin)

//*     @desc       Delete    /admin/delete-admin
router.delete('/delete-admin', authenticated, adminController.deleteAdmin)

module.exports = router;