/*
    Create routes to get all restaurantes
    Create routes to get a restaurant
    Create for getting a profile
    Create route for login
*/

const router = require('express').Router();
const { Restaurant, User } = require('../models');
const withAuth = require('../utils/auth');

// All restaurants
router.get('/', withAuth, async (req, res) => {
    try {
        // Get all restaurants and JOIN with user data
        const restaurantData = await Restaurant.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // Serialize data so the template can read it
        const projects = restaurantData.map((restaurant) => project.get({ plain: true }));

        // Pss serialized data and session flag into template
        res.render('homepage', {
            projects,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});