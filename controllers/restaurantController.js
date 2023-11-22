const express = require('express');
const router = express.Router(); 

// Route to render the homepage
router.get('/restaurant', (req, res) => {
    // Fetch data if needed
    res.render('restaurant', { restaurant: [] });
});

module.exports = router;
