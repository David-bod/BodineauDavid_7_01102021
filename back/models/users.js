const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql_con = require('../mysql_con.js');

/*
name: { type: DataTypes.STRING, allowNull: false, required: true },
email: { type: DataTypes.STRING, allowNull: false, required : true, unique: true },
password: { type: DataTypes.STRING, allowNull: false, required: true },
photoProfil: { type: DataTypes.STRING, allowNull: true }, // Vérifier le DataTypes pour la photo
isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
*/

class User {
    constructor() {}  
    signup(userSql) {
        console.log("userSql (models/users.js)");
        let insertion = "INSERT INTO users VALUES( null, ?, ?, ?, null, 0)";
        insertion = mysql.format(insertion, userSql);

        return new Promise((res, err) => {
            mysql_con.query(insertion, function(err, result) {
                if (err){ console.log("L'email utilisé existe déjà ! "); }
                else { console.log("Utilisateur inscrit !"); }
            })
        })
    }

    login(userSqlLogin, password) {
        console.log("userSqlLogin (models/users.js)");
        console.log("reçu : " + userSqlLogin +" / " + password);
        let recupEmail = "SELECT * FROM users WHERE email = '" + userSqlLogin + "'";
        recupEmail = mysql.format(recupEmail, userSqlLogin);
        return new Promise((res, error) => {
            mysql_con.query(recupEmail, function(err, result) {
                let list = [result];
                if (err) { console.log("Erreur lors de la récupération des emails. " + err); }
                if (list[0] == "") { console.log("Utilisateur non inscrit."); }
                else {
                    bcrypt.compare(password, result[0].password) // Récupère le password dans la row que la bdd a envoyé
                    .then(valid => {
                        console.log("valid password");
                        if (!valid) { error({ message: "Mot de passe incorrect !" });  console.log("Mot de passe incorrect ! "); }
                        res({
                            userId: result[0].id, token: jwt.sign({ userId: result[0].id}, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h'})
                        })
                    })
                }
            })
        })
    }
}

module.exports = User;