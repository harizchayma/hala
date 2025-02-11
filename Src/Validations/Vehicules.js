const joi = require("joi")
const createVehiculesSchema = joi.object({
    num_immatriculation: joi.string().required(),
    n_serie_du_type: joi.string().required(),
    constructeur: joi.string().required(),
    type_constructeur: joi.string().required(),
    type_commercial: joi.string().required(),
    carrosserie: joi.number().required(),
    energie: joi.string().required(),
    puissance_fiscale: joi.number().required(),
    nbr_places: joi.number().required(),
    cylindree: joi.number().required(),
    num_certificat: joi.string().required(),
    lieu_certificat: joi.string().required(),
    date_certificat: joi.date().required(),
    id_categorie: joi.number().required(), // Corrected field name
}).unknown(true);


const findIdVehiculesSchema = joi.object({
    id_vehicule: joi.string().required()  // Accepte n'importe quelle chaîne comme ID
});

exports.findIdVehiculesSchema = findIdVehiculesSchema
exports.createVehiculesSchema = createVehiculesSchema