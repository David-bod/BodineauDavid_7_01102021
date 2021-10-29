const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/register', userRoutes);
app.post('/login', userRoutes);
app.put('/profil', userRoutes)
app.get('/profil', userRoutes);
app.get('/groupomania', postsRoutes);
app.post('/groupomania', postsRoutes);
app.delete('/groupomania/:id', postsRoutes);
app.post('/groupomania/:id/com', postsRoutes);
app.get('/groupomania/:id/com', postsRoutes);
app.delete('/groupomania/com/:id', postsRoutes);

app.use((req, res, next) => {
    console.log('Requête en cours...');
    next();
});

module.exports = app;