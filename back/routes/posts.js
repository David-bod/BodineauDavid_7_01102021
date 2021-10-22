const router = require('express').Router(); // Express module router
const express = require('express');
const auth = require('../middleware/auth'); // Chemin pour création d'un token JWT pour authentifier la connexion
const multer = require('../middleware/multer'); // Chemin pour les images (création...)
const stuffCtrl = require('../controllers/posts');

//router.post('groupomania/', auth, multer, stuffCtrl.createPost); // Création d'un post

router.get('/groupomania', auth, stuffCtrl.getAllPosts); // Page d'accueil (tous les posts...)
//router.get('/groupomania/:id', auth, stuffCtrl.getUser); // Affiche la page de profil

//router.put('/groupomania/:id', auth, multer, stuffCtrl.modifyUser); // Modification du profil

//router.delete('/groupomania/:id', auth, stuffCtrl.deleteUser); // Suppression du profil

//router.post('groupomania/:id', auth, stuffCtrl.like); //like


module.exports = router;