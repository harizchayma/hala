const express = require("express");
const cors = require("cors");
const vehiculesRoute = require('./Src/Routes/Vehicules');
const userRoutes = require("./Src/Routes/UserRoute");
const CategorieRoutes = require("./Src/Routes/CatégorieRoute"); // Corrigé le nom du fichier
const { logRequest } = require("./Src/Middleware/LogRequest");
const errorHandler = require('./Src/Middleware/ErrorHandler');
const db = require("./Src/conx/db");
require('dotenv').config();

const app = express();

// Middleware
app.use(logRequest);
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// Routes
app.use("/vehicules", vehiculesRoute);
app.use("/users", userRoutes);
app.use("/categorie", CategorieRoutes); // Assurez-vous que le chemin est correct

// Error handler
app.use(errorHandler);

// Connexion à la base de données
db.authenticate()
    .then(() => {
        console.log("✅ Connexion réussie à la base de données !");
        // Démarrer le serveur après la connexion à la base de données
        app.listen(7001, () => {
            console.log("🚀 Server running on port 7001");
        });
    })
    .catch(err => {
        console.error("❌ Erreur de connexion :", err.message);
        process.exit(1);
    });