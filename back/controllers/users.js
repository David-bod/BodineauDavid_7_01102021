const User = require('../models/users'); // Modèles des users
const bcrypt = require('bcrypt'); // Chiffrement mot de passe
const jwt = require('jsonwebtoken'); // créer des tokens d'authentification
//const mysql = require('mysql'); // Relier le fichier à la bdd
//const router = require('express').Router();
//const mysql_con = require('../mysql_con.js'); // Route vers la connexion MySQL
const MaskData = require('maskdata'); // Masquage des emails

let userdb = new User();

exports.signup = async (req, res, next) => {
    let name = req.body.name; let email = req.body.email; let password = req.body.password;
    const emailMaskOptions = { maskWith: "*", unmaskedStartCharactersBeforeAt: 5, unmaskedEndCharactersAfterAt: 5, maskAtTheRate: false};
    const emailMask = MaskData.maskEmail2(email, emailMaskOptions);
    bcrypt.hash(password, 15) // Récupère le mot de passe et le hash > 15 passages /
    .then(hash => {
        let userSql = [name, emailMask, hash];
        userdb.signup(userSql)
        .then(() => res.status(201).json({ message: 'Utilisateur créé et enregistré en base de données.' }))
        .catch(error => res.status(400).json({ message: 'Erreur dans la transmission des infos utilisateurs. ' + error }));
    })
    .catch(error => res.status(500).json({ message: "L'utilisateur n'a pas pu s'inscrire" }));
}

exports.login = (req, res, next) => {
    console.log("Tentative de Login.");
    let email = req.body.email; let password = req.body.password;
    const emailMaskOptions = { maskWith: "*", unmaskedStartCharactersBeforeAt: 5, unmaskedEndCharactersAfterAt: 5, maskAtTheRate: false};
    const emailMask = MaskData.maskEmail2(email, emailMaskOptions);
    let userSqlLogin = [emailMask];
    userdb.login(userSqlLogin, password)
    .then((response) => {
        res.status(200).json(JSON.stringify(response))
    })
    .catch((err) => {
        res.status(400).json({ message: "La connexion au serveur de vérification a échouée." })
    })
}

exports.modifyUser = (req, res, next) => {
    console.log("Profil en cours de modification !");
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let userDataName = [name];
    let userDataEmail = [email];
    let userDataPassword = [password];
    let userDataId = [userId];
    console.log(userDataName + "/" + userDataEmail + "/" + userDataPassword + "/" + userDataId);
    userdb.modifyUser(userDataName, userDataEmail, userDataPassword, userDataId)
}

exports.deleteProfil = (req, res, next) => {
    console.log("Route : DeleteProfil");
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let userSqlDeleteProfil = [userId];
    userdb.deleteProfil(userSqlDeleteProfil)
    .then((response) =>{
        res.status(200).json(JSON.stringify(response))
    })
    .catch((error) =>{
        console.log(error);
        res.status(400).json(error)
    })
} 