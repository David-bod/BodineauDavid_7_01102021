const express = require('express');
const bodyParser = require('body-parser');
const userModel = require('../models/users'); // Modèles des users
const bcrypt = require('bcrypt'); // Chiffrement mot de passe
const fs = require('fs'); // Gestionnaire de fichier node.js
const app = require('../app');

app.user(bodyParser.json()); // met la req en json

exports.signup = async (req, res) => {
    try{

    } catch (err) {
        console.log("Erreur !" + err);
    }
}

exports.login = async (req, res) => {

}

exports.getAllUsers = async (req, res) => {

}

exports.getUser = async (req, res) => {

}

exports.modifyUser = async (req, res) => {

}

exports.deleteUser = async (req, res) => {

}