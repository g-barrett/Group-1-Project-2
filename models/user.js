const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
const { all } = require('../controllers/api');
class User extends Model {
    checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        likes: {
            type: DataTypes.INTEGER,
            references: {
                model: 'restaurants',
                key: 'id',
            }
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     len: [8],
            // },
        },
    },
    {
        hooks: {
            // Before creating a new user
            async beforeCreate(newUser) {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            },
            // Before updating a user's password
            async beforeUpdate(updatedUser) {
                if (updatedUser.changed('password')) {
                    updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
                }
                return updatedUser;
            },
        },
            sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'user',
        }
);

module.exports = User;