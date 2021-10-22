const router = require('express').Router(); // Express module router
const userCtrl = require('../controllers/users'); // Chemin pour les fonctions userCtrl

try {
   router.post("/register", userCtrl.signup); // Route création d'un compte
   router.post("/login", userCtrl.login); // Route connexion
} catch (err) {
    console.log("Erreur de route (SignUp ou Login)");
}

module.exports = router;