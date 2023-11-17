const express = require('express');
const router = express.Router();
const { User } = require('../models');
// const withAuth = require('../utils/auth');

// Route for displaying the login page
// router.get('/login', (req, res) => {

// });

// Route for processing the login
router.post('/login', async (req, res) => {

    try {
    const userData = await User.findOne({ where: { username: req.body.username } });
        console.log(userData);
    if (!userData) {
        res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
        return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
        res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
        return;
    }

    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.redirect('/restaurants');
    });

    } catch (err) {
    res.status(400).json(err);
    }
});

// Route for displaying the registration page
// router.get('/register', (req, res) => {

// });

// Route for processing the registration logic
router.post('/register', async (req, res) => {
    console.log("Login route hit with body:", req.body);

    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            console.log(`Body Req`, req.body)
            res.redirect('/restaurants');
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;