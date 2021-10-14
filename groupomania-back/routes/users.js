const router = require('express').Router(); // Express module router
const userCtrl = require('../controllers/users'); // Chemin pour les fonctions userCtrl

router.post("/register", userCtrl.signup); // Route création d'un compte
router.post("/login", userCtrl.login); // Route connexion

module.exports = router;