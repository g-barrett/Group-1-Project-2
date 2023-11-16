const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Route for displaying the login page
router.get('/login', (req, res) => {

});

// Route for processing the login logic
// router.post('/login', (req, res) => {

// });

// Route for displaying the registration page
// router.get('/register', (req, res) => {

// });

// Route for processing the registration logic
router.post('/register', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


// Additional routes like logout can be added here

module.exports = router;
