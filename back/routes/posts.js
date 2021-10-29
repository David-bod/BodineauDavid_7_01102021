const router = require('express').Router(); // Express module router
const auth = require('../middleware/auth'); // Chemin pour création d'un token JWT pour authentifier la connexion
const stuffCtrl = require('../controllers/posts'); // Chemin vers les fonctions get/post/delete

try{
    router.get('/groupomania', auth,stuffCtrl.getAllPosts);
    router.post('/groupomania', auth, stuffCtrl.createPost);
    router.delete('/groupomania/:id', auth, stuffCtrl.deletePost);
 
    router.get('/groupomania/:id/com', auth, stuffCtrl.getComment);
    router.post('/groupomania/:id/com', auth, stuffCtrl.createComment);
    router.delete('/groupomania/com/:id', auth, stuffCtrl.deleteComment);

}catch (error){
    console.log("Erreur route posts" + error);
} 

module.exports = router;