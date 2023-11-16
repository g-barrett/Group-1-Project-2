const express = require('express');
const router = express.Router();
// const withAuth = require('../utils/auth');
const { User } = require('../models');


// Route to render the homepage
router.get('/home', /*withAuth,*/ (req, res) => {
    
    

    // Render the 'homepage' view with the logged_in variable
    // Fix the render back to true or false
    res.render('homepage', { logged_in: false });
});

module.exports = router;
