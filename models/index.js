const User = require('./user');
const Restaurant = require('./restaurants');
const Likes = require('./likes');

// Associations
User.belongsToMany(Restaurant, { through: Likes });
Restaurant.belongsToMany(User, { through: Likes });

module.exports = { User, Restaurant, Likes };