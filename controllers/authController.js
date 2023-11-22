const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Route for processing the login
router.post('/login', async (req, res) => {

    try {
    const userData = await User.findOne({ where: { username: req.body.username } });
    if (!userData) {
        res
        .status(400)
        // When login fails
        .render('homepage', { loginError: 'Incorrect email or password, please try again' }
);

        return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
        res
        .status(400)
        // When login fails
        .render('homepage', { loginError: 'Incorrect email or password, please try again' })
        return;
    }

    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.redirect("/restaurant");
    });

    } catch (err) {
    res.status(400).json(err);
    }
});

// Route for processing the registration logic
router.post('/register', async (req, res) => {

    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.redirect('/restaurant');
        });
    } catch (err) {
        res.render('homepage', { loginError: 'Something went wrong. Please review form and resubmit.' })

    }
});


module.exports = router;