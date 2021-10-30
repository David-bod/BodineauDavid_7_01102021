const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql_con = require('../mysql_con.js');
const MaskData = require('maskdata');

class User {
    constructor() {}  

    // Inscription
    signup(userSql) {
        let insertion = "INSERT INTO users VALUES( null, ?, ?, ?, null, 0)";
        insertion = mysql.format(insertion, userSql);
        return new Promise((resolve, error) => {
            mysql_con.query(insertion, function(err, result) {
                if (err) error({ error : "L'inscription a échouée !" });
                resolve({ message : "Vous pouvez à présent vous connecter !" });
            })
        })
    }

    // Connexion
    login(userSqlLogin, password) {
        console.log("Vérification données Login...");
        let recupEmail = "SELECT * FROM users WHERE email = '" + userSqlLogin + "'";
        recupEmail = mysql.format(recupEmail, userSqlLogin);
        return new Promise((resolve, error) => {
            mysql_con.query(recupEmail, function(err, result) {
                let list = [result];
                if (err) { console.log("Erreur lors de la récupération des emails. " + err); }
                if (list[0] == "") { console.log("Utilisateur non inscrit."); }
                else {
                    bcrypt.compare(password, result[0].password) // Récupère le password dans la row que la bdd a envoyé
                    .then(valid => {
                        console.log("Vérification mot de passe...");
                        if (!valid) return error({ message: "Le mot de passe est incorrect !" })
                        resolve({
                            userId: result[0].id, 
                            token: jwt.sign({ 
                                userId: result[0].id,
                                admin: result[0].admin
                            }, 
                            'RANDOM_TOKEN_SECRET', 
                            { expiresIn: '24h'}),
                            admin: result[0].admin,
                            name: result[0].name,
                            email: result[0].email
                        })
                    })
                }
            })
        })
    }

    // Modification du profil utilisateur
    modifyUser(userDataName, userDataEmail, userDataPassword, userDataId) {
        let email = userDataEmail[0]; let name = userDataName[0]; let password = userDataPassword[0]; let userId = userDataId[0];
        const options = { maskWith: "*", unmaskedStartCharactersBeforeAt: 5, unmaskedEndCharactersAfterAt: 5, maskAtTheRate: false};
        const resultEmail = MaskData.maskEmail2(email, options);
        bcrypt.hash(password, 15) // Récupère le mot de passe et le hash > 15 passages /
        .then(hash => {
            let modifyUser = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
            let sqlData = [name, resultEmail, hash, userId]
            modifyUser = mysql.format(modifyUser, sqlData);
            return new Promise((resolve, reject) => {
                mysql_con.query(modifyUser, function(err, result) {
                    if (err) { console.log(err); }
                    resolve({ message : "Le profil a ete modifié avec succès !" })
                    reject({ message : "La modification n'a pas pu aboutir." })
                })
            })
        })
    }

    // Recevoir les données du profil (id/nom/email/amdin)
    getProfil(dataUserId) {
        let getDataUser = "SELECT id, name, email, admin FROM users WHERE id = ?";
        getDataUser = mysql.format(getDataUser, dataUserId);
        return new Promise((resolve, reject) => {
            mysql_con.query(getDataUser, function(err, result) {
                if (err) return reject({ error : "Impossible de récupéré les informations utilisateur !" });
                resolve(result);
            }) 

        })
    }

    // Suppression du profil + posts + commentaires
    deleteProfil(userSqlDeleteProfil) {
        let recupDeleteProfil = "DELETE FROM users WHERE id = ?";
        let recupDeletePosts = "DELETE FROM posts WHERE userid = ?";
        let recupDeleteComment = "DELETE FROM comments WHERE userId = ?";
        recupDeleteProfil = mysql.format(recupDeleteProfil, userSqlDeleteProfil);
        recupDeletePosts = mysql.format(recupDeletePosts, userSqlDeleteProfil);
        recupDeleteComment = mysql.format(recupDeleteComment, userSqlDeleteProfil);
        return new Promise((resolve, error) => {
            mysql_con.query(recupDeleteComment, function(err, result) {
                if (err) return error({ message: "Impossible de supprimer les commentaires." });
                resolve({ message : "Commentaires supprimés !" });
            })
            mysql_con.query(recupDeletePosts, function(err, result) {
                if (err) return error({ message: "Impossible de supprimer les posts." });
                resolve({ message : "Posts supprimés !" });
            })
            mysql_con.query(recupDeleteProfil, function(err, result) {
                if (err) return error({ message: "Impossible de supprimer le profil." });
                resolve({ message : "Votre profil est supprimé !" });
            })
        })
    }
}

module.exports = User;