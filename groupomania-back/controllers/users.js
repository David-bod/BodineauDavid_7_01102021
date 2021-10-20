const User = require('../models/users'); // Modèles des users
const bcrypt = require('bcrypt'); // Chiffrement mot de passe
const jwt = require('jsonwebtoken'); // créer des tokens d'authentification
const mysql = require('mysql');
const router = require('express').Router();
const mysql_con = require('../mysql_con.js');

let userdb = new User();

exports.signup = (req, res, next) => {
    console.log("signup / controllers/users.js");
    let name = req.body.name; let email = req.body.email; let password = req.body.password;
    bcrypt.hash(password, 10) // Récupère le mot de passe et le hash > 13 passages /
    .then(hash => {
        console.log("Password hash : " + hash);
        let userSql = [name, email, hash];
        userdb.signup(userSql)
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error  : "L'utilisateur n'a pas pu s'inscrire"}));
}

exports.login = async (req, res, next) => {
    User.findOne({ email: req.body.email }) // On recherche l'adresse mail dans la base de données
    .then(user => {
        if (!user){
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid){
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({  // L'utilisateur a entré le bon mot de passe
                userId: user._id, // On renvoie un userID + un token d'authentification
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}
