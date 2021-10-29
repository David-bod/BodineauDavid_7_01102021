const router = require('express').Router(); // Express module router
const userCtrl = require('../controllers/users'); // Chemin pour les fonctions userCtrl
const auth = require('../middleware/auth');

try {
console.log("Route /routes/users : ok.");
   router.post("/register", userCtrl.signup); // Route création d'un compte
   router.post("/login", userCtrl.login); // Route connexion
   router.put("/profil", auth, userCtrl.modifyUser) // Modification profil
   router.get('/profil', auth, userCtrl.getProfil) // Affichage du profil
   router.delete("/profil", auth, userCtrl.deleteProfil); // Route supprimer un profil 
} catch (err) {
    console.log("Erreur de route (SignUp ou Login)");
}

module.exports = router;