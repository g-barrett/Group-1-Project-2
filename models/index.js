const User = require('./user');
const Restaurant = require('./restaurants');

// Define associations between User and Restaurant
// Like.belongsToMany(User, {
//     through: {
//         model:
//     }
// })

module.exports = { User, Restaurant };