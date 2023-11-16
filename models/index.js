const User = require('./user');
const Restaurant = require('./restaurants');
// const Likes = require('./likes');

// Define associations between User and Restaurant
// Like.belongsToMany(User, {
//     through: {
//         model:
//     }
// })

module.exports = { User, Restaurant };