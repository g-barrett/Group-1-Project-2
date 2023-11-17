const router = require('express').Router();

const homeController = require('./homeController');
const authController = require('./authController');
const restaurantController = require('./restaurantController');
// const searchController = require('./searchController');
// const apiRoutes = require('./api');

// Imports - controllers and routes
router.use('/', homeController);
router.use('/', authController);
router.use('/', restaurantController);
// router.use('/search', searchController);
// router.use('/api', apiRoutes);

module.exports = router;