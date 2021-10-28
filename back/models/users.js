const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql_con = require('../mysql_con.js');

class User {
    constructor() {}  
    signup(userSql) {
        console.log("userSql (models/users.js)");
        let insertion = "INSERT INTO users VALUES( null, ?, ?, ?, null, 0)";
        insertion = mysql.format(insertion, userSql);

        return new Promise((res, err) => {
            mysql_con.query(insertion, function(err, result) {
                if (err){ console.log("L'email utilisé existe déjà ! "); }
                else {
                    console.log("Vous pouvez à présent vous connecter.");
                }
            })
        })
    }

    login(userSqlLogin, password) {
        console.log("reçu : " + userSqlLogin +" / " + password);
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
                        console.log("valid password");
                        if (!valid) return error({ message: "Le mot de passe est incorrect." })
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

    Profil(userSqlProfil){
        let recupProfil = 'SELECT name, email, admin FROM users WHERE id = ?';
        recupProfil = mysql.format(recupProfil, userSqlProfil);
        return new Promise((res, error) =>{
            mysql_con.query(recupProfil, function(err, result){
                if (err) return error({ message: "Impossible de voir le profil." });
                res(result);
            }) 
        })
    }

    deleteProfil(userSqlDeleteProfil){
        let recupDeleteProfil = 'DELETE FROM users WHERE id = ?'; 
        recupDeleteProfil = mysql.format(recupDeleteProfil, userSqlDeleteProfil);
        return new Promise((res, error) =>{
            mysql_con.query(recupDeleteProfil, function(err, result){
                if (err) return error({ message: "Impossible de supprimer le profil." });
                res({ message : "Le profil a été supprimé avec succès." });
            }) 
        })
    }
}

module.exports = User;