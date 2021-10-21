const User = require('../models/users'); // Modèles des users
const bcrypt = require('bcrypt'); // Chiffrement mot de passe
const jwt = require('jsonwebtoken'); // créer des tokens d'authentification
const mysql = require('mysql');
const router = require('express').Router();
const mysql_con = require('../mysql_con.js');
const MaskData = require('maskdata'); // Masquage des emails

let userdb = new User();

exports.signup = (req, res, next) => {
    //console.log("signup / controllers/users.js");
    let name = req.body.name; let email = req.body.email; let password = req.body.password;
    const emailMaskOptions = { maskWith: "*", unmaskedStartCharactersBeforeAt: 5, unmaskedEndCharactersAfterAt: 5, maskAtTheRate: false};
    const emailMask = MaskData.maskEmail2(email, emailMaskOptions);
    bcrypt.hash(password, 15) // Récupère le mot de passe et le hash > 15 passages /
    .then(hash => {
        console.log("Password hash : " + hash);
        let userSql = [name, emailMask, hash];
        userdb.signup(userSql)
        .then(() => res.status(201).json({ message: 'Utilisateur créé et enregistré en base de données.' }))
        .catch(error => res.status(400).json({ message: 'Erreur dans la transmission des infos utilisateurs. ' + error }));
    })
    .catch(error => res.status(500).json({ message: "L'utilisateur n'a pas pu s'inscrire" }));
}

// signup ok

exports.login = (req, res, next) => {
    //console.log("login / controllers/users.js");
    let email = req.body.email; let password = req.body.password;
    const emailMaskOptions = { maskWith: "*", unmaskedStartCharactersBeforeAt: 5, unmaskedEndCharactersAfterAt: 5, maskAtTheRate: false};
    const emailMask = MaskData.maskEmail2(email, emailMaskOptions);
    let userSqlLogin = [emailMask];
    console.log(email + " /pass " + password);
    userdb.login(userSqlLogin, password)
    .then((response) => {
        res.status(200).json({ message: 'Vérification en cours...' })
    })
    .catch((err) => {
        res.status(400).json({ message: "La connexion au serveur de vérification a échouée." })
    })
}

