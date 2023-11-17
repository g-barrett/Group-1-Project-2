const express = require('express');
const router = express.Router();
// const withAuth = require('../utils/auth');
// const { User } = require('../models'); 

// Route to render the homepage
router.get('/restaurant', (req, res) => {
    // Fetch data if needed
    // console.log('LOGG RESTARURANTS');
    res.render('restaurant', { restaurant: [] });
});

module.exports = router;
