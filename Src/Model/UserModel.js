const { DataTypes, Model } = require("sequelize");
const db = require("../conx/db");

class User extends Model {}

User.init(
    {
        name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
        password: { type: DataTypes.STRING(255), allowNull: false },
        role: { type: DataTypes.STRING(30), allowNull: false },
        image: { type: DataTypes.BLOB('long'), allowNull: true } // Allow NULL values
    },
    {
        sequelize: db,
        modelName: "User ",
        tableName: "login",
        timestamps: false
    }
);

module.exports = User;