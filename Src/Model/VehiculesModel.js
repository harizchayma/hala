const { DataTypes } = require("sequelize");
const db = require("../conx/db");

const Vehicules = db.define("Vehicules", {
    num_immatriculation: { type: DataTypes.STRING(10), allowNull: false, primaryKey: true },
    n_serie_du_type: { type: DataTypes.STRING(30), allowNull: false },
    constructeur: { type: DataTypes.STRING(30), allowNull: false },
    type_constructeur: { type: DataTypes.STRING(30), allowNull: false },
    type_commercial: { type: DataTypes.STRING(30), allowNull: false },
    carrosserie: { type: DataTypes.INTEGER, allowNull: false },
    energie: { type: DataTypes.STRING(20), allowNull: false },
    puissance_fiscale: { type: DataTypes.INTEGER, allowNull: false },
    nbr_places: { type: DataTypes.INTEGER, allowNull: false },
    cylindree: { type: DataTypes.INTEGER, allowNull: false },
    num_certificat: { type: DataTypes.STRING(30), allowNull: false },
    lieu_certificat: { type: DataTypes.STRING(30), allowNull: false },
    date_certificat: { type: DataTypes.DATE, allowNull: false },
    id_categorie: { type: DataTypes.INTEGER, allowNull: false }, // Add this line
}, {
    tableName: "vehicules",
    timestamps: false
});

module.exports = Vehicules;
