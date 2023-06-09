const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,               
            },
            googleId: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "No google",
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    is: /^[a-zA-Z ]+$/
                }
            },
            surname: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    is: /^[a-zA-Z ]+$/
                }
            },
            mail: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                }
            },
            date_of_birth: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    isDate: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.BIGINT,
                allowNull: true,
                validate: {
                    isNumeric: true
                }
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            emailVerified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
              },
        },
        {
            paranoid: true,
            timestamps: true,
        }
    )
}