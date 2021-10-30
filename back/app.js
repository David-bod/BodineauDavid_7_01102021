const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const helmet = require('helmet'); // sécurisation des headers http
const app = express();


app.use (helmet()); // Sécuriser les requêtes http

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/register', userRoutes); // Inscription
app.post('/login', userRoutes); // Connexion
app.put('/profil', userRoutes); // Modification : Profil
app.delete('/profil', userRoutes); // Suppression : Profil
app.get('/profil', userRoutes); // affichage : Données profil
app.get('/groupomania', postsRoutes); // Affichage : Posts
app.post('/groupomania', postsRoutes); // Creation : Posts
app.delete('/groupomania/:id', postsRoutes); // Suppression : Posts
app.post('/groupomania/:id/com', postsRoutes); // Création : Commentaires
app.get('/groupomania/:id/com', postsRoutes); // Affichage : Commentaires
app.delete('/groupomania/com/:id', postsRoutes); // Suppression : Commentaires

app.use((req, res, next) => {
    console.log('Requête en cours...');
    next();
});

module.exports = app;