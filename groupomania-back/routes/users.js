const router = require('express').Router(); // Express module router
const userCtrl = require('../controllers/users'); // Chemin pour les fonctions userCtrl
const authUser = require('../middleware/authUsers'); // Chemin vérification condition mdp + email
const auth = require('../middleware/auth'); // Chemin pour création d'un token JWT pour authentifier la connexion
const multer = require('../middleware/multer'); // Chemin pour les images (création...)

router.post("/register", authUser.verifyName, authUser.verifyPassword, userCtrl.signup); // Route création d'un compte
router.post("/login", authUser.verifyPassword, userCtrl.login); // Route connexion

router.get('/groupomania', auth, userCtrl.getAllUsers); // Page d'accueil (tous les posts...)
router.get('/groupomania/:id', auth, userCtrl.getUser); // Affiche la page de profil

router.put('/groupomania/:id', auth, multer, userCtrl.modifyUser); // Modification du profil

router.delete('/groupomania/:id', auth, userCtrl.deleteUser); // Suppression du profil 

module.exports = router;