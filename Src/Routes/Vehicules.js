const express = require("express");
const { validateParams, validateBody } = require("../Middleware/Validation");
const { findIdVehiculesSchema, createVehiculesSchema } = require("../Validations/Vehicules");
const router = express.Router();
const {
    getVehicules,
    addVehicules,
    getVehiculesById,
    updateVehicules,
    deleteVehicules
} = require("../Controllers/VehiculesController");

router.get("/", getVehicules);
router.post("/", validateBody(createVehiculesSchema), addVehicules);
router.get("/:id_vehicule", validateParams(findIdVehiculesSchema), getVehiculesById);
router.put("/:id_vehicule", validateParams(findIdVehiculesSchema), validateBody(createVehiculesSchema), updateVehicules);
router.delete("/:id_vehicule", validateParams(findIdVehiculesSchema), deleteVehicules);

module.exports = router;