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

//*     @desc       Delete    /admin/delete-User
router.delete('/delete-user', authenticated, adminController.deleteUser)

//*     @desc       Post    /admin/create-post
router.post('/create-post', authenticated, adminController.createPost)

//*     @desc       Post    /admin/create-post
router.post('/upload-image', authenticated, adminController.uploadImage)

module.exports = router;