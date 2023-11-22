const router = require('express').Router();

const homeController = require('./homeController');
const authController = require('./authController');
const restaurantController = require('./restaurantController');

// Imports - controllers and routes
router.use('/', homeController);
router.use('/', authController);
router.use('/', restaurantController);

module.exports = router;