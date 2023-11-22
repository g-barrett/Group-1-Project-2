const fs = require('fs');
const path = require('path');
const sequelize = require('../config/connection');
const { User, Restaurant } = require('../models'); 

const seedData = async () => {
    // Read JSON file
    // Sync database
    await sequelize.sync({ force: true });

    const rawDataUser = fs.readFileSync(path.join(__dirname, 'userSeedData.json'));
    const users = JSON.parse(rawDataUser);
    await User.bulkCreate(users, {
        individualHooks: true,
        returning: true,
    })

    const rawDataRest = fs.readFileSync(path.join(__dirname, 'restaurantSeedData.json'));
    const restaurants = JSON.parse(rawDataRest);
    await Restaurant.bulkCreate(restaurants, {
        individualHooks: true,
        returning: true,
        });
    };

seedData().then(() => {
    console.log("Data seeded successfully.");
    }).catch(error => {
    console.error("Data seeding users:", error);
    });