const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Likes extends Model {};

const Likes = sequelize.define('Likes', {
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
            model: 'Restaurant',
            key: 'id'
        }
    }
});

// Associations
User.belongsToMany(Restaurant, { through: Likes });
Restaurant.belongsToMany(User, { through: Likes });


Likes.init();

module.exports = Likes;