const {Router} = require('express');

const dashController = require('../controller/dashboardController');
const {authenticated} = require('../middlewares/auth');

const router = new Router();

router.get('/', authenticated, dashController.getDash);

module.exports = router;