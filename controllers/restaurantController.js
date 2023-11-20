const express = require('express');
const router = express.Router();
const { User, Restaurant, Likes } = require('../models');

// GET all restaurants
router.get('/', async (req, res) => {
    try {
        const restaurantData = await Restaurant.findAll();
        res.status(200).json(restaurantData);
    } catch (err) {
        res.status(500).json(err);
    }
});