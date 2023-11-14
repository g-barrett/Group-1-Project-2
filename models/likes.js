const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Likes extends Model {};

Likes.init();