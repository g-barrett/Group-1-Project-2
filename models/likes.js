const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Likes extends Model {};



// Associations
// User.hasMany(Restaurant, { through: Likes });
// Restaurant.belongsToMany(User, { through: Likes });


Likes.init(
    {
        user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
            }
        },
    restaurant_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Restaurants',
            key: 'id'
            }
        },
    },
    {
        sequelize,
        modelName: 'likes',
    }
);

module.exports = Likes;