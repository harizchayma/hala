// Src/Validations/UserValidation.js
const joi = require("joi");

const createUserSchema = joi.object({
    name: joi.string().required(),
    password: joi.string().required(),
    role: joi.string().valid('admin', 'user').required(),
    image: joi.string().uri().optional() // Validation pour l'image (optionnelle)
}).unknown(true);

const loginSchema = joi.object({
    name: joi.string().required(),
    password: joi.string().required()
}).unknown(true);

module.exports = { createUserSchema, loginSchema };
